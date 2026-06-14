import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rvhblgwvrmilqyzjbkla.supabase.co',
  'sb_publishable_HLfNpiWYSqiNPCN9DTy0lw_49rhUSb-'
);

export async function POST(request) {
  try {
    const { email, code, name, message } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    // Get all recent unused OTPs for this email
    const { data: otpRecords, error } = await supabase
      .from('otps')
      .select('*')
      .eq('email', email)
      .eq('used', false)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      return NextResponse.json({ error: 'Erro na base de dados.' }, { status: 500 });
    }

    if (!otpRecords || otpRecords.length === 0) {
      return NextResponse.json({ error: 'Nenhum código encontrado para este email.' }, { status: 400 });
    }

    // Find matching code
    const now = new Date();
    const match = otpRecords.find(r =>
      r.code === code && new Date(r.expires_at) > now
    );

    if (!match) {
      return NextResponse.json({ error: 'Código inválido ou expirado.' }, { status: 400 });
    }

    // Mark OTP as used
    await supabase.from('otps').update({ used: true }).eq('id', match.id);

    // Save message
    if (name && message) {
      await supabase.from('contact_messages').insert([{ name, email, message }]);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
