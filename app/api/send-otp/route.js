import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rvhblgwvrmilqyzjbkla.supabase.co',
  'sb_publishable_HLfNpiWYSqiNPCN9DTy0lw_49rhUSb-'
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { data, error: insertError } = await supabase
      .from('otps')
      .insert([{ email, code, expires_at }])
      .select();

    if (insertError) {
      return NextResponse.json({ error: 'DB error: ' + insertError.message }, { status: 500 });
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_8Y7dwyr7_2GEJRFpR7pF9WfEuLKpjUqZq',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TrampoMoz <onboarding@resend.dev>',
        to: email,
        subject: 'O seu código de verificação - TrampoMoz',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;">
            <h2 style="color:#0070f3;">TrampoMoz</h2>
            <p>Olá <strong>${name}</strong>,</p>
            <p>Use o código abaixo para confirmar o envio da sua mensagem:</p>
            <div style="background:#f5f7fb;border-radius:8px;padding:24px;text-align:center;margin:24px 0;">
              <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#0070f3;">${code}</span>
            </div>
            <p style="color:#666;font-size:13px;">Este código expira em 10 minutos.</p>
          </div>
        `,
      }),
    });

    if (!resendRes.ok) {
      const resendErr = await resendRes.json();
      return NextResponse.json({ error: 'Email error: ' + JSON.stringify(resendErr) }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: 'Catch error: ' + err.message }, { status: 500 });
  }
}
