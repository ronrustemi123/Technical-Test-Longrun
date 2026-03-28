import { create } from "zustand"
import type { FilterState, SortState, SortField, StockFilter } from '../types/inventory';

interface InventoryStore {
  filters: FilterState;
  sort: SortState;
  page: number;

  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  setStockFilter: (filter: StockFilter) => void;
  setSort: (field: SortField) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  stockFilter: 'all',
};

export const useInventoryStore = create<InventoryStore>((set) => ({
  filters: DEFAULT_FILTERS,
  sort: { field: 'created_at', order: 'desc' },
  page: 1,

  setSearch: (search) => set((s) => ({ filters: { ...s.filters, search }, page: 1 })),
  setCategory: (category) => set((s) => ({ filters: { ...s.filters, category }, page: 1 })),
  setMinPrice: (minPrice) => set((s) => ({ filters: { ...s.filters, minPrice }, page: 1 })),
  setMaxPrice: (maxPrice) => set((s) => ({ filters: { ...s.filters, maxPrice }, page: 1 })),
  setStockFilter: (stockFilter) => set((s) => ({ filters: { ...s.filters, stockFilter }, page: 1 })),

  setSort: (field) =>
    set((s) => ({
      sort: {
        field,
        order: s.sort.field === field && s.sort.order === 'asc' ? 'desc' : 'asc',
      },
      page: 1,
    })),

  setPage: (page) => set({ page }),

  clearFilters: () => set({ filters: DEFAULT_FILTERS, page: 1 }),
}));
