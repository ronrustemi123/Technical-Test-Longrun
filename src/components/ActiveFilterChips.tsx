import { X } from 'lucide-react';
import { useInventoryStore } from '../stores/inventoryStore';
import type { FilterState } from '../types/inventory';

interface Props {
  filters: FilterState;
  onClear: () => void;
}

export function ActiveFilterChips({ filters }: Props) {
  const { setSearch, setCategory, setMinPrice, setMaxPrice, setStockFilter } =
    useInventoryStore();

  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.search)
    chips.push({ label: `"${filters.search}"`, onRemove: () => setSearch('') });

  if (filters.category)
    chips.push({
      label: filters.category,
      onRemove: () => setCategory(''),
    });

  if (filters.minPrice)
    chips.push({
      label: `Min $${filters.minPrice}`,
      onRemove: () => setMinPrice(''),
    });

  if (filters.maxPrice)
    chips.push({
      label: `Max $${filters.maxPrice}`,
      onRemove: () => setMaxPrice(''),
    });

  if (filters.stockFilter !== 'all')
    chips.push({
      label: filters.stockFilter === 'in_stock' ? 'In stock' : 'Out of stock',
      onRemove: () => setStockFilter('all'),
    });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 
                     text-xs font-medium text-blue-300 ring-1 ring-blue-500/20 
                     transition-all hover:bg-blue-500/20 hover:ring-blue-500/40"
        >
          {chip.label}
          <X className="h-3 w-3 opacity-60" />
        </button>
      ))}
    </div>
  );
}
