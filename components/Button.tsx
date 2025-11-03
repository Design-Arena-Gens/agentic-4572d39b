import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'ghost';
};

export default function Button({ variant = 'solid', className = '', ...props }: ButtonProps) {
  const cls = variant === 'ghost' ? 'btn btn-ghost' : 'btn';
  return <button className={`${cls} ${className}`} {...props} />;
}
