import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// 若 .env 未設定，supabase 以 null 表示未啟用
export const supabase = (URL && KEY) ? createClient(URL, KEY) : null
export const HAS_SUPABASE_ENV = Boolean(supabase)
