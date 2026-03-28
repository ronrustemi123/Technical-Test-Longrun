import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useInventoryStore } from '../stores/inventoryStore';
import { useDebounce } from '../hooks/useDebounce';

interface Props {
  categories: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Electronics: 'text-blue-400',
  Clothing: 'text-violet-400',
  'Home & Garden': 'text-emerald-400',
  Sports: 'text-orange-400',
  Books: 'text-yellow-400',
  Tools: 'text-red-400',
};

export function FilterPanel({ categories }: Props) {
  const {
    filters,
    setSearch,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setStockFilter,
    clearFilters,
  } = useInventoryStore();

  const hasActiveFilters =
    filters.search !== '' ||
      filters.category !== '' ||
      filters.minPrice !== '' ||
      filters.maxPrice !== '' ||
      filters.stockFilter !== 'all';

  // Local search state so we can debounce before hitting Zustand/URL
  const [localSearch, setLocalSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(localSearch, 400);

  // Sync local search to store when debounced value settles
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep local search in sync when URL changes (e.g. clear filters)
  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);


  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-5">
      {/* Panel header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-200">Filters</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-100"
          >
            <X className="mr-1 h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      <Separator className="bg-zinc-800" />

      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Product name..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 
                       focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 font-mono text-sm"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Category
        </label>
        <Select
          value={filters.category || 'all'}
          onValueChange={(v) => setCategory(v === 'all' ? '' : v)}
        >
          <SelectTrigger className="bg-zinc-950 border-zinc-700 text-zinc-100 focus:ring-blue-500/50">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="all" className="text-zinc-400">
              All categories
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-zinc-100">
                <span className={CATEGORY_COLORS[cat] ?? 'text-zinc-300'}>
                  ●
                </span>{' '}
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range */}
      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-mono">
              $
            </span>
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="pl-6 bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-600
                         focus-visible:ring-blue-500/50 font-mono text-sm"
              min={0}
            />
          </div>
          <span className="text-zinc-600 text-sm">—</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-mono">
              $
            </span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="pl-6 bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-600
                         focus-visible:ring-blue-500/50 font-mono text-sm"
              min={0}
            />
          </div>
        </div>
      </div>

      {/* Stock availability */}
      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Availability
        </label>
        <div className="space-y-1">
          {(
            [
              { value: 'all', label: 'All products' },
              { value: 'in_stock', label: 'In stock' },
              { value: 'out_of_stock', label: 'Out of stock' },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setStockFilter(value)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                filters.stockFilter === value
                  ? 'bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/30'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full shrink-0 ${
                  value === 'in_stock'
                    ? 'bg-emerald-400'
                    : value === 'out_of_stock'
                    ? 'bg-red-400'
                    : 'bg-zinc-500'
                }`}
              />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
