import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

const IndependentPracticePage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    independentPracticeAnswer, setIndependentPracticeAnswer,
    independentPracticeSubmitted, setIndependentPracticeSubmitted,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;

  const handleBack = () => {
    const prev = previousPage('independent-practice', unit) ?? 'guided-practice';
    navigateTo(prev);
  };
  const handleContinue = () => {
    const next = nextPage('independent-practice', unit) ?? 'feedback';
    navigateTo(next);
  };

  const handleChange = (key: string, value: string) => {
    if (independentPracticeSubmitted) return;
    setIndependentPracticeAnswer({ ...independentPracticeAnswer, [key]: value });
  };

  /* ─── Modo rico (Unidade 1) ─────────────────────────────────── */
  if (unit.independentPracticeRich) {
    const ip = unit.independentPracticeRich;
    const allFilled = ip.fields.every(
      (f) => (independentPracticeAnswer[f.key] ?? '').trim().length > 0
    );

    return (
      <Layout showProgress>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
              Prática Independente
            </p>
            <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
              Aplique o conceito por conta própria
            </h1>
            <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
              Sem dicas progressivas desta vez. Analise o cenário e estruture sua resposta nos quatro campos.
            </p>
          </div>

          {/* Cenário */}
          <div className="tl-card" style={{ background: '#fffde0', borderColor: '#c0a000' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📚</span>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#7a6000' }}>Cenário</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#5a4800', lineHeight: 1.6 }}>
                  {ip.scenario}
                </p>
              </div>
            </div>
          </div>

          {/* Tarefas */}
          <div className="tl-card">
            <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#1a4a10' }}>Tarefa</p>
            <ol
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              {ip.tasks.map((t, i) => (
                <li
                  key={i}
                  style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}
                >
                  <span style={{ fontWeight: 800, color: 'var(--tl-title)', flexShrink: 0 }}>{i + 1}.</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>

          {/* Critérios de correção */}
          <div className="tl-card" style={{ background: '#e4f4ff', borderColor: '#5588cc' }}>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#224488' }}>
              Critérios de correção
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.5rem',
              }}
            >
              {ip.criteria.map((c) => (
                <div
                  key={c.label}
                  style={{
                    background: '#fff',
                    border: '1px solid #5588cc',
                    borderRadius: 8,
                    padding: '0.5rem 0.6rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 800, color: '#224488', fontSize: '0.82rem' }}>
                      {c.label}
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: '#fff',
                        background: '#5588cc',
                        padding: '1px 6px',
                        borderRadius: 4,
                      }}
                    >
                      {c.weight}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#1d3a66', lineHeight: 1.4 }}>
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Campos */}
          <div className="tl-card">
            <p style={{ margin: '0 0 0.75rem', fontWeight: 800, color: '#1a4a10' }}>
              Sua resposta
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {ip.fields.map((field) => (
                <div key={field.key}>
                  <label className="tl-label" style={{ color: field.color ?? 'var(--tl-title)' }}>
                    {field.label}
                  </label>
                  <textarea
                    className="tl-input"
                    rows={3}
                    placeholder={field.placeholder}
                    value={independentPracticeAnswer[field.key] ?? ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    disabled={independentPracticeSubmitted}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pós-submissão: resposta esperada + feedback */}
          {independentPracticeSubmitted && (
            <>
              <div className="tl-card" style={{ background: '#d4f0c0', borderColor: '#2d8f2d', borderWidth: 3 }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#0a4f0a' }}>
                  ✅ Resposta esperada
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {ip.fields.map((field) => (
                    <div
                      key={field.key}
                      style={{
                        background: '#fff',
                        borderLeft: `5px solid ${field.color ?? '#2d8f2d'}`,
                        borderRadius: 8,
                        padding: '0.5rem 0.75rem',
                      }}
                    >
                      <p
                        style={{
                          margin: '0 0 2px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: field.color ?? '#0a4f0a',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        {field.label}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a4a10', lineHeight: 1.5 }}>
                        {ip.expectedAnswers[field.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tl-card-white">
                <p style={{ margin: '0 0 0.4rem', fontWeight: 800, color: '#0a4f0a' }}>
                  💬 Feedback
                </p>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem', color: '#1a4a10', lineHeight: 1.6 }}>
                  <strong>Se você acertou: </strong>
                  {ip.feedbackCorrect}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#660000', lineHeight: 1.6 }}>
                  <strong>Se teve dificuldade: </strong>
                  {ip.feedbackIncorrect}
                </p>
              </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
            {!independentPracticeSubmitted ? (
              <button
                className="tl-btn"
                onClick={() => setIndependentPracticeSubmitted(true)}
                disabled={!allFilled}
              >
                Submeter resposta
              </button>
            ) : (
              <button className="tl-btn" onClick={handleContinue}>
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
  }

  /* ─── Modo legado (Unidades 2..5) ───────────────────────────── */
  const ip = unit.independentPractice;
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
            <p style={{ margin: '0 0 0.75rem', fontWeight: 800, color: '#0a4f0a' }}>
              Enviado! Veja uma resposta modelo:
            </p>
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
                  <p
                    style={{
                      margin: '0 0 2px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#0a5f0a',
                      textTransform: 'uppercase',
                    }}
                  >
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
          <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
          {!independentPracticeSubmitted ? (
            <button
              className="tl-btn"
              onClick={() => setIndependentPracticeSubmitted(true)}
              disabled={!allFilled}
            >
              Enviar Caso de Teste
            </button>
          ) : (
            <button className="tl-btn" onClick={handleContinue}>
              Ver Feedback →
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IndependentPracticePage;
