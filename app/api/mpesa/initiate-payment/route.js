import { NextResponse } from 'next/server';
import { initiateC2BPayment, generateTransactionReference, validateMozambiquePhone } from '@/lib/mpesa';

export async function POST(request) {
  try {
    const { amount, phone, customerName, email, jobTitle, company } = await request.json();

    if (!amount || !phone) {
      return NextResponse.json(
        { error: 'Amount and phone number are required' },
        { status: 400 }
      );
    }

    if (!validateMozambiquePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid Mozambique phone number. Use format: 84XXXXXXX' },
        { status: 400 }
      );
    }

    const transactionReference = generateTransactionReference();
    const thirdPartyReference = `ORD${Date.now().toString().slice(-10)}`;

    const paymentResult = await initiateC2BPayment({
      amount: amount,
      msisdn: phone,
      reference: transactionReference,
      thirdPartyReference: thirdPartyReference
    });

    if (!paymentResult.success) {
      // Return FULL debug info so we can see the real cause
      return NextResponse.json(
        {
          error: paymentResult.error || 'Failed to initiate payment',
          debug_fullError: paymentResult.error,
          debug_transactionReference: transactionReference,
          debug_thirdPartyReference: thirdPartyReference,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment request sent. Please check your phone for M-Pesa prompt.',
      transactionId: paymentResult.transactionId,
      conversationId: paymentResult.conversationId,
      transactionReference: transactionReference,
      thirdPartyReference: thirdPartyReference,
      responseCode: paymentResult.responseCode,
      responseDesc: paymentResult.responseDesc
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}
