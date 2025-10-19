import { Product } from '@/types'
import ProductCard from './ProductCard'

export default function ProductGrid({
  list, favSet, onToggleFav
}: { list: Product[]; favSet: Set<string>; onToggleFav: (id: string)=>void }) {
  if (list.length === 0) return null
  return (
    <div className="grid grid-cols-cards gap-4">
      {list.map(p => (
        <ProductCard key={p.id} p={p} isFav={favSet.has(p.id)} onToggleFav={onToggleFav}/>
      ))}
    </div>
  )
}
