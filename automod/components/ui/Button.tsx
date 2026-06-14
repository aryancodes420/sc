'use client';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm' };
  const variants = {
    primary:   'bg-accent text-white hover:bg-orange-500',
    secondary: 'bg-surface-hi border border-border text-white hover:border-muted',
    ghost:     'bg-transparent text-muted hover:text-white',
    danger:    'bg-danger text-white hover:bg-red-600',
  };
  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props} />;
}
