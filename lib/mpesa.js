/**
 * M-Pesa Integration Library for Mozambique
 * Handles C2B (Customer to Business) payments
 */

import crypto from 'crypto';

const MPESA_API_KEY = 'fwd2e6e8gjvyzi86hu1tokv0fq6qxm9u';
const MPESA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==
-----END PUBLIC KEY-----`;
const MPESA_ENVIRONMENT = 'sandbox';
const SERVICE_PROVIDER_CODE = '171717';
const MPESA_ORIGIN = 'developer.mpesa.vm.co.mz';

const API_HOSTS = {
  sandbox: 'api.sandbox.vm.co.mz',
  production: 'api.vm.co.mz',
};

const API_PORTS = {
  c2b: 18352,
  queryStatus: 18353,
};

const API_HOST = API_HOSTS[MPESA_ENVIRONMENT] || API_HOSTS.sandbox;

function getApiUrl(path, port) {
  return `https://${API_HOST}:${port}${path}`;
}

function formatPublicKey(publicKey) {
  const cleaned = publicKey.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s/g, '');
  const lines = cleaned.match(/.{1,64}/g) || [cleaned];
  return `-----BEGIN PUBLIC KEY-----\n${lines.join('\n')}\n-----END PUBLIC KEY-----`;
}

/**
 * Encrypt API key using M-Pesa public key — used directly as Bearer token
 */
function getBearerToken() {
  if (!MPESA_API_KEY || !MPESA_PUBLIC_KEY) {
    throw new Error('M-Pesa credentials not configured');
  }

  try {
    const publicKey = formatPublicKey(MPESA_PUBLIC_KEY);
    const buffer = Buffer.from(MPESA_API_KEY, 'utf8');
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return encrypted.toString('base64');
  } catch (error) {
    console.error('Error encrypting API key:', error);
    throw new Error('Failed to encrypt API key');
  }
}

function getRequestHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getBearerToken()}`,
    Origin: MPESA_ORIGIN,
    Connection: 'keep-alive',
  };
}

/**
 * Initiate C2B payment request
 */
export async function initiateC2BPayment({ amount, msisdn, reference, thirdPartyReference }) {
  try {
    if (!amount || !msisdn || !reference || !thirdPartyReference) {
      throw new Error('Missing required payment parameters');
    }

    let formattedPhone = msisdn.replace(/\s+/g, '');
    if (!formattedPhone.startsWith('258')) {
      formattedPhone = '258' + formattedPhone;
    }

    const paymentData = {
      input_Amount: parseFloat(amount).toFixed(2),
      input_CustomerMSISDN: formattedPhone,
      input_ServiceProviderCode: SERVICE_PROVIDER_CODE,
      input_ThirdPartyReference: thirdPartyReference,
      input_TransactionReference: reference,
    };

    console.log('Initiating M-Pesa payment:', {
      amount: paymentData.input_Amount,
      phone: formattedPhone,
      reference,
    });

    const response = await fetch(getApiUrl('/ipg/v1x/c2bPayment/singleStage/', API_PORTS.c2b), {
      method: 'POST',
      headers: getRequestHeaders(),
      body: JSON.stringify(paymentData),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      console.error('M-Pesa non-JSON response:', responseText.slice(0, 200));
      throw new Error(`M-Pesa API error (${response.status})`);
    }

    if (!response.ok || responseData.output_ResponseCode !== 'INS-0') {
      console.error('M-Pesa payment failed:', responseData);
      throw new Error(responseData.output_ResponseDesc || 'Payment request failed');
    }

    console.log('M-Pesa payment response:', responseData);

    return {
      success: true,
      transactionId: responseData.output_TransactionID,
      conversationId: responseData.output_ConversationID,
      responseCode: responseData.output_ResponseCode,
      responseDesc: responseData.output_ResponseDesc,
      thirdPartyReference: responseData.output_ThirdPartyReference,
    };
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Query transaction status
 */
export async function queryTransactionStatus(transactionId, thirdPartyReference) {
  try {
    const params = new URLSearchParams({
      input_QueryReference: transactionId,
      input_ServiceProviderCode: SERVICE_PROVIDER_CODE,
      input_ThirdPartyReference: thirdPartyReference,
    });

    const response = await fetch(
      `${getApiUrl('/ipg/v1x/queryTransactionStatus/', API_PORTS.queryStatus)}?${params}`,
      {
        method: 'GET',
        headers: getRequestHeaders(),
      }
    );

    const data = await response.json();

    return {
      success: response.ok && data.output_ResponseCode === 'INS-0',
      status: data.output_ResponseCode,
      transactionStatus: data.output_ResponseTransactionStatus,
      description: data.output_ResponseDesc,
      data,
    };
  } catch (error) {
    console.error('Error querying transaction status:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate unique transaction reference (max 20 chars per M-Pesa API)
 */
export function generateTransactionReference() {
  const timestamp = Date.now().toString().slice(-10);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TM${timestamp}${random}`;
}

export function validateMozambiquePhone(phone) {
  const cleaned = phone.replace(/\s+/g, '');
  const regex = /^(258)?(8[2-7]\d{7})$/;
  return regex.test(cleaned);
}

export function formatPhoneForMpesa(phone) {
  let cleaned = phone.replace(/\s+/g, '');
  if (!cleaned.startsWith('258')) {
    cleaned = '258' + cleaned;
  }
  return cleaned;
}
