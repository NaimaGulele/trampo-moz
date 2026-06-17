'use client';
import { useState, useContext, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const jobTitle = params.get('job') || 'Vaga de Emprego';
  const company = params.get('company') || 'A sua empresa';

  const [step, setStep] = useState('form'); // form | processing | success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      setError('Por favor preencha todos os campos.');
      return;
    }
    if (!/^8[2-7]\d{7}$/.test(form.phone.replace(/\s/g, ''))) {
      setError('Número M-Pesa inválido. Ex: 84XXXXXXX');
      return;
    }

    setLoading(true);
    setError('');
    setStep('processing');

    try {
      // Step 1: Initiate M-Pesa payment
      const mpesaRes = await fetch('/api/mpesa/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 500,
          phone: form.phone.replace(/\s/g, ''),
          customerName: form.name,
          email: form.email,
          jobTitle: jobTitle,
          company: company
        }),
      });

      const mpesaData = await mpesaRes.json();
      
      if (!mpesaRes.ok) {
        setError(JSON.stringify(mpesaData));
        setStep('form');
        setLoading(false);
        return;
      }

      // Poll payment status until completed, cancelled, or timeout
      const maxAttempts = 20;
      let paymentConfirmed = false;

      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(r => setTimeout(r, 3000));

        const statusRes = await fetch('/api/mpesa/check-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transactionId: mpesaData.conversationId || mpesaData.transactionId,
            thirdPartyReference: mpesaData.thirdPartyReference,
          }),
        });

        const statusData = await statusRes.json();

        if (statusData.transactionStatus === 'Completed') {
          paymentConfirmed = true;
          break;
        }
        if (statusData.transactionStatus === 'Cancelled' || statusData.transactionStatus === 'Failed') {
          setError('Pagamento cancelado ou falhou. Por favor tente novamente.');
          setStep('form');
          setLoading(false);
          return;
        }
      }

      if (!paymentConfirmed) {
        setError('Tempo esgotado. Confirme o pagamento no telemóvel e tente novamente.');
        setStep('form');
        setLoading(false);
        return;
      }

      // Step 2: Create order with M-Pesa transaction details
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone.replace(/\s/g, ''),
          job_title: jobTitle,
          company,
          amount: 500,
          mpesaTransactionId: mpesaData.transactionId,
          mpesaReference: mpesaData.thirdPartyReference
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setError(orderData.error || 'Erro ao processar pedido.');
        setStep('form');
        setLoading(false);
        return;
      }

      setStep('success');
    } catch (err) {
      console.error('Payment error:', err);
      setError('Erro de ligação. Por favor tente novamente.');
      setStep('form');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fb', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {step === 'form' && (
          <>
            <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px', color: '#111' }}>💳 Checkout</h1>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Pagamento via M-Pesa — 500 MZN</p>

            {/* Order summary mini */}
            <div style={{ background: '#e8f0fe', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: '600', color: '#111', margin: '0 0 2px', fontSize: '14px' }}>{jobTitle}</p>
                <p style={{ color: '#555', fontSize: '12px', margin: 0 }}>{company}</p>
              </div>
              <p style={{ fontWeight: '700', color: '#0070f3', margin: 0, fontSize: '16px' }}>500 MZN</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Nome completo</label>
                <input style={inputStyle} type="text" placeholder="O seu nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Email</label>
                <input style={inputStyle} type="email" placeholder="email@exemplo.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '6px' }}>Número M-Pesa</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: '#555' }}>🇲🇿 +258</span>
                  <input style={{ ...inputStyle, paddingLeft: '90px' }} type="tel" placeholder="84 XXX XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0' }}>Irá receber uma notificação M-Pesa para confirmar o pagamento</p>
              </div>

              {error && <p style={{ color: '#e53e3e', fontSize: '13px', marginBottom: '12px', background: '#fff5f5', padding: '10px', borderRadius: '8px' }}>{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: '100%', padding: '14px', background: '#e8112d', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
              >
                🔴 Pagar com M-Pesa — 500 MZN
              </button>
            </div>

            <button onClick={() => router.back()} style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: '#666', fontSize: '14px', cursor: 'pointer', marginTop: '8px' }}>
              ← Voltar ao carrinho
            </button>
          </>
        )}

        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📱</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>A processar pagamento...</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Enviámos uma notificação M-Pesa para:</p>
            <p style={{ color: '#e8112d', fontWeight: '700', fontSize: '18px', marginBottom: '24px' }}>+258 {form.phone}</p>
            <p style={{ color: '#888', fontSize: '13px' }}>Confirme o pagamento no seu telemóvel</p>
            <div style={{ marginTop: '24px', width: '40px', height: '40px', border: '4px solid #e8112d', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '24px auto 0' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '10px' }}>Pagamento confirmado!</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '6px' }}>A sua vaga será publicada em breve.</p>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Enviámos um email de confirmação para <strong>{form.email}</strong></p>

            <div style={{ background: '#f0fff4', border: '1px solid #9ae6b4', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontWeight: '600', color: '#276749', margin: '0 0 8px', fontSize: '14px' }}>Detalhes do pedido:</p>
              <p style={{ color: '#333', fontSize: '13px', margin: '0 0 4px' }}>📋 {jobTitle}</p>
              <p style={{ color: '#333', fontSize: '13px', margin: '0 0 4px' }}>🏢 {company}</p>
              <p style={{ color: '#333', fontSize: '13px', margin: 0 }}>💰 500 MZN pagos via M-Pesa</p>
            </div>

            <button
              onClick={() => router.push('/')}
              style={{ width: '100%', padding: '14px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
            >
              Voltar ao início
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
