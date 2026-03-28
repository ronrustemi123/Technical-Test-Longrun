import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];

  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="h-8 w-8 border-zinc-800 bg-zinc-900 text-zinc-400 
                   hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-1 font-mono text-xs text-zinc-600">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`flex h-8 w-8 items-center justify-center rounded-md font-mono text-sm transition-all ${
              p === page
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
            }`}
          >
            {p}
          </button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="h-8 w-8 border-zinc-800 bg-zinc-900 text-zinc-400 
                   hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
