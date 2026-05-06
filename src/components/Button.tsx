import React from 'react';

type Variant = 'primary' | 'ghost' | 'danger';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
}) => {
  const cls =
    variant === 'primary' ? 'tl-btn' : variant === 'danger' ? 'tl-btn-red' : 'tl-btn-ghost';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} ${className}`}
      style={fullWidth ? { width: '100%' } : {}}
    >
      {children}
    </button>
  );
};

export default Button;
