import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

    // Save OTP + form data temporarily in otps table
    await supabase.from('otps').insert([{ email, code, expires_at }]);

    // Send OTP email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer re_8Y7dwyr7_2GEJRFpR7pF9WfEuLKpjUqZq`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TrampoMoz <onboarding@resend.dev>',
        to: email,
        subject: 'O seu código de verificação - TrampoMoz',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #0070f3;">TrampoMoz</h2>
            <p>Olá <strong>${name}</strong>,</p>
            <p>Use o código abaixo para confirmar o envio da sua mensagem:</p>
            <div style="background: #f5f7fb; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
              <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0070f3;">${code}</span>
            </div>
            <p style="color: #666; font-size: 13px;">Este código expira em 10 minutos.</p>
            <p style="color: #666; font-size: 13px;">Se não enviou esta mensagem, ignore este email.</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Resend error:', err);
      return NextResponse.json({ error: 'Erro ao enviar email.' }, { status: 500 });
    }

    // Store form data in session via cookie (temporary)
    const response = NextResponse.json({ success: true });
    response.cookies.set('contact_form', JSON.stringify({ name, email, message }), {
      httpOnly: true,
      maxAge: 600, // 10 min
      path: '/',
    });
    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
