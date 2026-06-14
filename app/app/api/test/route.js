import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rvhblgwvrmilqyzjbkla.supabase.co',
  'sb_publishable_HLfNpiWYSqiNPCN9DTy0lw_49rhUSb-'
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('otps')
      .insert([{
        email: 'test@test.com',
        code: '123456',
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
      }])
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message, details: error });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
