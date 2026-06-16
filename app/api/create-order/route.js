import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const supabase = createClient(
  'https://rvhblgwvrmilqyzjbkla.supabase.co',
  'sb_publishable_HLfNpiWYSqiNPCN9DTy0lw_49rhUSb-'
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'naimagulele55@gmail.com',
    pass: 'twcqtujmoftllcqt',
  },
});

// ===== M-Pesa Sandbox Config =====
const MPESA_API_KEY = 'fwd2e6e8gjvyzi86hu1tokv0fq6qxm9u';
const MPESA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==
-----END PUBLIC KEY-----`;
const MPESA_API_HOST = 'api.sandbox.vm.co.mz';
const MPESA_SERVICE_PROVIDER_CODE = '171717'; // default sandbox test shortcode
const MPESA_ORIGIN = 'developer.mpesa.vm.co.mz';

function encryptApiKey() {
  const buffer = Buffer.from(MPESA_API_KEY, 'utf8');
  const encrypted = crypto.publicEncrypt(
    {
      key: MPESA_PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return encrypted.toString('base64');
}

async function initiateC2B(amount, msisdn, transactionRef, thirdPartyRef) {
  const bearerToken = encryptApiKey();

  const url = `https://${MPESA_API_HOST}:18352/ipg/v1x/c2bPayment/singleStage/`;

  const body = {
    input_TransactionReference: transactionRef,
    input_CustomerMSISDN: msisdn,
    input_Amount: String(amount),
    input_ThirdPartyReference: thirdPartyRef,
    input_ServiceProviderCode: MPESA_SERVICE_PROVIDER_CODE,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
      'Origin': MPESA_ORIGIN,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  return { ok: res.ok, status: res.status, data };
}

export async function POST(request) {
  try {
    const { name, email, phone, job_title, company, amount } = await request.json();

    if (!name || !email || !phone || !job_title || !company) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
    }

    const msisdn = '258' + phone.replace(/\D/g, '').replace(/^258/, '');
    const transactionRef = 'TM' + Date.now();
    const thirdPartyRef = 'REF' + Math.floor(Math.random() * 1000000);

    // Call M-Pesa C2B API
    const mpesaResult = await initiateC2B(amount, msisdn, transactionRef, thirdPartyRef);

    const isSuccess = mpesaResult.ok && mpesaResult.data?.output_ResponseCode === 'INS-0';

    // Save order regardless, with correct status
    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert([{
        name, email, phone, job_title, company, amount,
        status: isSuccess ? 'paid' : 'failed',
      }])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: 'Erro ao guardar pedido: ' + insertError.message }, { status: 500 });
    }

    if (!isSuccess) {
      return NextResponse.json({
        error: 'Pagamento M-Pesa falhou: ' + (mpesaResult.data?.output_ResponseDesc || JSON.stringify(mpesaResult.data)),
        mpesaResponse: mpesaResult.data,
      }, { status: 400 });
    }

    // Send confirmation email
    await transporter.sendMail({
      from: '"TrampoMoz" <naimagulele55@gmail.com>',
      to: email,
      subject: `✅ Confirmação de pedido — ${job_title} | TrampoMoz`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;">
          <h2 style="color:#0070f3;">TrampoMoz</h2>
          <p>Olá <strong>${name}</strong>,</p>
          <p>O seu pagamento de <strong>${amount} MZN</strong> via M-Pesa foi confirmado para a vaga <strong>${job_title}</strong> (${company}).</p>
          <p style="color:#666;font-size:13px;">ID da transação: ${mpesaResult.data?.output_TransactionID || transactionRef}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, orderId: order.id, mpesaResponse: mpesaResult.data });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno: ' + err.message }, { status: 500 });
  }
}
