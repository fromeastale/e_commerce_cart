import { useEffect, useState } from 'react'

const KEY = 'fav:v1'

export function useFavorites() {
  const [set, setSet] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify([...set]))
  }, [set])

  const toggle = (id: string) =>
    setSet(prev => {
      const s = new Set(prev)
      if (s.has(id)) {
        s.delete(id)
      } else {
        s.add(id)
      }
      return s
    })

  const clear = () => setSet(new Set())

  return { favs: set, toggle, clear }
}
