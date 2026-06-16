# M-Pesa Integration - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you quickly set up and test the M-Pesa payment integration.

## ✅ Prerequisites

- Node.js installed
- Project dependencies installed (`npm install`)
- Supabase database configured
- M-Pesa API credentials (already provided)

## 📋 Setup Steps

### 1. Environment Variables
The `.env.local` file has already been created with your M-Pesa credentials:

```env
MPESA_API_KEY=fwd2e6e8gjvyzi86hu1tokv0fq6qxm9u
MPESA_PUBLIC_KEY=MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==
MPESA_ENVIRONMENT=sandbox
MPESA_SERVICE_PROVIDER_CODE=171717
```

✅ **This file is already configured and ready to use!**

### 2. Update Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS mpesa_transaction_id TEXT,
ADD COLUMN IF NOT EXISTS mpesa_reference TEXT,
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'mpesa';
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🧪 Testing the Integration

### Test Payment Flow

1. **Navigate to Checkout**
   - Go to: `http://localhost:3000/checkout?job=Software%20Developer&company=Tech%20Company`

2. **Fill in the Form**
   - Name: Your name
   - Email: Your email
   - Phone: Use format `84XXXXXXX` (Mozambique number)

3. **Click "Pagar com M-Pesa"**
   - The system will initiate M-Pesa payment
   - In sandbox mode, you'll see the processing screen
   - After 3 seconds, order will be created

4. **Check Results**
   - Success page will display
   - Check your email for confirmation
   - Check Supabase `orders` table for the record

### Test Phone Numbers

**Valid formats:**
- ✅ `84XXXXXXX` (Vodacom)
- ✅ `85XXXXXXX` (Movitel)
- ✅ `86XXXXXXX` (Vodacom)
- ✅ `87XXXXXXX` (Movitel)

**Invalid formats:**
- ❌ `12345678`
- ❌ `91XXXXXXX`
- ❌ `+258 84XXXXXXX` (will be auto-formatted)

## 📁 Files Created

The integration includes these new files:

```
trampo-moz/
├── .env.local                              # M-Pesa credentials
├── lib/
│   └── mpesa.js                           # M-Pesa library
├── app/
│   ├── api/
│   │   └── mpesa/
│   │       ├── initiate-payment/
│   │       │   └── route.js              # Payment initiation API
│   │       └── check-status/
│   │           └── route.js              # Status check API
│   └── checkout/
│       └── page.js                        # Updated with M-Pesa
├── MPESA_INTEGRATION.md                   # Full documentation
└── MPESA_QUICK_START.md                   # This file
```

## 🔍 Verify Installation

### Check API Endpoints

**Test initiate-payment endpoint:**
```bash
curl -X POST http://localhost:3000/api/mpesa/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "phone": "84XXXXXXX",
    "customerName": "Test User",
    "email": "test@example.com",
    "jobTitle": "Test Job",
    "company": "Test Company"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Payment request sent. Please check your phone for M-Pesa prompt.",
  "transactionId": "...",
  "conversationId": "...",
  "transactionReference": "TRAMPO...",
  "thirdPartyReference": "ORDER_..."
}
```

## 🐛 Troubleshooting

### Issue: "Failed to get session"
**Solution:** Check that your API credentials are correct in `.env.local`

### Issue: "Invalid phone number"
**Solution:** Use Mozambique format: `84XXXXXXX`, `85XXXXXXX`, `86XXXXXXX`, or `87XXXXXXX`

### Issue: Environment variables not loading
**Solution:** 
1. Restart the dev server: `npm run dev`
2. Verify `.env.local` exists in project root
3. Check file is not named `.env.local.txt`

### Issue: Database error when creating order
**Solution:** Run the database schema update SQL (step 2 above)

## 📊 Monitor Transactions

### Check Server Logs
Watch the terminal where `npm run dev` is running. You'll see:
```
Initiating M-Pesa payment: { amount: '500', phone: '258XXXXXXXXX', reference: 'TRAMPO...' }
M-Pesa payment response: { ... }
```

### Check Database
Query your Supabase `orders` table:
```sql
SELECT * FROM orders 
WHERE payment_method = 'mpesa' 
ORDER BY created_at DESC 
LIMIT 10;
```

## 🎯 Next Steps

### For Development
1. ✅ Test with different phone numbers
2. ✅ Test error scenarios (invalid phone, etc.)
3. ✅ Check email confirmations
4. ✅ Verify database records

### For Production
1. 🔄 Get production M-Pesa credentials
2. 🔄 Update `.env.local` with production values
3. 🔄 Change `MPESA_ENVIRONMENT=production`
4. 🔄 Update `MPESA_SERVICE_PROVIDER_CODE`
5. 🔄 Test with small real transactions
6. 🔄 Set up monitoring and alerts

## 📚 Additional Resources

- **Full Documentation:** See `MPESA_INTEGRATION.md`
- **M-Pesa Developer Portal:** https://developer.mpesa.vm.co.mz/
- **API Reference:** Check M-Pesa API docs for detailed endpoint info

## 🔐 Security Notes

- ✅ `.env.local` is in `.gitignore` - credentials won't be committed
- ✅ API key is encrypted before sending to M-Pesa
- ✅ Phone numbers are validated before processing
- ✅ All transactions are logged for audit

## 💡 Tips

1. **Sandbox Mode:** Currently in sandbox - no real money charged
2. **Phone Format:** System auto-adds country code (258)
3. **Transaction IDs:** Unique references generated automatically
4. **Email Confirmations:** Sent after successful payment
5. **Error Handling:** User-friendly error messages displayed

## 🎉 You're Ready!

Your M-Pesa integration is now set up and ready to test. Navigate to the checkout page and try making a payment!

```bash
# Start the server if not already running
npm run dev

# Open in browser
# http://localhost:3000/checkout?job=Test%20Job&company=Test%20Company
```

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Consult `MPESA_INTEGRATION.md` for detailed info
4. Contact: naimagulele55@gmail.com

---

**Happy Testing! 🚀**
