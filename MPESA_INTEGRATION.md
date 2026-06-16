# M-Pesa Payment Integration Documentation

## Overview
This document describes the M-Pesa payment integration for TrampoMoz, enabling customers to pay for job postings using M-Pesa mobile money in Mozambique.

## Architecture

### Components

1. **M-Pesa Library** (`lib/mpesa.js`)
   - Handles API authentication and encryption
   - Initiates C2B (Customer to Business) payments
   - Queries transaction status
   - Validates phone numbers

2. **API Routes**
   - `/api/mpesa/initiate-payment` - Initiates M-Pesa payment request
   - `/api/mpesa/check-status` - Checks transaction status
   - `/api/create-order` - Creates order record with M-Pesa details

3. **Checkout Page** (`app/checkout/page.js`)
   - User interface for payment
   - Integrates with M-Pesa API
   - Handles payment flow

## Configuration

### Environment Variables (.env.local)

```env
# M-Pesa API Configuration
MPESA_API_KEY=fwd2e6e8gjvyzi86hu1tokv0fq6qxm9u
MPESA_PUBLIC_KEY=MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==

# M-Pesa Environment (sandbox or production)
MPESA_ENVIRONMENT=sandbox
MPESA_SERVICE_PROVIDER_CODE=171717
```

**Important:** 
- Currently configured for **sandbox** environment
- Change `MPESA_ENVIRONMENT=production` for live transactions
- Update `MPESA_SERVICE_PROVIDER_CODE` with your production code

## Payment Flow

### 1. User Initiates Payment
- User fills in checkout form (name, email, phone)
- Clicks "Pagar com M-Pesa" button

### 2. Payment Request
```javascript
POST /api/mpesa/initiate-payment
{
  "amount": 500,
  "phone": "84XXXXXXX",
  "customerName": "John Doe",
  "email": "john@example.com",
  "jobTitle": "Software Developer",
  "company": "Tech Company"
}
```

### 3. M-Pesa Processing
- API encrypts credentials using RSA public key
- Obtains session token from M-Pesa
- Sends C2B payment request
- Customer receives push notification on phone
- Customer enters M-Pesa PIN to confirm

### 4. Order Creation
```javascript
POST /api/create-order
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "84XXXXXXX",
  "job_title": "Software Developer",
  "company": "Tech Company",
  "amount": 500,
  "mpesaTransactionId": "MPESA123456",
  "mpesaReference": "ORDER_1234567890"
}
```

### 5. Confirmation
- Order saved to Supabase database
- Confirmation email sent to customer
- Success page displayed

## API Endpoints

### Initiate Payment
**Endpoint:** `POST /api/mpesa/initiate-payment`

**Request Body:**
```json
{
  "amount": 500,
  "phone": "84XXXXXXX",
  "customerName": "Customer Name",
  "email": "customer@email.com",
  "jobTitle": "Job Title",
  "company": "Company Name"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Payment request sent. Please check your phone for M-Pesa prompt.",
  "transactionId": "MPESA_TRANSACTION_ID",
  "conversationId": "CONVERSATION_ID",
  "transactionReference": "TRAMPO1234567890",
  "thirdPartyReference": "ORDER_1234567890",
  "responseCode": "INS-0",
  "responseDesc": "Request processed successfully"
}
```

**Response (Error):**
```json
{
  "error": "Invalid Mozambique phone number. Use format: 84XXXXXXX"
}
```

### Check Transaction Status
**Endpoint:** `POST /api/mpesa/check-status`

**Request Body:**
```json
{
  "transactionId": "MPESA_TRANSACTION_ID",
  "thirdPartyReference": "ORDER_1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "status": "INS-0",
  "description": "Transaction completed successfully",
  "data": { /* Full M-Pesa response */ }
}
```

## Phone Number Format

### Accepted Formats
- `84XXXXXXX` (Vodacom)
- `85XXXXXXX` (Movitel)
- `86XXXXXXX` (Vodacom)
- `87XXXXXXX` (Movitel)

### Validation
The system automatically:
- Removes spaces from input
- Validates against Mozambique mobile patterns
- Adds country code (258) for API calls

## Database Schema

### Orders Table
Add these columns to your Supabase `orders` table:

```sql
ALTER TABLE orders 
ADD COLUMN mpesa_transaction_id TEXT,
ADD COLUMN mpesa_reference TEXT,
ADD COLUMN payment_method TEXT DEFAULT 'mpesa';
```

## Testing

### Sandbox Testing
1. Use sandbox credentials in `.env.local`
2. Use test phone numbers provided by M-Pesa
3. Test transactions won't charge real money

### Test Scenarios
- ✅ Valid phone number (84XXXXXXX)
- ❌ Invalid phone number (12345678)
- ✅ Successful payment
- ❌ Insufficient balance
- ❌ User cancels payment

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid phone number" | Wrong format | Use 84/85/86/87 prefix |
| "Failed to get session" | Invalid API key | Check credentials |
| "Payment request failed" | M-Pesa API error | Check logs, retry |
| "Insufficient balance" | User has no funds | User needs to top up |

## Security

### Best Practices
1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use environment variables** - All credentials in env vars
3. **Encrypt API key** - RSA encryption before sending
4. **Validate inputs** - Phone numbers and amounts validated
5. **Log transactions** - All transactions logged for audit

### API Key Encryption
```javascript
// API key is encrypted using RSA public key
const publicKey = `-----BEGIN PUBLIC KEY-----
${MPESA_PUBLIC_KEY}
-----END PUBLIC KEY-----`;

const encrypted = crypto.publicEncrypt({
  key: publicKey,
  padding: crypto.constants.RSA_PKCS1_PADDING,
}, Buffer.from(MPESA_API_KEY));
```

## Production Deployment

### Checklist
- [ ] Update `MPESA_ENVIRONMENT=production`
- [ ] Update `MPESA_SERVICE_PROVIDER_CODE` with production code
- [ ] Get production API credentials from M-Pesa
- [ ] Test with small amounts first
- [ ] Set up monitoring and alerts
- [ ] Configure webhook for payment callbacks (optional)
- [ ] Update database schema in production
- [ ] Test error scenarios

### Environment Variables (Production)
```env
MPESA_API_KEY=your_production_api_key
MPESA_PUBLIC_KEY=your_production_public_key
MPESA_ENVIRONMENT=production
MPESA_SERVICE_PROVIDER_CODE=your_production_code
```

## Monitoring

### What to Monitor
- Payment success rate
- Failed transactions
- Response times
- API errors
- User drop-off points

### Logging
All M-Pesa operations are logged:
```javascript
console.log('Initiating M-Pesa payment:', { amount, phone, reference });
console.log('M-Pesa payment response:', responseData);
console.error('M-Pesa payment failed:', error);
```

## Support

### M-Pesa API Documentation
- Sandbox: https://developer.mpesa.vm.co.mz/
- Support: developer@vm.co.mz

### Common Issues
1. **"Session expired"** - Token expires after 1 hour, automatically refreshed
2. **"Invalid service provider"** - Check SERVICE_PROVIDER_CODE
3. **"Transaction timeout"** - User didn't confirm within time limit

## Future Enhancements

### Recommended Improvements
1. **Webhook Integration** - Real-time payment notifications
2. **Transaction Status Polling** - Auto-check payment status
3. **Retry Logic** - Automatic retry for failed requests
4. **Payment History** - Dashboard for viewing transactions
5. **Refund Support** - B2C reversal API integration
6. **Multi-currency** - Support for USD/EUR
7. **Payment Links** - Generate shareable payment links

## Code Examples

### Using M-Pesa Library
```javascript
import { 
  initiateC2BPayment, 
  generateTransactionReference,
  validateMozambiquePhone 
} from '@/lib/mpesa';

// Validate phone
if (!validateMozambiquePhone('84XXXXXXX')) {
  console.error('Invalid phone');
}

// Generate reference
const ref = generateTransactionReference();
// Output: TRAMPO17182345671234

// Initiate payment
const result = await initiateC2BPayment({
  amount: '500',
  msisdn: '84XXXXXXX',
  reference: ref,
  thirdPartyReference: 'ORDER_123'
});

if (result.success) {
  console.log('Payment initiated:', result.transactionId);
}
```

## Troubleshooting

### Debug Mode
Enable detailed logging:
```javascript
// In lib/mpesa.js
console.log('Request:', paymentData);
console.log('Response:', responseData);
```

### Test API Connection
```bash
# Test if M-Pesa API is reachable
curl https://api.sandbox.vm.co.mz/ipg/v1x/getSession/
```

### Verify Environment Variables
```javascript
// Add to API route
console.log('MPESA_ENVIRONMENT:', process.env.MPESA_ENVIRONMENT);
console.log('API_KEY exists:', !!process.env.MPESA_API_KEY);
```

## License
This integration is part of TrampoMoz platform.

## Contact
For technical support: naimagulele55@gmail.com
