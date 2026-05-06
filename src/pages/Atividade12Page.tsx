import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

const Atividade12Page: React.FC = () => {
  const {
    navigateTo, currentUnit,
    atividade12Answer, setAtividade12Answer,
    atividade12Submitted, setAtividade12Submitted,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const atividade = unit.atividade12;

  if (!atividade) {
    const next = nextPage('atividade-1-2', unit) ?? 'guided-practice';
    navigateTo(next);
    return null;
  }

  const wordCount = useMemo(() => {
    const trimmed = atividade12Answer.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [atividade12Answer]);

  const meetsMinWords = wordCount >= atividade.minWords;

  const handleBack = () => {
    const prev = previousPage('atividade-1-2', unit) ?? 'atividade-1-1';
    navigateTo(prev);
  };

  const handleContinue = () => {
    const next = nextPage('atividade-1-2', unit) ?? 'guided-practice';
    navigateTo(next);
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Atividade 1.2
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            Discussão Guiada sobre a Importância do Teste de Software
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Atividade discursiva — escreva sua resposta com no mínimo {atividade.minWords} palavras.
          </p>
        </div>

        {/* Enunciado */}
        <div className="tl-card" style={{ background: '#e4f4ff', borderColor: '#5588cc' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📝</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#224488', fontSize: '0.95rem' }}>
                Questão
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#1d3a66', lineHeight: 1.6 }}>
                {atividade.question}
              </p>
            </div>
          </div>
        </div>

        {/* Critérios visíveis desde o início */}
        <div className="tl-card">
          <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#1a4a10' }}>
            Critérios de resposta esperada
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {atividade.criteria.map((c, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                <span style={{ color: '#2d8f2d', fontWeight: 800, flexShrink: 0 }}>✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Editor */}
        <div className="tl-card">
          <label className="tl-label">Sua resposta</label>
          <textarea
            className="tl-input"
            value={atividade12Answer}
            onChange={(e) => !atividade12Submitted && setAtividade12Answer(e.target.value)}
            disabled={atividade12Submitted}
            placeholder="Escreva sua reflexão aqui, mencionando pelo menos dois aspectos solicitados..."
            rows={10}
            style={{ resize: 'vertical', minHeight: 200 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: '0.78rem', color: meetsMinWords ? '#0a4f0a' : '#7a6000', fontWeight: 700 }}>
              {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
              {meetsMinWords ? ' ✓' : ` (mínimo ${atividade.minWords})`}
            </span>
            {!atividade12Submitted && (
              <button
                className="tl-btn"
                onClick={() => setAtividade12Submitted(true)}
                disabled={!meetsMinWords}
                style={{ padding: '4px 14px', fontSize: '0.85rem' }}
              >
                Submeter resposta
              </button>
            )}
          </div>
        </div>

        {/* Pós-submissão: exemplo + rubrica */}
        {atividade12Submitted && (
          <>
            <div className="tl-card" style={{ background: '#d4f0c0', borderColor: '#2d8f2d' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#0a4f0a' }}>
                ✅ Resposta enviada
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#1a6a1a' }}>
                Sua resposta foi salva localmente. Veja abaixo um exemplo satisfatório e a rubrica para autoavaliação.
              </p>
            </div>

            <div className="tl-card-white">
              <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: 'var(--tl-title)' }}>
                💡 Exemplo de resposta satisfatória
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a4a10', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {atividade.sampleAnswer}
              </p>
            </div>

            <div className="tl-card">
              <p style={{ margin: '0 0 0.6rem', fontWeight: 800, color: '#1a4a10' }}>
                Rubrica de avaliação
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {atividade.rubric.map((r, i) => {
                  const palette = ['#fdd', '#fff8e7', '#e4f4ff', '#d4f0c0'];
                  const border = ['#8b0000', '#c0a000', '#5588cc', '#2d8f2d'];
                  return (
                    <div
                      key={i}
                      style={{
                        background: palette[i] ?? '#fff',
                        border: `2px solid ${border[i] ?? '#5aaa38'}`,
                        borderRadius: 8,
                        padding: '0.6rem 0.8rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                        <span style={{ fontWeight: 800, color: border[i] ?? '#1a4a10', fontSize: '0.9rem' }}>
                          {r.level}
                        </span>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#444' }}>
                          {r.range}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#333', lineHeight: 1.4 }}>
                        {r.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
          {atividade12Submitted && (
            <button className="tl-btn" onClick={handleContinue}>
              Continuar →
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Atividade12Page;
