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
          style={{ '--primary': error ? 'rgb(var(--danger))' : 'rgb(var(--primary))', ...props.style }}
          className={cn(
            'brutalist-input !h-11',
            !(isSearch || icon) && '!pl-3.5',
            isPassword && '!pr-10',
            error && '!border-danger',
            (isDisabled || isLoading) && '!opacity-50 !cursor-not-allowed !bg-bg-disabled !text-text-disabled !border-border-muted',
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
        style={{ '--primary': error ? 'rgb(var(--danger))' : 'rgb(var(--primary))', ...props.style }}
        className={cn(
          'brutalist-input !h-auto !py-3.5 !px-3.5 !resize-y',
          error && '!border-danger',
          (isDisabled || isLoading) && '!opacity-50 !cursor-not-allowed !bg-bg-disabled !text-text-disabled !border-border-muted',
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
