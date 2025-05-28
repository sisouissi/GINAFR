
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'warning' | 'success' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed";
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500 shadow-sm';
      break;
    case 'secondary':
      variantStyles = 'bg-slate-200 hover:bg-slate-300 text-slate-700 focus:ring-slate-400 border border-slate-300 shadow-sm';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm';
      break;
    case 'warning':
      variantStyles = 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400 shadow-sm';
      break;
    case 'success':
      variantStyles = 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-400 shadow-sm';
      break;
    case 'info':
      variantStyles = 'bg-cyan-500 hover:bg-cyan-600 text-white focus:ring-cyan-400 shadow-sm';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent hover:bg-slate-100 text-sky-600 focus:ring-sky-500';
      break;
  }

  let sizeStyles = '';
  let iconSize = 20;
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-xs';
      iconSize = 16;
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-sm';
      iconSize = 18;
      break;
    case 'lg':
      sizeStyles = 'px-5 py-2.5 text-base';
      iconSize = 20;
      break;
    case 'xl':
      sizeStyles = 'px-6 py-3 text-lg';
      iconSize = 22;
      break;
  }

  const widthStyles = fullWidth ? 'w-full' : '';

  const clonedLeftIcon = leftIcon ? React.cloneElement(leftIcon as React.ReactElement<{ size?: number; className?: string }>, { size: iconSize, className: `mr-2 ${(leftIcon.props as any)?.className || ''}` }) : null;
  const clonedRightIcon = rightIcon ? React.cloneElement(rightIcon as React.ReactElement<{ size?: number; className?: string }>, { size: iconSize, className: `ml-2 ${(rightIcon.props as any)?.className || ''}` }) : null;


  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {clonedLeftIcon}
      {children}
      {clonedRightIcon}
    </button>
  );
};

export default Button;