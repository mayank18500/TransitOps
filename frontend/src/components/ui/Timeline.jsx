import React from 'react';
import { cn } from '../../utils/cn';

export const TimelineItem = ({
  className,
  title,
  timestamp,
  description,
  icon,
  isLast = false,
  ...props
}) => {
  return (
    <div className={cn('flex gap-4 relative pb-6', className)} {...props}>
      {/* Vertical connector line */}
      {!isLast && (
        <span className="absolute left-[15px] top-8 bottom-0 w-[1px] bg-border-muted" />
      )}

      {/* Bullet / Node */}
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-bg-surface-elevated border border-border text-text-secondary">
        {icon || <span className="h-2 w-2 rounded-full bg-brand-primary" />}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="text-body font-bold text-text-primary">
            {title}
          </span>
          {timestamp && (
            <span className="text-tiny text-text-muted font-medium">
              {timestamp}
            </span>
          )}
        </div>
        {description && (
          <p className="text-caption text-text-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export const Timeline = ({
  className,
  items = [], // { title, timestamp, description, icon }
  ...props
}) => {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {items.map((item, idx) => (
        <TimelineItem
          key={idx}
          isLast={idx === items.length - 1}
          {...item}
        />
      ))}
    </div>
  );
};

export const ActivityFeed = ({
  className,
  activities = [], // { id, user, action, target, timestamp, icon }
  ...props
}) => {
  return (
    <div className={cn('flex flex-col divide-y divide-border-muted', className)} {...props}>
      {activities.map((act) => (
        <div key={act.id} className="flex gap-3 py-3.5 first:pt-0 last:pb-0 items-start">
          {act.icon && (
            <div className="text-text-muted mt-0.5 flex-shrink-0">
              {act.icon}
            </div>
          )}
          <div className="flex-1 text-caption">
            <p className="text-text-primary font-medium">
              <span className="font-bold text-text-primary mr-1">{act.user}</span>
              {act.action} <span className="text-brand-primary font-semibold">{act.target}</span>
            </p>
            {act.timestamp && (
              <span className="text-tiny text-text-muted mt-1 block">
                {act.timestamp}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
