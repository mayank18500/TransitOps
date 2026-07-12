import React from 'react';
import { m } from 'framer-motion';
import { ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export const Breadcrumb = ({
  className,
  items = [], // { label: string, href?: string }
  ...props
}) => {
  return (
    <nav
      className={cn('flex items-center text-tiny font-medium text-text-muted uppercase tracking-wider', className)}
      {...props}
    >
      <ol className="flex items-center gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-text-primary transition-colors duration-fast"
                >
                  {item.label}
                </a>
              ) : (
                <span className={isLast ? 'text-text-primary font-bold' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-text-muted" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const Tabs = ({
  className,
  tabs = [], // { id: string, label: string }
  activeTab,
  onChange,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex border-b border-border-muted space-x-6 relative',
        className
      )}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative py-3.5 text-caption font-semibold tracking-tight transition-colors duration-fast focus:outline-none select-none text-text-secondary hover:text-text-primary',
              isActive && 'text-brand-primary hover:text-brand-primary'
            )}
          >
            {tab.label}
            {isActive && (
              <m.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-primary"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export const Pagination = ({
  className,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  ...props
}) => {
  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-border-muted pt-4 mt-6',
        className
      )}
      {...props}
    >
      <span className="text-caption text-text-muted">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export const SearchBar = ({
  className,
  value,
  onChange,
  placeholder = 'Search...',
  onFilterToggle,
  isFilterActive = false,
  ...props
}) => {
  return (
    <div className={cn('flex items-center gap-3 w-full', className)} {...props}>
      <div className="relative flex-1 flex items-center">
        <Search className="absolute left-3.5 h-4.5 w-4.5 text-text-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-4 bg-bg-surface-elevated text-text-primary border border-border rounded-m text-caption outline-none transition-all duration-fast placeholder:text-text-disabled focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
        />
      </div>
      {onFilterToggle && (
        <Button
          variant="outline"
          size="md"
          className={cn(
            'flex-shrink-0 gap-2 h-10',
            isFilterActive && 'border-brand-primary bg-brand-primary/10 text-brand-primary'
          )}
          onClick={onFilterToggle}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      )}
    </div>
  );
};
