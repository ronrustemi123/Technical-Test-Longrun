import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { SortField, SortState } from '../types/inventory';

interface Props {
  field: SortField;
  label: string;
  sort: SortState;
  onSort: (field: SortField) => void;
  className?: string;
}

export function SortableHeader({ field, label, sort, onSort, className = '' }: Props) {
  const isActive = sort.field === field;
  const isAsc = isActive && sort.order === 'asc';

  return (
    <th
      className={`cursor-pointer select-none px-4 py-3 text-left ${className}`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1.5 group">
        <span
          className={`font-mono text-[11px] font-medium uppercase tracking-widest transition-colors ${
            isActive ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-300'
          }`}
        >
          {label}
        </span>
        <span className={`transition-colors ${isActive ? 'text-blue-400' : 'text-zinc-700 group-hover:text-zinc-500'}`}>
          {isActive ? (
            isAsc ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )
          ) : (
            <ChevronsUpDown className="h-3.5 w-3.5" />
          )}
        </span>
      </div>
    </th>
  );
}
