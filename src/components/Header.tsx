import { useCart } from '@/store/cart'
import { useAuth } from '@/auth/AuthProvider'

export default function Header({
  onOpenCart, onOpenLogin,
}: { onOpenCart: () => void; onOpenLogin: () => void }) {
  const { totalQty, totalPrice } = useCart()
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">🛍️ Demo 商店</h1>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-600">Hi, {user.email}</span>
              <button onClick={signOut} className="text-sm border rounded-lg px-3 py-1.5 hover:bg-slate-50">登出</button>
            </>
          ) : (
            <button onClick={onOpenLogin} className="text-sm border rounded-lg px-3 py-1.5 hover:bg-slate-50">登入</button>
          )}
          <button
            onClick={onOpenCart}
            className="relative rounded-full border px-4 py-1.5 text-sm hover:bg-slate-50"
          >
            購物車
            <span className="ml-2 rounded-full bg-black text-white text-xs px-2 py-0.5">{totalQty}</span>
            <span className="ml-2 text-slate-500">NT$ {totalPrice.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
