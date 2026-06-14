'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [otp, setOtp] = useState('');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Erro ao enviar.');
      return;
    }

    setStep('otp');
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Send form data along with OTP so no cookie is needed
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        code: otp,
        name: form.name,
        message: form.message,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Código inválido.');
      return;
    }

    setStep('success');
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const btnStyle = {
    width: '100%',
    padding: '13px',
    background: loading ? '#999' : '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    marginTop: '8px',
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '36px 32px', maxWidth: '440px', width: '100%', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>

        {step === 'form' && (
          <>
            <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px', color: '#111' }}>Fale Connosco</h1>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Enviaremos um código de verificação para o seu email.</p>

            <form onSubmit={handleSubmitForm}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#444', display: 'block', marginBottom: '6px' }}>Nome</label>
                <input style={inputStyle} type="text" required placeholder="O seu nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#444', display: 'block', marginBottom: '6px' }}>Email</label>
                <input style={inputStyle} type="email" required placeholder="email@exemplo.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#444', display: 'block', marginBottom: '6px' }}>Mensagem</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }} required placeholder="Escreva a sua mensagem..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>

              {error && <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

              <button style={btnStyle} type="submit" disabled={loading}>
                {loading ? 'A enviar...' : 'Enviar código de verificação'}
              </button>
            </form>
          </>
        )}

        {step === 'otp' && (
          <>
            <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px', color: '#111' }}>Verificar Email</h1>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Enviámos um código de 6 dígitos para:</p>
            <p style={{ color: '#0070f3', fontWeight: '600', fontSize: '15px', marginBottom: '24px' }}>{form.email}</p>

            <form onSubmit={handleVerifyOtp}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#444', display: 'block', marginBottom: '6px' }}>Código OTP</label>
                <input
                  style={{ ...inputStyle, fontSize: '28px', letterSpacing: '10px', textAlign: 'center', fontWeight: '700' }}
                  type="text"
                  required
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              {error && <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

              <button style={btnStyle} type="submit" disabled={loading}>
                {loading ? 'A verificar...' : 'Confirmar e enviar mensagem'}
              </button>

              <button
                type="button"
                onClick={() => { setStep('form'); setError(''); setOtp(''); }}
                style={{ width: '100%', padding: '10px', background: 'transparent', border: 'none', color: '#666', fontSize: '13px', cursor: 'pointer', marginTop: '8px' }}
              >
                ← Voltar ao formulário
              </button>
            </form>
          </>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '10px' }}>Mensagem enviada!</h1>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
              Obrigado, <strong>{form.name}</strong>! A sua mensagem foi recebida com sucesso.
            </p>
            <button
              onClick={() => { setStep('form'); setForm({ name: '', email: '', message: '' }); setOtp(''); }}
              style={{ ...btnStyle, width: 'auto', padding: '12px 28px' }}
            >
              Enviar outra mensagem
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
