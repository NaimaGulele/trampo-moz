-- M-Pesa Integration: Update Orders Table Schema
-- Run this SQL in your Supabase SQL Editor to add M-Pesa transaction tracking

-- Add M-Pesa transaction columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS mpesa_transaction_id TEXT,
ADD COLUMN IF NOT EXISTS mpesa_reference TEXT,
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'mpesa';

-- Add index for faster lookups by M-Pesa transaction ID
CREATE INDEX IF NOT EXISTS idx_orders_mpesa_transaction_id 
ON orders(mpesa_transaction_id);

-- Add index for payment method filtering
CREATE INDEX IF NOT EXISTS idx_orders_payment_method 
ON orders(payment_method);

-- Add comment to document the columns
COMMENT ON COLUMN orders.mpesa_transaction_id IS 'M-Pesa transaction ID returned from payment API';
COMMENT ON COLUMN orders.mpesa_reference IS 'Internal reference for M-Pesa transaction tracking';
COMMENT ON COLUMN orders.payment_method IS 'Payment method used: mpesa, card, etc.';

-- Optional: View to see recent M-Pesa transactions
CREATE OR REPLACE VIEW recent_mpesa_transactions AS
SELECT 
    id,
    name,
    email,
    phone,
    job_title,
    company,
    amount,
    status,
    mpesa_transaction_id,
    mpesa_reference,
    created_at
FROM orders
WHERE payment_method = 'mpesa'
ORDER BY created_at DESC
LIMIT 100;

-- Grant access to the view (adjust role as needed)
GRANT SELECT ON recent_mpesa_transactions TO authenticated;

-- Success message
SELECT 'M-Pesa schema update completed successfully!' as message;
