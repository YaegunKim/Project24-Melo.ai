'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { S } from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  return (
    <S.Button $variant={variant} $size={size} {...props}>
      {children}
    </S.Button>
  );
}
