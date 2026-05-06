import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';
import ExamplesPage from './ExamplesPage';

/* Demonstracao com exemplo resolvido (formato rico Unidade 1).
 * Quando a unidade nao tem `demonstration`, delega para ExamplesPage
 * (formato legado das Unidades 2..5).
 */
const DemonstrationPage: React.FC = () => {
  const { navigateTo, currentUnit, setDemonstrationViewed } = useApp();
  const unit = units.find((u) => u.id === currentUnit)!;

  if (!unit.demonstration) {
    return <ExamplesPage />;
  }

  const demo = unit.demonstration;

  const handleContinue = () => {
    setDemonstrationViewed(true);
    const next = nextPage('demonstration', unit) ?? 'atividade-1-1';
    navigateTo(next);
  };

  const handleBack = () => {
    const prev = previousPage('demonstration', unit) ?? 'content';
    navigateTo(prev);
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Demonstração
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            Exemplo Resolvido
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Veja a aplicação dos conceitos da unidade em um caso real, passo a passo.
          </p>
        </div>

        {/* Requisito */}
        <div className="tl-card" style={{ background: '#e4f4ff', borderColor: '#5588cc' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#224488', fontSize: '0.85rem' }}>
            📋 Requisito do sistema
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#1d3a66', lineHeight: 1.6 }}>
            {demo.requirement}
          </p>
        </div>

        {/* Situação */}
        <div className="tl-card" style={{ background: '#fdd', borderColor: '#8b0000' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#660000', fontSize: '0.85rem' }}>
            🚨 A situação problemática
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#440000', lineHeight: 1.6 }}>
            {demo.situation}
          </p>
        </div>

        {/* Análise passo a passo */}
        <div>
          <p style={{ margin: '0 0 0.6rem', fontWeight: 800, color: '#1a4a10' }}>
            🔬 Análise passo a passo
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {demo.steps.map((step) => (
              <div
                key={step.id}
                className="tl-card"
                style={{
                  borderLeft: `8px solid ${step.color}`,
                  background: '#fff',
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      background: step.color,
                      color: '#fff',
                      borderRadius: 8,
                      padding: '4px 10px',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    PASSO {step.id}
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px', fontWeight: 800, color: step.color, fontSize: '0.95rem' }}>
                      {step.label}
                    </p>
                    <p style={{ margin: '0 0 6px', fontStyle: 'italic', color: '#2d5a1e', fontSize: '0.85rem' }}>
                      {step.question}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a4a10', lineHeight: 1.6 }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lição principal */}
        <div className="tl-card" style={{ background: '#d4f0c0', borderColor: '#2d8f2d', borderWidth: 3 }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.8rem' }}>💡</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#0a4f0a' }}>
                Lição principal
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#1a4a10', lineHeight: 1.6 }}>
                {demo.lesson}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="tl-btn-ghost" onClick={handleBack}>← Voltar ao Conteúdo</button>
          <button className="tl-btn" onClick={handleContinue}>
            Ir para Atividade 1.1 →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DemonstrationPage;
