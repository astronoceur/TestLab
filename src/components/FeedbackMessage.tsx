import React from 'react';

interface FeedbackMessageProps {
  correct: boolean;
  explanation: string;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ correct, explanation }) => {
  if (correct) {
    return (
      <div className="tl-feedback-ok flex gap-3 mt-3">
        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
        <div>
          <p style={{ fontWeight: 800, marginBottom: 2 }}>Correto!</p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{explanation}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="tl-feedback-err flex gap-3 mt-3">
      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>✗</span>
      <div>
        <p style={{ fontWeight: 800, marginBottom: 2 }}>Não foi dessa vez.</p>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{explanation}</p>
      </div>
    </div>
  );
};

export default FeedbackMessage;
