import { NextResponse } from 'next/server';
import { queryTransactionStatus } from '@/lib/mpesa';

/**
 * API Route: Check M-Pesa Transaction Status
 * POST /api/mpesa/check-status
 */
export async function POST(request) {
  try {
    const { transactionId, thirdPartyReference } = await request.json();

    if (!transactionId || !thirdPartyReference) {
      return NextResponse.json(
        { error: 'Transaction ID and third party reference are required' },
        { status: 400 }
      );
    }

    console.log('Checking M-Pesa transaction status:', {
      transactionId,
      thirdPartyReference
    });

    // Query transaction status
    const statusResult = await queryTransactionStatus(transactionId, thirdPartyReference);

    if (!statusResult.success) {
      return NextResponse.json(
        { 
          error: 'Failed to check transaction status',
          message: statusResult.error 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      status: statusResult.status,
      transactionStatus: statusResult.transactionStatus,
      description: statusResult.description,
      data: statusResult.data
    });

  } catch (error) {
    console.error('Error in check-status API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
