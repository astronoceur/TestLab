import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';

const IndependentPracticePage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    independentPracticeAnswer, setIndependentPracticeAnswer,
    independentPracticeSubmitted, setIndependentPracticeSubmitted,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const ip = unit.independentPractice;

  const handleChange = (key: string, value: string) => {
    if (independentPracticeSubmitted) return;
    setIndependentPracticeAnswer({ ...independentPracticeAnswer, [key]: value });
  };

  const allFilled = ip.fields.every((f) => (independentPracticeAnswer[f.key] ?? '').trim().length > 0);

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>
            Prática Independente
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Complete esta atividade por conta própria. Sem limite de tempo.
          </p>
        </div>

        <div className="tl-card" style={{ background: '#fffde0', borderColor: '#c0a000' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📋</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#7a6000' }}>Cenário</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#5a4800', lineHeight: 1.5 }}>{ip.scenario}</p>
            </div>
          </div>
        </div>

        <div className="tl-card">
          <p style={{ margin: '0 0 1rem', fontWeight: 800, color: '#1a4a10' }}>
            Preencha a estrutura do caso de teste:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {ip.fields.map((field) => (
              <div key={field.key}>
                <label className="tl-label">{field.label}</label>
                <textarea
                  className="tl-input"
                  value={independentPracticeAnswer[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={independentPracticeSubmitted}
                  placeholder={field.placeholder}
                  rows={3}
                  style={{ resize: 'vertical' }}
                />
              </div>
            ))}
          </div>
        </div>

        {independentPracticeSubmitted && (
          <div className="tl-card" style={{ background: '#d4f0c0', borderColor: '#2d8f2d' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <div>
                <p style={{ margin: '0 0 2px', fontWeight: 800, color: '#0a4f0a' }}>
                  Enviado! Veja uma resposta modelo:
                </p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#1a6a1a' }}>
                  Sua resposta pode variar — compare com a estrutura esperada abaixo.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {ip.fields.map((field) => (
                <div
                  key={field.key}
                  style={{
                    background: '#fff',
                    border: '1px solid #2d8f2d',
                    borderRadius: 8,
                    padding: '0.6rem 0.75rem',
                  }}
                >
                  <p style={{ margin: '0 0 2px', fontSize: '0.72rem', fontWeight: 800, color: '#0a5f0a', textTransform: 'uppercase' }}>
                    {field.label}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#1a4a10', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                    {ip.sampleAnswer[field.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('guided-practice')}>← Voltar</button>
          {!independentPracticeSubmitted ? (
            <button className="tl-btn" onClick={() => setIndependentPracticeSubmitted(true)} disabled={!allFilled}>
              Enviar Caso de Teste
            </button>
          ) : (
            <button className="tl-btn" onClick={() => navigateTo('feedback')}>
              Ver Feedback →
            </button>
          )}
        </div>
        {!independentPracticeSubmitted && !allFilled && (
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#7a5a00', margin: 0 }}>
            Preencha todos os campos para enviar.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default IndependentPracticePage;
