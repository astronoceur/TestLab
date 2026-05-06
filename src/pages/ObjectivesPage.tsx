import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { nextPage } from '../data/unitFlow';

const ObjectivesPage: React.FC = () => {
  const { navigateTo, currentUnit } = useApp();
  const unit = units.find((u) => u.id === currentUnit)!;

  const handleContinue = () => {
    const next = nextPage('objectives', unit) ?? 'prior-knowledge';
    navigateTo(next);
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>
            Objetivos da Unidade
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Ao final desta unidade, você será capaz de:
          </p>
        </div>

        <div className="tl-card">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {unit.objectives.map((obj, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div className="tl-badge">{i + 1}</div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#2d5a1e', lineHeight: 1.5, paddingTop: 4 }}>
                  {obj}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tl-card" style={{ background: '#fffde0', borderColor: '#c0a000' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#7a6000' }}>Antes de começar</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#5a4800', lineHeight: 1.5 }}>
                {unit.situationProblem
                  ? 'A próxima etapa apresenta um caso real para você refletir antes de estudar a teoria.'
                  : 'Faremos um breve quiz de conhecimentos prévios para identificar seu ponto de partida. Não se preocupe — não há penalidade.'}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('welcome')}>← Voltar</button>
          <button className="tl-btn" onClick={handleContinue}>
            {unit.situationProblem ? 'Ver situação-problema →' : 'Fazer quiz de conhecimentos →'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ObjectivesPage;
