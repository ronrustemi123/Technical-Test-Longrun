export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  created_at: string;
}

export type SortField = 'name' | 'price' | 'stock_quantity' | 'created_at';
export type SortOrder = 'asc' | 'desc';
export type StockFilter = 'all' | 'in_stock' | 'out_of_stock';

export interface FilterState {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  stockFilter: StockFilter;
}

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface LoaderData {
  products: Product[];
  totalCount: number;
  totalPages: number;
  page: number;
  categories: string[];
  error: string | null;
}
