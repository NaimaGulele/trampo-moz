import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { email, code, name, message } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    // Find valid OTP — search by email only first, then check code
    const { data: otpRecords, error } = await supabase
      .from('otps')
      .select('*')
      .eq('email', email)
      .eq('used', false)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error || !otpRecords || otpRecords.length === 0) {
      return NextResponse.json({ error: 'Código inválido ou expirado.' }, { status: 400 });
    }

    // Find matching code manually (avoids strict query timing issues)
    const now = new Date();
    const match = otpRecords.find(r =>
      r.code === code && new Date(r.expires_at) > now
    );

    if (!match) {
      return NextResponse.json({ error: 'Código inválido ou expirado.' }, { status: 400 });
    }

    // Mark OTP as used
    await supabase.from('otps').update({ used: true }).eq('id', match.id);

    // Save message to Supabase (form data sent directly from client)
    if (name && message) {
      await supabase.from('contact_messages').insert([{ name, email, message }]);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
