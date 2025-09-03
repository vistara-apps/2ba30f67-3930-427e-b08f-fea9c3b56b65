'use client';

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const baseClasses = "min-h-screen";
  const variantClasses = {
    default: "",
    glass: "glass-effect"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
}
