import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export const Alert = ({
  className,
  variant = 'info',
  title,
  children,
  ...props
}) => {
  const variants = {
    info: {
      bg: 'bg-info/10 border-info/20 text-info-fg',
      icon: <Info className="h-5 w-5" />,
    },
    success: {
      bg: 'bg-success/10 border-success/20 text-success-fg',
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    warning: {
      bg: 'bg-warning/10 border-warning/20 text-warning-fg',
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    danger: {
      bg: 'bg-danger/10 border-danger/20 text-danger-fg',
      icon: <AlertCircle className="h-5 w-5" />,
    },
  };

  const current = variants[variant] || variants.info;

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-m border font-sans',
        current.bg,
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">{current.icon}</div>
      <div className="space-y-1">
        {title && <h5 className="font-bold text-caption uppercase tracking-wider">{title}</h5>}
        {children && <div className="text-body leading-relaxed">{children}</div>}
      </div>
    </div>
  );
};

export const EmptyState = ({
  className,
  title = 'No records found',
  description = 'Add a record to get started.',
  actionLabel,
  onAction,
  icon,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-l border border-dashed border-border bg-bg-surface-elevated/20 min-h-[300px]',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-text-muted flex items-center justify-center h-12 w-12 rounded-full bg-bg-surface-elevated border border-border">
          {icon}
        </div>
      )}
      <h3 className="text-body-lg font-bold text-text-primary mb-1">
        {title}
      </h3>
      <p className="text-caption text-text-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export const Skeleton = ({
  className,
  variant = 'row',
  ...props
}) => {
  const base = 'bg-bg-surface-elevated animate-pulse rounded-m';

  const variants = {
    circle: 'rounded-full h-10 w-10',
    row: 'h-4 w-full',
    card: 'h-32 w-full rounded-l',
    chart: 'h-[300px] w-full rounded-l',
  };

  return (
    <div
      className={cn(base, variants[variant] || variants.row, className)}
      {...props}
    />
  );
};

export const LoadingOverlay = ({
  className,
  message = 'Loading...',
  ...props
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-popover flex flex-col items-center justify-center bg-bg-base/60 backdrop-blur-sm gap-3 rounded-l',
        className
      )}
      {...props}
    >
      <svg
        className="animate-spin h-8 w-8 text-brand-primary"
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
      <span className="text-caption text-text-secondary font-medium tracking-tight">
        {message}
      </span>
    </div>
  );
};

export const ErrorState = ({
  className,
  title = 'An error occurred',
  message = 'Unable to load data at this time.',
  onRetry,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-l border border-danger/20 bg-danger/5 min-h-[250px] gap-4',
        className
      )}
      {...props}
    >
      <AlertCircle className="h-10 w-10 text-danger-fg" />
      <div className="space-y-1">
        <h4 className="text-body-lg font-bold text-text-primary">{title}</h4>
        <p className="text-caption text-text-secondary max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="h-3.5 w-3.5" />}
        >
          Retry
        </Button>
      )}
    </div>
  );
};
