import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  white?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', white = false }) => (
  <div className={`${white ? 'tl-card-white' : 'tl-card'} ${className}`}>{children}</div>
);

export default Card;
