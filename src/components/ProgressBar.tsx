import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="flex justify-between mb-1" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
        <span style={{ color: '#2d6e18' }}>{label ?? `Passo ${current} de ${total}`}</span>
        <span style={{ color: 'var(--tl-title)' }}>{pct}%</span>
      </div>
      <div className="tl-progress-track">
        <div className="tl-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
