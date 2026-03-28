import { useEffect, useCallback, useState} from 'react';
import {
  useLoaderData,
} from 'react-router';
import { fetchProducts } from '../lib/queries';
import { useInventoryStore } from '../stores/inventoryStore';
import { FilterPanel } from '../components/FilterPanel';
import { ProductTable } from '../components/ProductTable';
import { Pagination } from '../components/Pagination';
import { StatsBar } from '../components/StatsBar';
import { ActiveFilterChips } from '../components/ActiveFilterChips';
import type { SortField, Product } from '../types/inventory';
import { Package } from 'lucide-react';
import { PAGE_SIZE } from '../lib/queries';

export function InventoryPage() {
  const { categories } = useLoaderData<{ categories: string[] }>();
  const { filters, sort, page, setSort, setPage, clearFilters } = useInventoryStore();

  const [data, setData] = useState<{
    products: Product[];
    totalCount: number;
    totalPages: number;
  }>({
    products: [],
    totalCount: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.stockFilter !== 'all';

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProducts(filters, sort, page)
      .then((result) => {
        if (!cancelled) {
          setData({
            products: result.products,
            totalCount: result.totalCount,
            totalPages: Math.ceil(result.totalCount / PAGE_SIZE),
          });
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters, sort, page]);

  const handleSortChange = useCallback(
    (field: SortField) => setSort(field),
    [setSort]
  );

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    [setPage]
  );

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-screen-xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 ring-1 ring-blue-500/30">
              <Package className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold tracking-tight text-zinc-100">
                Inventory
              </h1>
              <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                LongRun · Product Dashboard
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-screen-xl px-6 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">Error: {error}</p>
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-72">
            <FilterPanel categories={categories} />
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <StatsBar
              totalCount={data.totalCount}
              page={page}
              totalPages={data.totalPages}
              isLoading={loading}
            />

            {hasActiveFilters && (
              <ActiveFilterChips
                filters={filters}
                onClear={clearFilters}
              />
            )}

            <ProductTable
              products={data.products}
              sort={sort}
              isLoading={loading}
              onSortChange={handleSortChange}
            />

            {data.totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
