import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Select = React.forwardRef(({
  className,
  label,
  error,
  options = [],
  placeholder = 'Select an option',
  isDisabled = false,
  isLoading = false,
  ...props
}, ref) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-tiny font-semibold uppercase tracking-wider text-text-secondary select-none">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          ref={ref}
          disabled={isDisabled || isLoading}
          className={cn(
            'w-full h-10 bg-bg-surface-elevated text-text-primary border border-border rounded-m pl-3.5 pr-10 text-caption font-sans outline-none appearance-none transition-all duration-fast ease-micro',
            'focus:border-brand-primary focus:ring-1 focus:ring-brand-primary',
            error && 'border-danger focus:border-danger focus:ring-danger',
            (isDisabled || isLoading) && 'opacity-50 cursor-not-allowed bg-bg-disabled text-text-disabled border-border-muted',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 h-4.5 w-4.5 text-text-muted pointer-events-none" />
      </div>
      {error && (
        <span className="text-caption text-danger animate-fade-in font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
