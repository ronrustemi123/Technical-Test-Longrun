import { PAGE_SIZE } from '../lib/queries';

interface Props {
  totalCount: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
}

export function StatsBar({ totalCount, page, totalPages, isLoading }: Props) {
  const from = Math.min((page - 1) * PAGE_SIZE + 1, totalCount);
  const to = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <div className="flex items-center justify-between">
      <p
        className={`font-mono text-xs text-zinc-500 transition-opacity ${
          isLoading ? 'opacity-40' : ''
        }`}
      >
        {totalCount === 0 ? (
          'No results'
        ) : (
          <>
            Showing{' '}
            <span className="text-zinc-300">
              {from}–{to}
            </span>{' '}
            of{' '}
            <span className="text-zinc-300">{totalCount.toLocaleString()}</span>{' '}
            products
          </>
        )}
      </p>
      {totalPages > 1 && (
        <p className="font-mono text-xs text-zinc-600">
          Page {page} / {totalPages}
        </p>
      )}
    </div>
  );
}
