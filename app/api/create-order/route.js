import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  'https://rvhblgwvrmilqyzjbkla.supabase.co',
  'sb_publishable_HLfNpiWYSqiNPCN9DTy0lw_49rhUSb-'
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'naimagulele55@gmail.com',
    pass: 'twcqtujmoftllcqt',
  },
});

export async function POST(request) {
  try {
    const { name, email, phone, job_title, company, amount, mpesaTransactionId, mpesaReference } = await request.json();

    if (!name || !email || !phone || !job_title || !company) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
    }

    // Save order to Supabase with M-Pesa transaction details
    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert([{ 
        name, 
        email, 
        phone, 
        job_title, 
        company, 
        amount, 
        status: 'paid',
        mpesa_transaction_id: mpesaTransactionId || null,
        mpesa_reference: mpesaReference || null,
        payment_method: 'mpesa'
      }])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: 'Erro ao guardar pedido: ' + insertError.message }, { status: 500 });
    }

    // Send confirmation email
    await transporter.sendMail({
      from: '"TrampoMoz" <naimagulele55@gmail.com>',
      to: email,
      subject: `✅ Confirmação de pedido — ${job_title} | TrampoMoz`,
      html: `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação TrampoMoz</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0070f3,#0050c8);padding:32px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">TrampoMoz</h1>
              <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">Plataforma de Emprego em Moçambique</p>
            </td>
          </tr>

          <!-- Success banner -->
          <tr>
            <td style="background:#f0fff4;padding:20px 32px;text-align:center;border-bottom:1px solid #c6f6d5;">
              <p style="margin:0;font-size:32px;">✅</p>
              <h2 style="margin:8px 0 4px;color:#276749;font-size:20px;">Pagamento Confirmado!</h2>
              <p style="margin:0;color:#48bb78;font-size:14px;">A sua vaga será publicada em breve</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="color:#333;font-size:15px;margin:0 0 24px;">Olá <strong>${name}</strong>,</p>
              <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 24px;">
                Obrigado pelo seu pedido! O pagamento foi processado com sucesso via M-Pesa e a sua vaga de emprego está a ser preparada para publicação.
              </p>

              <!-- Order details box -->
              <table width="100%" style="background:#f8faff;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px;color:#0070f3;font-size:14px;text-transform:uppercase;letter-spacing:0.08em;">Detalhes do Pedido</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#666;font-size:13px;">📋 Vaga</span>
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;text-align:right;">
                          <strong style="color:#111;font-size:13px;">${job_title}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#666;font-size:13px;">🏢 Empresa</span>
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;text-align:right;">
                          <strong style="color:#111;font-size:13px;">${company}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#666;font-size:13px;">📱 M-Pesa</span>
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;text-align:right;">
                          <strong style="color:#111;font-size:13px;">+258 ${phone}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#666;font-size:13px;">⏱️ Duração</span>
                        </td>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;text-align:right;">
                          <strong style="color:#111;font-size:13px;">30 dias</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0 0;">
                          <span style="color:#666;font-size:14px;font-weight:700;">Total Pago</span>
                        </td>
                        <td style="padding:10px 0 0;text-align:right;">
                          <strong style="color:#0070f3;font-size:18px;font-weight:800;">${amount} MZN</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What happens next -->
              <h3 style="color:#111;font-size:15px;margin:0 0 12px;">O que acontece agora?</h3>
              <p style="color:#555;font-size:13px;margin:0 0 8px;line-height:1.6;">1. A sua vaga será revista e publicada em até 24 horas</p>
              <p style="color:#555;font-size:13px;margin:0 0 8px;line-height:1.6;">2. Candidatos qualificados poderão ver e candidatar-se</p>
              <p style="color:#555;font-size:13px;margin:0 0 24px;line-height:1.6;">3. Receberá notificações de candidaturas no seu email</p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://trampo-moz-cidm.vercel.app" style="display:inline-block;background:#0070f3;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:15px;">
                      Ver o meu perfil →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8faff;padding:24px 32px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;color:#888;font-size:12px;">TrampoMoz — Plataforma de Emprego em Moçambique</p>
              <p style="margin:0 0 4px;color:#888;font-size:12px;">📧 naimagulele55@gmail.com</p>
              <p style="margin:0;color:#888;font-size:12px;">📞 +258 84 000 000</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno: ' + err.message }, { status: 500 });
  }
}
