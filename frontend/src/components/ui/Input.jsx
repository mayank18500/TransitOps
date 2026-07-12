import React, { useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({
  className,
  type = 'text',
  label,
  error,
  icon,
  isDisabled = false,
  isLoading = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isSearch = type === 'search';
  
  const resolvedType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-tiny font-semibold uppercase tracking-wider text-text-secondary select-none">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {/* Left Search Icon */}
        {isSearch && (
          <Search className="absolute left-3.5 h-4 w-4 text-text-muted" />
        )}

        {/* Left Custom Icon */}
        {!isSearch && icon && (
          <span className="absolute left-3.5 flex items-center justify-center text-text-muted">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          type={resolvedType}
          disabled={isDisabled || isLoading}
          className={cn(
            'w-full bg-bg-surface border border-border-default rounded-lg h-11 text-body text-text-primary placeholder:text-text-muted outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary',
            (isSearch || icon) ? 'pl-10' : 'pl-3.5',
            isPassword ? 'pr-10' : 'pr-3.5',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            (isDisabled || isLoading) && 'opacity-60 cursor-not-allowed bg-bg-disabled',
            className
          )}
          {...props}
        />

        {/* Right Password Toggle */}
        {isPassword && !isDisabled && !isLoading && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-caption text-danger animate-fade-in font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = React.forwardRef(({
  className,
  label,
  error,
  isDisabled = false,
  isLoading = false,
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-tiny font-semibold uppercase tracking-wider text-text-secondary select-none">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        disabled={isDisabled || isLoading}
        className={cn(
          'w-full bg-bg-surface border border-border-default rounded-lg py-3.5 px-3.5 resize-y text-body text-text-primary placeholder:text-text-muted outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
          (isDisabled || isLoading) && 'opacity-60 cursor-not-allowed bg-bg-disabled',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-caption text-danger animate-fade-in font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
