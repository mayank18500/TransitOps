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
            'w-full bg-bg-surface border border-border-default rounded-lg h-11 pl-3.5 pr-10 text-body text-text-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            (isDisabled || isLoading) && 'opacity-60 cursor-not-allowed bg-bg-disabled',
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
