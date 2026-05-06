import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';

const RUBRIC_PALETTE = ['#fdd', '#fff8e7', '#e4f4ff', '#d4f0c0'];
const RUBRIC_BORDER = ['#8b0000', '#c0a000', '#5588cc', '#2d8f2d'];

/* Avaliacao simples por palavras-chave para cada campo do desafio
 * rico (Unidade 1). Para o formato legado mantemos o scoring antigo. */
function scoreRichChallenge(
  answers: Record<string, string>,
  expected: Record<string, string>
): { count: number; total: number; itemOk: Record<string, boolean> } {
  const itemOk: Record<string, boolean> = {};
  for (const key of Object.keys(expected)) {
    const userText = (answers[key] ?? '').toLowerCase();
    if (userText.length < 30) {
      itemOk[key] = false;
      continue;
    }
    // procura ao menos 2 termos significativos do gabarito (>=4 letras)
    const expectedTerms = expected[key]
      .toLowerCase()
      .replace(/[^a-záéíóúâêôãõàç0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !['este', 'esta', 'isso', 'esse', 'essa', 'para', 'pelo', 'pela', 'pelos', 'pelas', 'sobre', 'porque', 'como', 'quando', 'mais', 'menos', 'sem', 'foi', 'sao'].includes(w));
    const uniqueTerms = Array.from(new Set(expectedTerms)).slice(0, 12);
    const hits = uniqueTerms.filter((t) => userText.includes(t)).length;
    itemOk[key] = hits >= 2;
  }
  const count = Object.values(itemOk).filter(Boolean).length;
  return { count, total: Object.keys(expected).length, itemOk };
}

/* Score legado (Unidades 2..5) — mantido por compatibilidade. */
interface LegacyScoreItem {
  label: string;
  ok: boolean;
  note: string;
}
function scoreLegacyChallenge(
  answers: Record<string, string>,
  exp: { title: string; steps: string; expected: string; actual: string; severity: string }
): { points: number; total: number; items: LegacyScoreItem[] } {
  const title = (answers['bugTitle'] ?? '').toLowerCase();
  const severity = answers['severity'] ?? '';
  const steps = (answers['steps'] ?? '').trim();
  const expected = (answers['expected'] ?? '').trim();
  const actual = (answers['actual'] ?? '').trim();
  const defect = (answers['defectDescription'] ?? '').trim();

  const items: LegacyScoreItem[] = [
    { label: 'Defeito identificado', ok: defect.length > 20, note: 'Descreva o defeito com mais detalhe' },
    { label: `Severidade correta (${exp.severity})`, ok: severity === exp.severity, note: `Esperado: ${exp.severity}` },
    { label: 'Título descreve o problema', ok: title.length > 8, note: `Esperado algo como "${exp.title}"` },
    { label: 'Passos para reproduzir', ok: steps.length > 20 && steps.includes('1.'), note: 'Inclua passos numerados' },
    { label: 'Resultado esperado', ok: expected.length > 10, note: 'Descreva o comportamento correto' },
    { label: 'Resultado atual', ok: actual.length > 10, note: 'Descreva o comportamento real' },
  ];
  return { points: items.filter((i) => i.ok).length, total: items.length, items };
}

const ChallengePage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    challengeAnswers, setChallengeAnswers,
    challengeSubmitted, setChallengeSubmitted,
    finalAssessmentScore,
    markUnitCompleted,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const isRich = !!unit.finalChallenge;

  /* Marca a unidade como concluida quando aluno passou na avaliacao
   * final E submeteu o desafio. */
  useEffect(() => {
    const passingThreshold = isRich ? 70 : 75;
    if (challengeSubmitted && finalAssessmentScore >= passingThreshold) {
      markUnitCompleted(unit.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeSubmitted]);

  const handleChange = (key: string, value: string) => {
    if (challengeSubmitted) return;
    setChallengeAnswers({ ...challengeAnswers, [key]: value });
  };

  /* ─── Modo rico (Unidade 1) ─────────────────────────────────── */
  if (isRich) {
    const fc = unit.finalChallenge!;
    const allFilled = fc.fields.every(
      (f) => (challengeAnswers[f.key] ?? '').trim().length > 0
    );

    const result = challengeSubmitted
      ? scoreRichChallenge(challengeAnswers, fc.expectedAnswers)
      : null;

    let level: typeof fc.rubric[number] | null = null;
    let levelIdx = 0;
    if (result) {
      // 5 elementos -> excelente (76-100), 3-4 -> satisfatório, 2 -> básico, 0-1 -> insuficiente
      if (result.count >= 5) levelIdx = 3;
      else if (result.count >= 3) levelIdx = 2;
      else if (result.count >= 2) levelIdx = 1;
      else levelIdx = 0;
      level = fc.rubric[levelIdx];
    }

    return (
      <Layout showProgress>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
              Desafio Aplicado Final
            </p>
            <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
              Aplique tudo o que aprendeu
            </h1>
            <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
              {fc.enunciado}
            </p>
          </div>

          {/* Cenário */}
          <div className="tl-card" style={{ background: '#fdd', borderColor: '#8b0000', borderWidth: 3 }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🛡️</span>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#660000' }}>Cenário</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#440000', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {fc.scenario}
                </p>
              </div>
            </div>
          </div>

          {/* Campos de resposta */}
          <div className="tl-card">
            <p style={{ margin: '0 0 1rem', fontWeight: 800, color: 'var(--tl-title)', fontSize: '1rem' }}>
              Sua análise
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {fc.fields.map((field) => (
                <div key={field.key}>
                  <label className="tl-label" style={{ color: field.color ?? 'var(--tl-title)' }}>
                    {field.label}
                  </label>
                  {field.description && (
                    <p style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#5a7a4a' }}>
                      {field.description}
                    </p>
                  )}
                  <textarea
                    className="tl-input"
                    rows={3}
                    placeholder={field.placeholder}
                    value={challengeAnswers[field.key] ?? ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    disabled={challengeSubmitted}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Resultado pós-submissão */}
          {challengeSubmitted && result && level && (
            <>
              <div
                className="tl-card"
                style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  background: RUBRIC_PALETTE[levelIdx],
                  borderColor: RUBRIC_BORDER[levelIdx],
                  borderWidth: 3,
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
                  {levelIdx === 3 ? '🏆' : levelIdx === 2 ? '🎯' : levelIdx === 1 ? '📋' : '📚'}
                </div>
                <p
                  style={{
                    margin: '0 0 4px',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: RUBRIC_BORDER[levelIdx],
                  }}
                >
                  {result.count}/{result.total} elementos — {level.level}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    color: RUBRIC_BORDER[levelIdx],
                    fontSize: '0.85rem',
                  }}
                >
                  {level.range}
                </p>
              </div>

              {/* Avaliação detalhada por campo */}
              <div className="tl-card">
                <p style={{ margin: '0 0 0.6rem', fontWeight: 800, color: '#1a4a10' }}>
                  Avaliação detalhada
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {fc.fields.map((f) => (
                    <div
                      key={f.key}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 8,
                        background: result.itemOk[f.key] ? '#d4f0c0' : '#fdd',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                          color: result.itemOk[f.key] ? '#0a4f0a' : '#660000',
                          flexShrink: 0,
                        }}
                      >
                        {result.itemOk[f.key] ? '✓' : '✗'}
                      </span>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: result.itemOk[f.key] ? '#0a4f0a' : '#660000',
                        }}
                      >
                        {f.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resposta esperada */}
              <div className="tl-card" style={{ background: '#e4f8cc', borderColor: '#2d8f2d' }}>
                <p style={{ margin: '0 0 0.6rem', fontWeight: 800, color: '#0a4f0a' }}>
                  ✅ Resposta esperada (gabarito)
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {fc.fields.map((f) => (
                    <div
                      key={f.key}
                      style={{
                        background: '#fff',
                        borderLeft: `5px solid ${f.color ?? '#2d8f2d'}`,
                        borderRadius: 8,
                        padding: '0.5rem 0.75rem',
                      }}
                    >
                      <p
                        style={{
                          margin: '0 0 2px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: f.color ?? '#0a5f0a',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        {f.label}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#1a4a10', lineHeight: 1.5 }}>
                        {fc.expectedAnswers[f.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rubrica completa */}
              <div className="tl-card">
                <p style={{ margin: '0 0 0.6rem', fontWeight: 800, color: '#1a4a10' }}>
                  Rubrica de avaliação
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {fc.rubric.map((r, i) => (
                    <div
                      key={r.level}
                      style={{
                        background: i === levelIdx ? RUBRIC_PALETTE[i] : '#fff',
                        border: `2px solid ${RUBRIC_BORDER[i]}`,
                        borderRadius: 8,
                        padding: '0.6rem 0.8rem',
                        opacity: i === levelIdx ? 1 : 0.7,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 800, color: RUBRIC_BORDER[i], fontSize: '0.9rem' }}>
                          {r.level}
                          {i === levelIdx && ' ← seu nível'}
                        </span>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#444' }}>
                          {r.range} • {r.achievementCount}
                        </span>
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#333', lineHeight: 1.4 }}>
                        {r.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback final */}
              <div className="tl-card" style={{ background: '#d4f0c0', borderColor: '#2d8f2d', borderWidth: 3 }}>
                <p style={{ margin: '0 0 0.4rem', fontWeight: 800, color: '#0a4f0a' }}>
                  🌟 Feedback final
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a4a10', lineHeight: 1.6 }}>
                  {fc.finalFeedback}
                </p>
              </div>
            </>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <button className="tl-btn-ghost" onClick={() => navigateTo('final-assessment')}>
              ← Voltar
            </button>
            {!challengeSubmitted ? (
              <button className="tl-btn" onClick={() => setChallengeSubmitted(true)} disabled={!allFilled}>
                Submeter desafio
              </button>
            ) : (
              <button className="tl-btn" onClick={() => navigateTo('units')}>
                Concluir Unidade ✓
              </button>
            )}
          </div>
          {!challengeSubmitted && !allFilled && (
            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#7a5a00', margin: 0 }}>
              Preencha todos os 5 campos para submeter.
            </p>
          )}
        </div>
      </Layout>
    );
  }

  /* ─── Modo legado (Unidades 2..5) ───────────────────────────── */
  const challenge = unit.challenge;
  const allFilled = challenge.fields.every((f) => {
    const val = (challengeAnswers[f.key] ?? '').trim();
    return val.length > 0 && val !== '-- Selecione --';
  });
  const result = challengeSubmitted
    ? scoreLegacyChallenge(challengeAnswers, challenge.expectedReport)
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

        <div className="tl-card" style={{ background: '#fdd', borderColor: '#8b0000', borderWidth: 3 }}>
          <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#660000' }}>Cenário</p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#440000', lineHeight: 1.5 }}>
            {challenge.scenario}
          </p>
        </div>

        <div className="tl-card">
          <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#1a4a10' }}>Suas tarefas:</p>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {challenge.tasks.map((task, i) => (
              <li
                key={i}
                style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#2d5a1e' }}
              >
                <span style={{ fontWeight: 800, color: 'var(--tl-title)', flexShrink: 0 }}>{i + 1}.</span>
                {task}
              </li>
            ))}
          </ol>
        </div>

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
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
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

        {challengeSubmitted && result && (
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
            <div style={{ fontSize: '2.5rem' }}>{passed ? '🏆' : '📋'}</div>
            <p
              style={{
                margin: '0 0 4px',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: passed ? '#0a4f0a' : '#7a6000',
              }}
            >
              {result.points}/{result.total} · {pct}%
            </p>
          </div>
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
      </div>
    </Layout>
  );
};

export default ChallengePage;
