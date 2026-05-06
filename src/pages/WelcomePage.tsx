import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';

const WelcomePage: React.FC = () => {
  const { navigateTo, currentUnit, unitCompleted } = useApp();
  const unit = units.find((u) => u.id === currentUnit)!;
  const meta = unit.meta;
  const alreadyStarted = !!unitCompleted[unit.id];

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Hero */}
        <div className="tl-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{unit.icon}</div>
          <p
            className="tl-subtitle"
            style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}
          >
            {unit.title}
          </p>
          <h1 className="tl-title" style={{ margin: '0 0 0.5rem', fontSize: '1.6rem' }}>
            {unit.subtitle}
          </h1>
          <p style={{ color: '#3d6a28', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: 540, margin: '0 auto' }}>
            {unit.description}
          </p>
        </div>

        {/* Bloco de metadados (carga horaria, nivel, referencia, abordagem) */}
        {meta && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.6rem',
            }}
          >
            {[
              { label: 'Carga horária', value: meta.cargaHoraria, color: '#5aaa38' },
              { label: 'Nível', value: meta.nivel, color: '#2d8f2d' },
              { label: 'Referência', value: meta.referencia, color: '#c0a000' },
              { label: 'Abordagem', value: meta.abordagem, color: '#5588cc' },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  background: '#f4fff0',
                  border: `2px solid ${m.color}`,
                  borderRadius: 10,
                  padding: '0.6rem 0.75rem',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    margin: '0 0 2px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#5a7a4a',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {m.label}
                </p>
                <p style={{ margin: 0, fontWeight: 800, color: m.color, fontSize: '0.9rem' }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Trilha visual */}
        <div className="tl-card">
          <p style={{ margin: '0 0 0.6rem', fontWeight: 800, color: '#1a4a10' }}>
            Etapas da unidade
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              '📖 Boas-vindas',
              '🎯 Objetivos',
              ...(unit.situationProblem ? ['🧩 Situação-Problema'] : []),
              '🧪 Conhec. Prévios',
              '📚 Conteúdo',
              ...(unit.demonstration ? ['🔬 Demonstração'] : []),
              ...(unit.atividade11 ? ['✅ Atividade 1.1'] : []),
              ...(unit.atividade12 ? ['💬 Atividade 1.2'] : []),
              '🛠 Prática Guiada',
              '✏️ Prática Independente',
              '📈 Feedback',
              '📝 Avaliação Final',
              '🏆 Desafio Aplicado',
            ].map((label, i) => (
              <span
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid var(--tl-card-border)',
                  borderRadius: 14,
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#2d6e18',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* O que vai aprender */}
        <div className="tl-card">
          <h3 style={{ margin: '0 0 0.75rem', color: 'var(--tl-title)', fontWeight: 800 }}>
            📋 O que você vai aprender
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {unit.objectives.map((obj, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'flex-start',
                  fontSize: '0.875rem',
                  color: '#2d5a1e',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: 'var(--tl-title)', fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('units')}>
            ← Voltar para Unidades
          </button>
          <button className="tl-btn" onClick={() => navigateTo('objectives')}>
            {alreadyStarted ? 'Continuar' : 'Iniciar'} →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomePage;
