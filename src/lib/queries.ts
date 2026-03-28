import { supabase } from './supabase';
import type { FilterState, SortState, Product } from '../types/inventory';

export const PAGE_SIZE = 10;

interface FetchProductsResult {
  products: Product[];
  totalCount: number;
}

// Doing this so i have all the necesary queries in one place

export async function fetchProducts(
  filters: FilterState,
  sort: SortState,
  page: number
): Promise<FetchProductsResult> {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('products')
    .select('id, name, category, price, stock_quantity, created_at', {
      count: 'exact', // get total count without fetching all rows
    });


  if (filters.search.trim()) {
    query = query.ilike('name', `%${filters.search.trim()}%`);
  }

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.minPrice !== '') {
    const min = parseFloat(filters.minPrice);
    if (!isNaN(min)) query = query.gte('price', min);
  }

  if (filters.maxPrice !== '') {
    const max = parseFloat(filters.maxPrice);
    if (!isNaN(max)) query = query.lte('price', max);
  }

  if (filters.stockFilter === 'in_stock') {
    query = query.gt('stock_quantity', 0);
  } else if (filters.stockFilter === 'out_of_stock') {
    query = query.eq('stock_quantity', 0);
  }

  query = query.order(sort.field, {
    ascending: sort.order === 'asc',
    nullsFirst: false,
  });

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return {
    products: data ?? [],
    totalCount: count ?? 0,
  };
}

// getting the unique categories from each of them
export async function fetchCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('category');

  if (error) {
    console.error('Failed to fetch categories:', error.message);
    return [];
  }


  const seen: string[] = [];

  for (const row of data) {
    if (!seen.includes(row.category)) {
      seen.push(row.category);
    }
  }

  return seen.sort();
}
