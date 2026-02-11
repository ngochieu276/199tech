import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  children, 
  disabled,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-background hover:bg-primary-hover border-none shadow-lg shadow-primary/20',
    secondary: 'bg-background-secondary text-text-primary hover:bg-background-tertiary border border-gray-700',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary-dim',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5',
    danger: 'bg-status-danger/10 text-status-danger hover:bg-status-danger/20 border border-status-danger/20',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10 p-0 flex items-center justify-center',
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </button>
  );
};
