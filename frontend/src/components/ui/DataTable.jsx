import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export const DataTable = ({
  className,
  columns = [], // { key: string, label: string, sortable?: boolean, render?: (row) => React.ReactNode }
  data = [],
  isLoading = false,
  sortConfig = { key: null, direction: 'asc' }, // { key, direction }
  onSort,
  selectedRows = [],
  onSelectRow,
  onSelectAllRows,
  emptyState,
  ...props
}) => {
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;

  const handleSort = (key) => {
    if (!onSort) return;
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const renderSortIcon = (column) => {
    if (!column.sortable || !onSort) return null;
    if (sortConfig.key !== column.key) {
      return <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-text-disabled" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-brand-primary" />
    ) : (
      <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-brand-primary" />
    );
  };

  return (
    <div className={cn('card !w-full !max-w-none !transform-none !transition-none before:!content-none after:!content-none !p-0 overflow-x-auto', className)} {...props}>
      <table className="w-full border-collapse text-left text-body">
        {/* Table Header */}
        <thead className="bg-bg-base border-b-4 border-border text-tiny font-bold uppercase tracking-wider text-text-secondary select-none sticky top-0 z-sticky">
          <tr>
            {/* Selection Checkbox */}
            {onSelectAllRows && (
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAllRows(e.target.checked)}
                  className="h-4.5 w-4.5 rounded-s border border-border bg-bg-surface text-brand-primary cursor-pointer appearance-none checked:bg-brand-primary checked:border-transparent outline-none focus:ring-2 focus:ring-border-focus"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={cn(
                  'py-3.5 px-6 font-semibold',
                  col.sortable && 'cursor-pointer hover:text-text-primary transition-colors'
                )}
              >
                <div className="flex items-center">
                  {col.label}
                  {renderSortIcon(col)}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y-2 divide-border">
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 5 }).map((_, rIdx) => (
              <tr key={rIdx} className="hover:bg-bg-hover transition-colors">
                {onSelectAllRows && <td className="py-4 px-4"><div className="h-4.5 w-4.5 rounded bg-bg-surface-elevated animate-pulse" /></td>}
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="py-4 px-6">
                    <div className={cn(
                      'h-4 rounded bg-bg-surface-elevated animate-pulse',
                      cIdx === 0 ? 'w-2/3' : 'w-1/2'
                    )} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            // Empty State Row
            <tr>
              <td colSpan={columns.length + (onSelectAllRows ? 1 : 0)} className="py-12 px-6">
                {emptyState || (
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-body font-bold text-text-secondary">No records found</span>
                    <span className="text-caption text-text-muted">Try adjusting search parameters or filters</span>
                  </div>
                )}
              </td>
            </tr>
          ) : (
            // Data Rows
            data.map((row, rIdx) => {
              const isSelected = selectedRows.includes(row.id);
              return (
                <tr
                  key={row.id || rIdx}
                  className={cn(
                    'hover:bg-bg-hover transition-colors duration-fast group',
                    isSelected && 'bg-bg-hover/40'
                  )}
                >
                  {onSelectRow && (
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelectRow(row.id, e.target.checked)}
                        className="h-4.5 w-4.5 rounded-s border border-border bg-bg-surface text-brand-primary cursor-pointer appearance-none checked:bg-brand-primary checked:border-transparent outline-none focus:ring-2 focus:ring-border-focus"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="py-4.5 px-6 font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
