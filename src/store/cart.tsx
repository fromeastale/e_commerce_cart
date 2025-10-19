import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Product } from '@/types'

type CartItem = { id: string; qty: number; price: number; title: string }
type CartState = { items: Record<string, CartItem> }
type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'INC'; id: string }
  | { type: 'DEC'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }

type CartContextValue = {
  state: CartState
  dispatch: React.Dispatch<Action>
  totalQty: number
  totalPrice: number
}

const CartCtx = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'cart:v1'

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const prev = state.items[action.product.id]
      const nextQty = (prev?.qty ?? 0) + 1
      return {
        items: {
          ...state.items,
          [action.product.id]: {
            id: action.product.id,
            title: action.product.title,
            price: action.product.price,
            qty: nextQty,
          },
        },
      }
    }
    case 'INC': {
      const it = state.items[action.id]
      if (!it) return state
      return { items: { ...state.items, [action.id]: { ...it, qty: it.qty + 1 } } }
    }
    case 'DEC': {
      const it = state.items[action.id]
      if (!it) return state
      const qty = it.qty - 1
      const items = { ...state.items }
      if (qty <= 0) delete items[action.id]
      else items[action.id] = { ...it, qty }
      return { items }
    }
    case 'REMOVE': {
      const items = { ...state.items }
      delete items[action.id]
      return { items }
    }
    case 'CLEAR':
      return { items: {} }
    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as CartState) : { items: {} }
    } catch {
      return { items: {} }
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const { totalQty, totalPrice } = useMemo(() => {
    const arr = Object.values(state.items)
    return {
      totalQty: arr.reduce((s, i) => s + i.qty, 0),
      totalPrice: arr.reduce((s, i) => s + i.qty * i.price, 0),
    }
  }, [state])

  const value: CartContextValue = { state, dispatch, totalQty, totalPrice }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
