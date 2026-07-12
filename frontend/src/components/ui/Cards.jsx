import React from 'react';
import { m } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Card = React.forwardRef(({
  className,
  children,
  isHoverable = false,
  isGlass = false,
  ...props
}, ref) => {
  return (
    <m.div
      ref={ref}
      whileHover={isHoverable ? { y: -2, borderColor: 'rgba(255,255,255,0.12)', boxShadow: 'var(--shadow-l)' } : {}}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={cn(
        'rounded-l border border-border bg-bg-surface p-6 shadow-m relative overflow-hidden transition-all duration-fast',
        isGlass && 'bg-glass-bg border-glass-border backdrop-blur-md shadow-floating',
        className
      )}
      {...props}
    >
      {/* Subtle top reflection overlay */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      {children}
    </m.div>
  );
});

Card.displayName = 'Card';

export const StatCard = ({
  className,
  title,
  value,
  description,
  icon,
  trend,
  trendDirection = 'up',
  ...props
}) => {
  const isUp = trendDirection === 'up';

  return (
    <Card className={cn('flex flex-col justify-between gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <span className="text-tiny font-semibold uppercase tracking-wider text-text-muted">
            {title}
          </span>
          <h3 className="text-hero font-bold tracking-tight text-text-primary">
            {value}
          </h3>
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-m bg-bg-surface-elevated flex items-center justify-center border border-border text-text-secondary">
            {icon}
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="flex items-center gap-2 text-caption">
          {trend && (
            <span className={cn(
              'font-semibold',
              isUp ? 'text-success-fg' : 'text-danger-fg'
            )}>
              {isUp ? '▲' : '▼'} {trend}
            </span>
          )}
          {description && <span className="text-text-muted">{description}</span>}
        </div>
      )}
    </Card>
  );
};

export const MetricCard = ({
  className,
  title,
  value,
  target,
  children,
  ...props
}) => {
  return (
    <Card className={cn('space-y-4', className)} {...props}>
      <div className="space-y-1">
        <span className="text-tiny font-semibold uppercase tracking-wider text-text-muted">
          {title}
        </span>
        <h3 className="text-h1 font-bold tracking-tight text-text-primary">
          {value}
        </h3>
      </div>
      {children}
    </Card>
  );
};

export const InfoCard = ({
  className,
  title,
  items = [],
  ...props
}) => {
  return (
    <Card className={cn('space-y-4', className)} {...props}>
      {title && (
        <h4 className="text-body-lg font-bold tracking-tight border-b border-border-muted pb-2">
          {title}
        </h4>
      )}
      <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <dt className="text-tiny text-text-muted uppercase tracking-wider font-medium">
              {item.label}
            </dt>
            <dd className="text-body font-semibold text-text-primary">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};

export const ChartCard = ({
  className,
  title,
  subtitle,
  children,
  actions,
  ...props
}) => {
  return (
    <Card className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-body-lg font-bold tracking-tight text-text-primary">
            {title}
          </h4>
          {subtitle && (
            <p className="text-caption text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
      <div className="flex-1 w-full min-h-[300px] flex items-center justify-center">
        {children}
      </div>
    </Card>
  );
};

export const EmptyCard = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-l border border-dashed border-border bg-transparent p-8 flex flex-col items-center justify-center text-center min-h-[200px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
