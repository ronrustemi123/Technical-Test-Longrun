import { Skeleton } from './ui/skeleton';
import { PackageSearch } from 'lucide-react';
import { SortableHeader } from './SortableHeader';
import { ProductTableRow } from './ProductTableRow';
import type { Product, SortField, SortState } from '../types/inventory';

interface Props {
  products: Product[];
  sort: SortState;
  isLoading: boolean;
  onSortChange: (field: SortField) => void;
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="border-b border-zinc-800/60">
          <td className="px-4 py-3.5">
            <Skeleton className="h-4 w-48 bg-zinc-800" />
          </td>
          <td className="px-4 py-3.5">
            <Skeleton className="h-5 w-24 rounded-md bg-zinc-800" />
          </td>
          <td className="px-4 py-3.5">
            <Skeleton className="h-4 w-16 bg-zinc-800" />
          </td>
          <td className="px-4 py-3.5">
            <Skeleton className="h-4 w-20 bg-zinc-800" />
          </td>
          <td className="px-4 py-3.5">
            <Skeleton className="h-4 w-24 bg-zinc-800" />
          </td>
        </tr>
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={5} className="px-4 py-24 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 ring-1 ring-zinc-700">
            <PackageSearch className="h-6 w-6 text-zinc-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">No products found</p>
            <p className="mt-0.5 text-xs text-zinc-600">
              Try adjusting your filters or search query
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function ProductTable({ products, sort, isLoading, onSortChange }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/80">
              <SortableHeader
                field="name"
                label="Product"
                sort={sort}
                onSort={onSortChange}
                className="w-[40%]"
              />
              <th className="px-4 py-3 text-left">
                <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                  Category
                </span>
              </th>
              <SortableHeader
                field="price"
                label="Price"
                sort={sort}
                onSort={onSortChange}
              />
              <SortableHeader
                field="stock_quantity"
                label="Stock"
                sort={sort}
                onSort={onSortChange}
              />
              <SortableHeader
                field="created_at"
                label="Added"
                sort={sort}
                onSort={onSortChange}
              />
            </tr>
          </thead>
          <tbody className={isLoading ? 'opacity-50 transition-opacity' : ''}>
            {isLoading ? (
              <TableSkeleton />
            ) : products.length === 0 ? (
              <EmptyState />
            ) : (
              products.map((product, i) => (
                <ProductTableRow key={product.id} product={product} index={i} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
