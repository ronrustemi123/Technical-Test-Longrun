import type { Product } from '../types/inventory';

interface Props {
  product: Product;
  index: number;
}

const CATEGORY_STYLES: Record<string, string> = {
  Electronics:
    'bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/20 hover:bg-blue-500/20',
  Clothing:
    'bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20 hover:bg-violet-500/20',
  'Home & Garden':
    'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20',
  Sports:
    'bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/20 hover:bg-orange-500/20',
  Books:
    'bg-yellow-500/10 text-yellow-300 ring-1 ring-yellow-500/20 hover:bg-yellow-500/20',
  Tools:
    'bg-red-500/10 text-red-300 ring-1 ring-red-500/20 hover:bg-red-500/20',
};

function StockIndicator({ qty }: { qty: number }) {
  if (qty === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-red-500/20" />
        <span className="font-mono text-sm text-red-400">Out of stock</span>
      </div>
    );
  }
  if (qty <= 10) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 ring-2 ring-amber-400/20" />
        <span className="font-mono text-sm text-amber-400 tabular-nums">{qty} left</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
      <span className="font-mono text-sm text-zinc-300 tabular-nums">{qty}</span>
    </div>
  );
}

export function ProductTableRow({ product, index }: Props) {
  const catStyle = CATEGORY_STYLES[product.category] ?? 
    'bg-zinc-700/50 text-zinc-300 ring-1 ring-zinc-600/30';

  const formattedDate = new Date(product.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <tr
      className="border-b border-zinc-800/60 transition-colors hover:bg-zinc-800/30"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Name */}
      <td className="px-4 py-3.5">
        <span className="text-sm font-medium text-zinc-100 leading-tight">
          {product.name}
        </span>
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${catStyle}`}
        >
          {product.category}
        </span>
      </td>

      {/* Price */}
      <td className="px-4 py-3.5">
        <span className="font-mono text-sm font-medium text-zinc-100 tabular-nums">
          ${product.price.toFixed(2)}
        </span>
      </td>

      {/* Stock */}
      <td className="px-4 py-3.5">
        <StockIndicator qty={product.stock_quantity} />
      </td>

      {/* Date */}
      <td className="px-4 py-3.5">
        <span className="font-mono text-xs text-zinc-500">{formattedDate}</span>
      </td>
    </tr>
  );
}
