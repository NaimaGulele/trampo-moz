import { NextResponse } from 'next/server';
import { initiateC2BPayment, generateTransactionReference, validateMozambiquePhone } from '@/lib/mpesa';

/**
 * API Route: Initiate M-Pesa Payment
 * POST /api/mpesa/initiate-payment
 */
export async function POST(request) {
  try {
    const { amount, phone, customerName, email, jobTitle, company } = await request.json();

    // Validate required fields
    if (!amount || !phone) {
      return NextResponse.json(
        { error: 'Amount and phone number are required' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!validateMozambiquePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid Mozambique phone number. Use format: 84XXXXXXX' },
        { status: 400 }
      );
    }

    // Generate unique references
    const transactionReference = generateTransactionReference();
    const thirdPartyReference = `ORD${Date.now().toString().slice(-10)}`;

    console.log('Initiating M-Pesa payment:', {
      amount,
      phone,
      transactionReference,
      thirdPartyReference
    });

    // Initiate M-Pesa payment
    const paymentResult = await initiateC2BPayment({
      amount: amount,
      msisdn: phone,
      reference: transactionReference,
      thirdPartyReference: thirdPartyReference
    });

    if (!paymentResult.success) {
      console.error('M-Pesa payment initiation failed:', paymentResult.error);
      return NextResponse.json(
        { 
          error: paymentResult.error || 'Failed to initiate payment',
          details: 'Please check your phone number and try again'
        },
        { status: 400 }
      );
    }

    // Return success response
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
    console.error('Error in initiate-payment API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
