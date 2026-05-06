import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

const SituationProblemPage: React.FC = () => {
  const { navigateTo, currentUnit, setSituationProblemRead } = useApp();
  const unit = units.find((u) => u.id === currentUnit)!;
  const sp = unit.situationProblem;

  if (!sp) {
    // unidade sem situacao-problema — pula para o proximo
    const next = nextPage('situation-problem', unit) ?? 'prior-knowledge';
    navigateTo(next);
    return null;
  }

  const handleContinue = () => {
    setSituationProblemRead(true);
    const next = nextPage('situation-problem', unit) ?? 'prior-knowledge';
    navigateTo(next);
  };

  const handleBack = () => {
    const prev = previousPage('situation-problem', unit) ?? 'objectives';
    navigateTo(prev);
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Situação-Problema Inicial
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            {sp.title}
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Leia o cenário abaixo e reflita antes de continuar.
          </p>
        </div>

        {/* Narrativa */}
        <div className="tl-card" style={{ borderColor: 'var(--tl-title)', borderWidth: 2 }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>📖</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {sp.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: 0, fontSize: '0.9rem', color: '#2d5a1e', lineHeight: 1.6 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Diálogos */}
        {sp.dialogues && sp.dialogues.length > 0 && (
          <div className="tl-card" style={{ background: '#fff8e7', borderColor: '#c0a000' }}>
            <p style={{ margin: '0 0 0.6rem', fontWeight: 800, color: '#7a6000', fontSize: '0.9rem' }}>
              💬 Falas da equipe
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {sp.dialogues.map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid #c0a000',
                    borderRadius: 8,
                    padding: '0.6rem 0.8rem',
                  }}
                >
                  <p style={{ margin: '0 0 2px', fontSize: '0.78rem', fontWeight: 800, color: '#7a6000' }}>
                    {d.speaker}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#3a2e00', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{d.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reflexão */}
        <div className="tl-card" style={{ background: '#e4f4ff', borderColor: '#5588cc' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#224488', fontSize: '0.95rem' }}>
            🤔 Reflita antes de continuar
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {sp.reflectionQuestions.map((q, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#1d3a66', lineHeight: 1.5 }}>
                <span style={{ color: '#224488', fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        {/* Conclusão */}
        <div className="tl-card">
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🎯</span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.6 }}>
              {sp.conclusion}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
          <button className="tl-btn" onClick={handleContinue}>
            Já refleti, continuar →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SituationProblemPage;
