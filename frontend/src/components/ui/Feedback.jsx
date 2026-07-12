import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Badge = ({
  className,
  variant = 'brand',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-2 py-0.5 rounded-full text-tiny font-semibold tracking-wider uppercase';

  const variants = {
    brand: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
    success: 'bg-success/10 text-success-fg border border-success/20',
    warning: 'bg-warning/10 text-warning-fg border border-warning/20',
    danger: 'bg-danger/10 text-danger-fg border border-danger/20',
    info: 'bg-info/10 text-info-fg border border-info/20',
    muted: 'bg-bg-surface-elevated text-text-secondary border border-border',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant] || variants.brand, className)}
      {...props}
    >
      {children}
    </span>
  );
};

export const StatusChip = ({
  className,
  status = 'Available',
  ...props
}) => {
  const statusConfig = {
    // Vehicles
    Available: { variant: 'success', label: 'Available' },
    'On Trip': { variant: 'brand', label: 'On Trip' },
    'In Shop': { variant: 'warning', label: 'In Shop' },
    Retired: { variant: 'danger', label: 'Retired' },
    // Drivers
    'Off Duty': { variant: 'muted', label: 'Off Duty' },
    Suspended: { variant: 'danger', label: 'Suspended' },
    // Trips
    Draft: { variant: 'muted', label: 'Draft' },
    Dispatched: { variant: 'info', label: 'Dispatched' },
    Completed: { variant: 'success', label: 'Completed' },
    Cancelled: { variant: 'danger', label: 'Cancelled' },
  };

  const current = statusConfig[status] || { variant: 'muted', label: status };

  return (
    <Badge
      variant={current.variant}
      className={cn('gap-1.5 px-2.5 py-0.5', className)}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {current.label}
    </Badge>
  );
};

export const Progress = ({
  className,
  value = 0,
  max = 100,
  showLabel = false,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full space-y-1.5', className)} {...props}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-bg-surface-elevated border border-border-muted">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'h-full bg-brand-primary rounded-full',
            percentage > 85 && 'bg-warning',
            percentage > 99 && 'bg-danger'
          )}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-tiny text-text-muted font-medium">
          <span>{Math.round(value)} / {Math.round(max)}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};

export const Avatar = ({
  className,
  src,
  name = '',
  size = 'md',
  ...props
}) => {
  const [error, setError] = useState(false);

  const sizes = {
    sm: 'h-8 w-8 text-tiny',
    md: 'h-10 w-10 text-caption',
    lg: 'h-12 w-12 text-body',
    xl: 'h-16 w-16 text-h4',
  };

  const getInitials = (str) => {
    return str
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-bg-surface-elevated border border-border text-text-secondary font-bold overflow-hidden select-none',
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{name ? getInitials(name) : 'U'}</span>
      )}
    </div>
  );
};

export const Tooltip = ({
  className,
  content,
  children,
  position = 'top',
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      {...props}
    >
      {children}
      <AnimatePresence>
        {visible && content && (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-tooltip pointer-events-none whitespace-nowrap bg-bg-surface-floating border border-border text-text-primary text-tiny py-1.5 px-3 rounded-s shadow-floating font-sans font-medium',
              positionStyles[position] || positionStyles.top,
              className
            )}
          >
            {content}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
