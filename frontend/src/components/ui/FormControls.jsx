import React from 'react';
import { m } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Label = React.forwardRef(({
  className,
  children,
  isRequired = false,
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'text-tiny font-semibold uppercase tracking-wider text-text-secondary select-none',
        className
      )}
      {...props}
    >
      {children}
      {isRequired && <span className="ml-1 text-danger font-bold">*</span>}
    </label>
  );
});

Label.displayName = 'Label';

export const Checkbox = React.forwardRef(({
  className,
  label,
  error,
  isDisabled = false,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className={cn(
        'inline-flex items-center gap-2.5 cursor-pointer select-none text-body',
        isDisabled && 'cursor-not-allowed opacity-50 text-text-disabled'
      )}>
        <input
          ref={ref}
          type="checkbox"
          disabled={isDisabled}
          className={cn(
            'h-4.5 w-4.5 rounded-s border border-border bg-bg-surface-elevated text-brand-primary outline-none transition-all duration-fast ease-micro appearance-none cursor-pointer',
            'checked:bg-brand-primary checked:border-transparent',
            'focus:ring-2 focus:ring-border-focus focus:ring-offset-2 focus:ring-offset-bg-base',
            error && 'border-danger',
            isDisabled && 'cursor-not-allowed border-border-muted bg-bg-disabled'
          )}
          {...props}
        />
        {label && <span className="text-text-primary font-medium">{label}</span>}
      </label>
      {error && <span className="text-caption text-danger">{error}</span>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export const Radio = React.forwardRef(({
  className,
  label,
  error,
  isDisabled = false,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className={cn(
        'inline-flex items-center gap-2.5 cursor-pointer select-none text-body',
        isDisabled && 'cursor-not-allowed opacity-50 text-text-disabled'
      )}>
        <input
          ref={ref}
          type="radio"
          disabled={isDisabled}
          className={cn(
            'h-4.5 w-4.5 rounded-full border border-border bg-bg-surface-elevated text-brand-primary outline-none transition-all duration-fast ease-micro appearance-none cursor-pointer',
            'checked:bg-brand-primary checked:border-transparent checked:ring-2 checked:ring-brand-primary checked:ring-offset-2 checked:ring-offset-bg-surface-elevated',
            'focus:ring-2 focus:ring-border-focus focus:ring-offset-2 focus:ring-offset-bg-base',
            error && 'border-danger',
            isDisabled && 'cursor-not-allowed border-border-muted bg-bg-disabled'
          )}
          {...props}
        />
        {label && <span className="text-text-primary font-medium">{label}</span>}
      </label>
      {error && <span className="text-caption text-danger">{error}</span>}
    </div>
  );
});

Radio.displayName = 'Radio';

export const Switch = React.forwardRef(({
  className,
  label,
  checked,
  onChange,
  isDisabled = false,
  ...props
}, ref) => {
  return (
    <label className={cn(
      'inline-flex items-center gap-3 cursor-pointer select-none text-body',
      isDisabled && 'cursor-not-allowed opacity-50'
    )}>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
          className="sr-only"
          {...props}
        />
        <div className={cn(
          'h-6 w-11 rounded-full border border-border bg-bg-surface-elevated transition-colors duration-normal ease-standard',
          checked && 'bg-brand-primary border-transparent',
          isDisabled && 'bg-bg-disabled border-border-muted'
        )} />
        <m.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={cn(
            'absolute top-1 left-0.5 h-4 w-4 rounded-full bg-text-primary shadow-s transition-colors duration-fast',
            checked && 'bg-brand-primary-fg',
            isDisabled && 'bg-text-disabled'
          )}
        />
      </div>
      {label && <span className="text-text-primary font-medium">{label}</span>}
    </label>
  );
});

Switch.displayName = 'Switch';
