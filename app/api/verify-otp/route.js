import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    // Find valid OTP
    const { data: otpRecord, error } = await supabase
      .from('otps')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !otpRecord) {
      return NextResponse.json({ error: 'Código inválido ou expirado.' }, { status: 400 });
    }

    // Mark OTP as used
    await supabase.from('otps').update({ used: true }).eq('id', otpRecord.id);

    // Get form data from cookie
    const cookieStore = cookies();
    const formCookie = cookieStore.get('contact_form');

    if (!formCookie) {
      return NextResponse.json({ error: 'Sessão expirada. Por favor reenvie o formulário.' }, { status: 400 });
    }

    const { name, message } = JSON.parse(formCookie.value);

    // Save message to Supabase
    await supabase.from('contact_messages').insert([{ name, email, message }]);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
