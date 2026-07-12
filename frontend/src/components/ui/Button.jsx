import React from 'react';
import { m } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  children,
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseStyles = 'card-button inline-flex items-center justify-center !font-sans !font-semibold !tracking-tight focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base';

  const variants = {
    primary: {
      '--secondary': 'rgb(var(--primary))',
      '--secondary-hover': 'rgb(var(--primary-hover))',
      '--bg': 'rgb(var(--primary-fg))',
    },
    secondary: {
      '--secondary': 'rgb(var(--bg-base))',
      '--secondary-hover': 'rgb(var(--bg-surface-elevated))',
      '--bg': 'rgb(var(--text-primary))',
    },
    outline: {
      '--secondary': 'transparent',
      '--secondary-hover': 'rgba(var(--bg-hover-rgb) / 0.1)',
      '--bg': 'rgb(var(--text-primary))',
    },
    ghost: {
      '--secondary': 'transparent',
      '--secondary-hover': 'rgba(var(--bg-hover-rgb) / 0.1)',
      '--bg': 'rgb(var(--text-secondary))',
      '--shadow-color': 'transparent',
      border: 'none',
    },
    danger: {
      '--secondary': 'rgb(var(--danger))',
      '--secondary-hover': 'rgb(var(--danger-fg))',
      '--bg': '#ffffff',
    },
  };

  const sizes = {
    sm: '!h-8 !px-3 !text-tiny !rounded-s gap-1.5',
    md: '!h-10 !px-4 !text-caption !rounded-m gap-2',
    lg: '!h-12 !px-6 !text-body !rounded-l gap-2.5',
    xl: '!h-14 !px-8 !text-h4 !rounded-xl gap-3',
  };

  const selectedVariantStyle = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;
  const isButtonDisabled = isDisabled || isLoading;

  return (
    <m.button
      ref={ref}
      disabled={isButtonDisabled}
      style={{ ...selectedVariantStyle, ...props.style }}
      className={cn(
        baseStyles,
        selectedSize,
        isButtonDisabled && '!opacity-50 !cursor-not-allowed !pointer-events-none !bg-bg-disabled !text-text-disabled !border-border-muted !shadow-none',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </m.button>
  );
});

Button.displayName = 'Button';

export const IconButton = React.forwardRef(({
  className,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon,
  children,
  ...props
}, ref) => {
  const sizes = {
    sm: 'h-8 w-8 rounded-s p-1.5',
    md: 'h-10 w-10 rounded-m p-2',
    lg: 'h-12 w-12 rounded-l p-2.5',
    xl: 'h-14 w-14 rounded-xl p-3',
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      isLoading={isLoading}
      isDisabled={isDisabled}
      className={cn(
        'p-0 flex-shrink-0',
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {icon || children}
    </Button>
  );
});

IconButton.displayName = 'IconButton';
