import React from 'react';
import { cn } from '../../utils/cn';

export const Container = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Section = ({
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn(
        'space-y-6 md:space-y-8',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export const PageHeader = ({
  className,
  title,
  subtitle,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b-4 border-border',
        className
      )}
      {...props}
    >
      <div className="space-y-1.5">
        <h1 className="text-h2 font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex flex-shrink-0 items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

export const Divider = ({
  className,
  vertical = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        vertical
          ? 'w-[3px] self-stretch bg-border mx-3'
          : 'h-[3px] w-full bg-border my-4',
        className
      )}
      {...props}
    />
  );
};

export const Stack = ({
  className,
  children,
  direction = 'col',
  align = 'stretch',
  justify = 'start',
  gap = 4,
  ...props
}) => {
  const directions = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  };

  const alignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifications = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gaps = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16',
  };

  return (
    <div
      className={cn(
        'flex',
        directions[direction] || directions.col,
        alignments[align] || alignments.stretch,
        justifications[justify] || justifications.start,
        gaps[gap] || gaps[4],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Grid = ({
  className,
  children,
  cols = 1,
  gap = 6,
  ...props
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    12: 'grid-cols-12',
  };

  const gaps = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
    16: 'gap-16',
  };

  return (
    <div
      className={cn(
        'grid',
        colClasses[cols] || colClasses[1],
        gaps[gap] || gaps[6],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Spacer = ({
  size = 4,
  className,
  ...props
}) => {
  const sizes = {
    2: 'h-2 w-2',
    4: 'h-4 w-4',
    6: 'h-6 w-6',
    8: 'h-8 w-8',
    12: 'h-12 w-12',
    16: 'h-16 w-16',
    24: 'h-24 w-24',
  };

  return (
    <div
      className={cn(
        sizes[size] || sizes[4],
        className
      )}
      {...props}
    />
  );
};
