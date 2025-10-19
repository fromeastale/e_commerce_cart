import { useCart } from '@/store/cart'

export default function CartDrawer({
  open, onClose, onCheckout,
}: { open: boolean; onClose: () => void; onCheckout: () => void }) {
  const { state, dispatch, totalPrice } = useCart()
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/30 ${open ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={onClose}/>
      <div className={`absolute right-0 top-0 h-full w-[380px] max-w-[82vw] bg-white shadow-xl p-4
                      transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">購物車</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-black">✕</button>
        </div>

        <div className="mt-4 space-y-3 overflow-auto max-h-[70vh] pr-2">
          {Object.values(state.items).length === 0 ? (
            <p className="text-slate-500">你的購物車是空的。</p>
          ) : (
            Object.values(state.items).map(it => (
              <div key={it.id} className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-slate-500">NT$ {it.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 border rounded" onClick={()=>dispatch({type:'DEC', id: it.id})}>－</button>
                  <span className="w-6 text-center">{it.qty}</span>
                  <button className="w-7 h-7 border rounded" onClick={()=>dispatch({type:'INC', id: it.id})}>＋</button>
                  <button className="ml-2 text-slate-500 hover:text-red-600" onClick={()=>dispatch({type:'REMOVE', id: it.id})}>移除</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 border-t pt-3 flex items-center justify-between">
          <div className="text-slate-600">總計</div>
          <div className="text-xl font-bold">NT$ {totalPrice.toLocaleString()}</div>
        </div>
        <button
          className="mt-3 w-full bg-black text-white rounded-lg py-2.5 disabled:opacity-40"
          disabled={Object.values(state.items).length === 0}
          onClick={onCheckout}
        >
          結帳
        </button>
      </div>
    </div>
  )
}
