import type { LoaderData } from "../types/inventory";

import { fetchCategories} from "../lib/queries.ts";

export async function inventoryLoader(): Promise<Pick<LoaderData, 'categories'>> {
  const categories = await fetchCategories();
  return { categories };
}
