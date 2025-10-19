import { Product } from '@/types'
import { useCart } from '@/store/cart'

export default function ProductCard({
  p, isFav, onToggleFav
}: { p: Product; isFav: boolean; onToggleFav: (id: string)=>void }) {
  const { dispatch } = useCart()

  return (
    <div className="border rounded-xl bg-white p-3 flex flex-col">
      <div className="aspect-[4/3] grid place-items-center text-6xl">
        <span aria-hidden>{p.thumbnail ?? '📦'}</span>
      </div>

      <div className="mt-2 flex-1">
        <h3 className="font-medium line-clamp-2">{p.title}</h3>
        <div className="text-sm text-slate-500 mt-1">{p.category} · ⭐ {p.rating}</div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">NT$ {p.price.toLocaleString()}</div>
        <div className="text-xs text-slate-500">已售 {p.sold}</div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => dispatch({ type: 'ADD', product: p })}
          className="flex-1 px-3 py-2 rounded-lg bg-black text-white hover:opacity-90"
        >
          加入購物車
        </button>
        <button
          aria-label="收藏"
          onClick={() => onToggleFav(p.id)}
          className={`px-3 py-2 rounded-lg border ${isFav ? 'bg-yellow-100 border-yellow-300' : 'hover:bg-slate-50'}`}
          title={isFav ? '已收藏' : '加入收藏'}
        >
          {isFav ? '★' : '☆'}
        </button>
      </div>
    </div>
  )
}
