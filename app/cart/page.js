'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CartContent() {
  const router = useRouter();
  const params = useSearchParams();
  const jobTitle = params.get('job') || 'Vaga de Emprego';
  const company = params.get('company') || 'A sua empresa';

  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fb', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px', color: '#111' }}>🛒 Carrinho</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Reveja o seu pedido antes de continuar</p>

        {/* Order summary */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#444', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resumo do Pedido</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0', marginBottom: '16px' }}>
            <div>
              <p style={{ fontWeight: '600', color: '#111', margin: '0 0 4px' }}>📋 {jobTitle}</p>
              <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>🏢 {company}</p>
              <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>Publicação de vaga — 30 dias</p>
            </div>
            <p style={{ fontWeight: '700', color: '#111', fontSize: '16px', margin: 0, whiteSpace: 'nowrap' }}>500 MZN</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: '700', fontSize: '16px', color: '#111', margin: 0 }}>Total</p>
            <p style={{ fontWeight: '700', fontSize: '20px', color: '#0070f3', margin: 0 }}>500 MZN</p>
          </div>
        </div>

        {/* What's included */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#444', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>O que está incluído</h2>
          {['✅ Publicação visível por 30 dias', '✅ Candidaturas ilimitadas', '✅ Email de confirmação', '✅ Suporte TrampoMoz'].map((item, i) => (
            <p key={i} style={{ fontSize: '14px', color: '#333', margin: '0 0 8px' }}>{item}</p>
          ))}
        </div>

        <button
          onClick={() => router.push(`/checkout?job=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(company)}`)}
          style={{ width: '100%', padding: '14px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
        >
          Continuar para Pagamento →
        </button>

        <button
          onClick={() => router.back()}
          style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: '#666', fontSize: '14px', cursor: 'pointer', marginTop: '8px' }}
        >
          ← Voltar
        </button>
      </div>
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense>
      <CartContent />
    </Suspense>
  );
}
