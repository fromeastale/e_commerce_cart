import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, HAS_SUPABASE_ENV } from '@/lib/supabase'

type User = { id: string; email: string | null }

type AuthCtx = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const Ctx = createContext<AuthCtx | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub: (() => void) | undefined

    const boot = async () => {
      if (!HAS_SUPABASE_ENV || !supabase) {
        console.warn('[Auth] Supabase 未設定，登入功能停用')
        setLoading(false)
        return
      }

      const { data } = await supabase.auth.getSession()
      const s = data.session
      setUser(s ? { id: s.user.id, email: s.user.email ?? null } : null)
      setLoading(false)

      const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
        setUser(session ? { id: session.user.id, email: session.user.email ?? null } : null)
      })
      unsub = () => sub.subscription.unsubscribe()
    }

    void boot()
    return () => { if (unsub) unsub() }
  }, [])

  const signIn: AuthCtx['signIn'] = async (email, password) => {
    if (!HAS_SUPABASE_ENV || !supabase) return { error: '尚未設定 Supabase，無法登入。' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? { error: error.message } : {}
  }

  const signUp: AuthCtx['signUp'] = async (email, password) => {
    if (!HAS_SUPABASE_ENV || !supabase) return { error: '尚未設定 Supabase，無法註冊。' }
    const { error } = await supabase.auth.signUp({ email, password })
    return error ? { error: error.message } : {}
  }

  const signOut = async () => {
    if (!HAS_SUPABASE_ENV || !supabase) return
    await supabase.auth.signOut()
  }

  return (
    <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!HAS_SUPABASE_ENV && (
        <div className="fixed bottom-3 right-3 z-50 rounded-lg border bg-white px-3 py-2 text-sm shadow">
          ⚠️ 尚未設定 Supabase：請在專案根目錄建立
          <code className="mx-1 bg-slate-100 px-1 rounded">.env</code>
          並填入 <code>VITE_SUPABASE_URL</code>、<code>VITE_SUPABASE_ANON_KEY</code>
        </div>
      )}
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within &lt;AuthProvider&gt;')
  return ctx
}
