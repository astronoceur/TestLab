import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { TheoryBlock } from '../types';
import { nextPage, previousPage } from '../data/unitFlow';

/* ──────────────────────────────────────────────────────────────────
 * Renderiza:
 *   - Modo rico: blocos teoricos com Explicacao + Exemplo +
 *     Observacao + Miniatividade interativa (Unidade 1).
 *   - Modo legado: ContentSection[] simples (Unidades 2..5).
 * ────────────────────────────────────────────────────────────────── */

const TheoryBlockView: React.FC<{ block: TheoryBlock }> = ({ block }) => {
  const {
    miniActivityAnswers,
    setMiniActivityAnswer,
    miniActivityRevealed,
    revealMiniActivity,
  } = useApp();

  const answer = miniActivityAnswers[block.id] ?? '';
  const revealed = !!miniActivityRevealed[block.id];

  const renderMini = () => {
    const ma = block.miniActivity;
    if (ma.type === 'truefalse' && ma.options) {
      return (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 8 }}>
          {ma.options.map((opt, oIdx) => {
            const sel = answer === String(oIdx);
            const correct = ma.correctIndex === oIdx;
            let cls = 'tl-option';
            if (revealed && correct) cls += ' tl-option-correct';
            else if (revealed && sel && !correct) cls += ' tl-option-wrong';
            else if (revealed) cls += ' tl-option-disabled';
            else if (sel) cls += ' tl-option-selected';
            return (
              <button
                key={oIdx}
                onClick={() => !revealed && setMiniActivityAnswer(block.id, String(oIdx))}
                disabled={revealed}
                className={cls}
                style={{ minWidth: 130, textAlign: 'center' }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      );
    }
    if (ma.type === 'match' && ma.pairs) {
      return (
        <div style={{ marginTop: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--tl-title)', color: '#fff' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Objetivo</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {ma.pairs.map((p, i) => (
                <tr key={i} style={{ background: i % 2 ? '#f4fff0' : '#e4f8cc' }}>
                  <td style={{ padding: '6px 10px', fontWeight: 700, color: '#1a4a10' }}>{p.left}</td>
                  <td style={{ padding: '6px 10px', color: '#2d5a1e' }}>{p.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: '#5a7a4a' }}>
            Releia a tabela e tente justificar mentalmente cada associação. Em seguida revele a resposta esperada.
          </p>
        </div>
      );
    }
    // fill / text
    return (
      <textarea
        className="tl-input"
        rows={ma.type === 'fill' ? 2 : 4}
        placeholder={ma.placeholder ?? 'Sua resposta...'}
        value={answer}
        onChange={(e) => !revealed && setMiniActivityAnswer(block.id, e.target.value)}
        disabled={revealed}
        style={{ resize: 'vertical', marginTop: 8 }}
      />
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Explicacao */}
      <div className="tl-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>{block.icon}</span>
          <div>
            <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Bloco {block.number}
            </p>
            <h2 className="tl-title" style={{ margin: 0, fontSize: '1.15rem' }}>{block.title}</h2>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {block.explanation.map((p, i) => (
            <p key={i} style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.6 }}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Exemplo */}
      <div className="tl-card-white" style={{ borderLeft: '5px solid #5588cc' }}>
        <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#224488', fontSize: '0.85rem' }}>
          🧪 {block.example.title}
        </p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a3a66', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
          {block.example.body}
        </p>
      </div>

      {/* Observação */}
      <div className="tl-card" style={{ background: '#fffde0', borderColor: '#c0a000' }}>
        <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#7a6000', fontSize: '0.85rem' }}>
          ⚠️ {block.observation.title}
        </p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#5a4800', lineHeight: 1.6 }}>
          {block.observation.body}
        </p>
      </div>

      {/* Miniatividade */}
      <div className="tl-card" style={{ borderLeft: '5px solid #2d8f2d' }}>
        <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#0a4f0a', fontSize: '0.85rem' }}>
          ✏️ Miniatividade de fixação
        </p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a4a10', lineHeight: 1.5 }}>
          {block.miniActivity.prompt}
        </p>

        {renderMini()}

        <div style={{ marginTop: 10 }}>
          {!revealed ? (
            <button
              className="tl-btn-ghost"
              onClick={() => revealMiniActivity(block.id)}
              disabled={
                block.miniActivity.type !== 'match' &&
                block.miniActivity.type !== 'truefalse' &&
                answer.trim().length === 0
              }
            >
              Ver resposta esperada
            </button>
          ) : (
            <div
              style={{
                background: '#d4f0c0',
                border: '2px solid #2d8f2d',
                borderRadius: 8,
                padding: '0.6rem 0.8rem',
              }}
            >
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#0a4f0a', fontSize: '0.82rem' }}>
                Resposta esperada
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#1a4a10', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {block.miniActivity.expectedAnswer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContentPage: React.FC = () => {
  const { navigateTo, currentUnit } = useApp();
  const unit = units.find((u) => u.id === currentUnit)!;

  const blocks = unit.theoryBlocks;
  const useRich = !!(blocks && blocks.length > 0);
  const total = useRich ? blocks!.length : unit.content.length;

  const [active, setActive] = useState(0);
  const isLast = active === total - 1;

  const handleNext = () => {
    if (!isLast) {
      setActive(active + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const next = nextPage('content', unit) ?? 'demonstration';
      navigateTo(next);
    }
  };

  const handlePrev = () => {
    if (active === 0) {
      const prev = previousPage('content', unit) ?? 'prior-knowledge';
      navigateTo(prev);
    } else {
      setActive(active - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Conteúdo Teórico
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            {useRich ? 'Blocos Conceituais' : 'Conteúdo'}
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Leia cada bloco com atenção. Faça a miniatividade ao final antes de avançar.
          </p>
        </div>

        {/* Tabs de navegacao entre blocos */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {(useRich ? blocks! : unit.content).map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: '5px 12px',
                borderRadius: 20,
                fontWeight: 700,
                fontFamily: 'inherit',
                fontSize: '0.78rem',
                border: '2px solid var(--tl-card-border)',
                cursor: 'pointer',
                background: active === i ? 'var(--tl-title)' : 'var(--tl-card-bg)',
                color: active === i ? '#fff' : '#2d6e18',
                transition: 'background 0.15s',
              }}
            >
              {i + 1}. {useRich ? blocks![i].title : (s as { title: string }).title}
            </button>
          ))}
        </div>

        {/* Conteudo do bloco */}
        {useRich ? (
          <TheoryBlockView block={blocks![active]} />
        ) : (
          (() => {
            const section = unit.content[active];
            return (
              <div className="tl-card" style={{ minHeight: 220 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{section.icon}</span>
                  <h2 className="tl-title" style={{ margin: 0, fontSize: '1.15rem' }}>{section.title}</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {section.body.split('\n').map((line, i) => {
                    if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
                    if (line.startsWith('•'))
                      return (
                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginLeft: 8 }}>
                          <span style={{ color: 'var(--tl-title)', flexShrink: 0, fontWeight: 800 }}>•</span>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                            {line.slice(1).trim()}
                          </p>
                        </div>
                      );
                    return (
                      <p key={i} style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })()
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="tl-btn-ghost" onClick={handlePrev}>
            ← {active === 0 ? 'Voltar' : 'Bloco anterior'}
          </button>
          <button className="tl-btn" onClick={handleNext}>
            {isLast ? 'Ir para Demonstração →' : 'Próximo Bloco →'}
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#5a7a4a', margin: 0 }}>
          Bloco {active + 1} de {total}
        </p>
      </div>
    </Layout>
  );
};

export default ContentPage;
