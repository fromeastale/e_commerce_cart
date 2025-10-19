import { useMemo, useState } from 'react'
import { CartProvider } from '@/store/cart'
import { useFavorites } from '@/store/favorites'
import { products } from '@/data/products'
import { applyFilters, applySort } from '@/utils/sortFilter'
import type { SortKey, Product } from '@/types'
import Header from '@/components/Header'
import FiltersBar from '@/components/FiltersBar'
import ProductGrid from '@/components/ProductGrid'
import EmptyState from '@/components/EmptyState'
import CartDrawer from '@/components/CartDrawer'
import { AuthProvider, useAuth } from '@/auth/AuthProvider'
import LoginModal from '@/auth/LoginModal'

type Category = 'ALL' | Product['category']

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Page />
      </CartProvider>
    </AuthProvider>
  )
}

function Page() {
  const [openCart, setOpenCart] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const { favs, toggle: toggleFav } = useFavorites()
  const { user } = useAuth()

  const [category, setCategory] = useState<Category>('ALL')
  const [sort, setSort] = useState<SortKey>('newest')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [onlyFav, setOnlyFav] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const list = applyFilters(products, {
      category,
      price: {
        min: priceMin ? Number(priceMin) : undefined,
        max: priceMax ? Number(priceMax) : undefined,
      },
      onlyFav,
      favSet: favs,
      search,
    })
    return applySort(list, sort)
  }, [category, priceMin, priceMax, onlyFav, favs, search, sort])

  const clearFilters = () => {
    setCategory('ALL'); setPriceMin(''); setPriceMax('')
    setOnlyFav(false); setSearch(''); setSort('newest')
  }

  const handleCheckout = () => {
    if (!user) {
      setOpenLogin(true)
      return
    }
    alert(`（示範）已送出訂單。\n使用者：${user.email ?? user.id}`)
    setOpenCart(false)
  }

  return (
    <div className="min-h-dvh">
      <Header onOpenCart={() => setOpenCart(true)} onOpenLogin={() => setOpenLogin(true)} />
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <FiltersBar
          category={category} setCategory={v => setCategory(v as Category)}
          sort={sort} setSort={setSort}
          priceMin={priceMin} priceMax={priceMax}
          setPriceMin={setPriceMin} setPriceMax={setPriceMax}
          onlyFav={onlyFav} setOnlyFav={setOnlyFav}
          search={search} setSearch={setSearch}
          onClearFilters={clearFilters}
        />

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductGrid list={filtered} favSet={favs} onToggleFav={toggleFav}/>
        )}
      </main>

      <CartDrawer open={openCart} onClose={()=>setOpenCart(false)} onCheckout={handleCheckout} />
      <LoginModal open={openLogin} onClose={()=>setOpenLogin(false)} />
    </div>
  )
}
