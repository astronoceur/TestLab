import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';

interface ScoreItem { label: string; ok: boolean; note: string; }

function scoreChallenge(
  answers: Record<string, string>,
  exp: { title: string; steps: string; expected: string; actual: string; severity: string }
): { points: number; total: number; items: ScoreItem[] } {
  const title    = (answers['bugTitle'] ?? '').toLowerCase();
  const severity = answers['severity'] ?? '';
  const steps    = (answers['steps'] ?? '').trim();
  const expected = (answers['expected'] ?? '').trim();
  const actual   = (answers['actual'] ?? '').trim();
  const defect   = (answers['defectDescription'] ?? '').trim();

  const items: ScoreItem[] = [
    {
      label: 'Defeito identificado',
      ok: defect.length > 20,
      note: 'Descreva o defeito com detalhes suficientes',
    },
    {
      label: `Severidade correta (${exp.severity})`,
      ok: severity === exp.severity,
      note: `Esperado: "${exp.severity}" — lembre-se do impacto no sistema`,
    },
    {
      label: 'Título descreve o problema',
      ok: title.length > 8 && (title.includes('login') || title.includes('senha') || title.includes('acesso') || title.includes('password') || title.includes('duplo') || title.includes('transferência') || title.includes('desconto') || title.includes('automação') || title.length > 20),
      note: `Esperado algo como: "${exp.title}"`,
    },
    {
      label: 'Passos para reproduzir preenchidos',
      ok: steps.length > 20 && steps.includes('1.'),
      note: 'Inclua passos numerados e específicos',
    },
    {
      label: 'Resultado esperado preenchido',
      ok: expected.length > 10,
      note: 'Descreva o que o sistema deveria ter feito',
    },
    {
      label: 'Resultado atual preenchido',
      ok: actual.length > 10,
      note: 'Descreva o que o sistema realmente fez',
    },
  ];

  return { points: items.filter((i) => i.ok).length, total: items.length, items };
}

const ChallengePage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    challengeAnswers, setChallengeAnswers,
    challengeSubmitted, setChallengeSubmitted,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const challenge = unit.challenge;

  const handleChange = (key: string, value: string) => {
    if (challengeSubmitted) return;
    setChallengeAnswers({ ...challengeAnswers, [key]: value });
  };

  const allFilled = challenge.fields.every((f) => {
    const val = (challengeAnswers[f.key] ?? '').trim();
    return val.length > 0 && val !== '-- Selecione --';
  });

  const result = challengeSubmitted
    ? scoreChallenge(challengeAnswers, challenge.expectedReport)
    : null;

  const pct = result ? Math.round((result.points / result.total) * 100) : 0;
  const passed = pct >= 75;

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>
            Desafio Aplicado
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Aplique tudo que aprendeu. Escreva um relatório de bug profissional.
          </p>
        </div>

        {/* Scenario */}
        <div className="tl-card" style={{ background: '#fdd', borderColor: '#8b0000', borderWidth: 3 }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🔴</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#660000' }}>Cenário</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#440000', lineHeight: 1.5 }}>
                {challenge.scenario}
              </p>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="tl-card">
          <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#1a4a10' }}>Suas tarefas:</p>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {challenge.tasks.map((task, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#2d5a1e' }}>
                <span style={{ fontWeight: 800, color: 'var(--tl-title)', flexShrink: 0 }}>{i + 1}.</span>
                {task}
              </li>
            ))}
          </ol>
        </div>

        {/* Bug report form */}
        <div className="tl-card">
          <p style={{ margin: '0 0 1rem', fontWeight: 800, color: 'var(--tl-title)', fontSize: '1rem' }}>
            Formulário de Relatório de Bug
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {challenge.fields.map((field) => (
              <div key={field.key}>
                <label className="tl-label">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="tl-input"
                    value={challengeAnswers[field.key] ?? '-- Selecione --'}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    disabled={challengeSubmitted}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="tl-input"
                    value={challengeAnswers[field.key] ?? ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    disabled={challengeSubmitted}
                    placeholder={field.placeholder}
                    rows={3}
                    style={{ resize: 'vertical' }}
                  />
                ) : (
                  <input
                    className="tl-input"
                    type="text"
                    value={challengeAnswers[field.key] ?? ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    disabled={challengeSubmitted}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {challengeSubmitted && result && (
          <>
            <div
              className="tl-card"
              style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: passed ? '#d4f0c0' : '#fffde0',
                borderColor: passed ? '#2d8f2d' : '#c0a000',
                borderWidth: 3,
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{passed ? '🏆' : '📋'}</div>
              <p style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 900, color: passed ? '#0a4f0a' : '#7a6000' }}>
                {result.points}/{result.total} · {pct}%
              </p>
              <p style={{ margin: 0, fontWeight: 700, color: passed ? '#0a4f0a' : '#7a6000' }}>
                {passed ? 'Desafio Concluído!' : 'Bom esforço — veja o feedback abaixo'}
              </p>
            </div>

            {/* Evaluation detail */}
            <div className="tl-card">
              <p style={{ margin: '0 0 0.75rem', fontWeight: 800, color: '#1a4a10' }}>Avaliação Detalhada</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {result.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 8,
                      background: item.ok ? '#d4f0c0' : '#fdd',
                    }}
                  >
                    <span style={{ fontWeight: 800, color: item.ok ? '#0a4f0a' : '#660000', flexShrink: 0 }}>
                      {item.ok ? '✓' : '✗'}
                    </span>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: item.ok ? '#0a4f0a' : '#660000' }}>
                        {item.label}
                      </p>
                      {!item.ok && (
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#880000' }}>{item.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected report */}
            <div className="tl-card" style={{ background: '#e4f8cc', borderColor: '#2d8f2d' }}>
              <p style={{ margin: '0 0 0.75rem', fontWeight: 800, color: '#0a4f0a' }}>
                ✅ Relatório de Bug Esperado
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Título', value: challenge.expectedReport.title },
                  { label: 'Severidade', value: challenge.expectedReport.severity },
                  { label: 'Passos para Reproduzir', value: challenge.expectedReport.steps },
                  { label: 'Resultado Esperado', value: challenge.expectedReport.expected },
                  { label: 'Resultado Atual', value: challenge.expectedReport.actual },
                ].map((row) => (
                  <div key={row.label} style={{ background: '#fff', border: '1px solid #2d8f2d', borderRadius: 8, padding: '0.5rem 0.75rem' }}>
                    <p style={{ margin: '0 0 2px', fontSize: '0.72rem', fontWeight: 800, color: '#0a5f0a', textTransform: 'uppercase' }}>
                      {row.label}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#1a4a10', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('final-assessment')}>← Voltar</button>
          {!challengeSubmitted ? (
            <button className="tl-btn" onClick={() => setChallengeSubmitted(true)} disabled={!allFilled}>
              Enviar Relatório de Bug
            </button>
          ) : (
            <button className="tl-btn" onClick={() => navigateTo('units')}>
              Voltar para Unidades ✓
            </button>
          )}
        </div>
        {!challengeSubmitted && !allFilled && (
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#7a5a00', margin: 0 }}>
            Preencha todos os campos para enviar.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default ChallengePage;
