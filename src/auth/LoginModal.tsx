import { useState } from 'react'
import { useAuth } from './AuthProvider'

export default function LoginModal({
  open, onClose,
}: { open: boolean; onClose: () => void }) {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login'|'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const submit = async () => {
    setPending(true)
    setError(null)
    const fn = mode === 'login' ? signIn : signUp
    const { error } = await fn(email.trim(), password)
    setPending(false)
    if (error) setError(error)
    else onClose()
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}/>
      <div className={`absolute left-1/2 top-1/2 w-[420px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-5 shadow-xl
                       transition-transform ${open ? 'scale-100' : 'scale-95'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{mode === 'login' ? '登入會員' : '建立帳號'}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-black">✕</button>
        </div>

        <div className="space-y-3">
          <input
            type="email" placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
            value={email} onChange={e=>setEmail(e.target.value)}
          />
          <input
            type="password" placeholder="密碼（至少 6 碼）"
            className="w-full border rounded-lg px-3 py-2"
            value={password} onChange={e=>setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            onClick={submit}
            disabled={pending || !email || password.length < 6}
            className="w-full bg-black text-white rounded-lg py-2.5 disabled:opacity-40"
          >
            {pending ? '處理中…' : (mode === 'login' ? '登入' : '註冊')}
          </button>
          <button
            onClick={()=>setMode(mode==='login'?'signup':'login')}
            className="w-full border rounded-lg py-2.5"
          >
            {mode==='login' ? '沒有帳號？建立帳號' : '已有帳號？改為登入'}
          </button>
        </div>
      </div>
    </div>
  )
}
