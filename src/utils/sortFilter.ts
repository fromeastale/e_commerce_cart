import type { Product, SortKey, PriceRange } from '@/types'

/** 基本正規化：小寫、去空白（含全形空白）、去掉常見符號差異 */
function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, '')                 // 移除所有空白
    .replace(/[－—–‐]/g, '-')           // 各種破折/連接號統一
    .replace(/[’‘']/g, "'")
    .trim()
}

/** 同義詞/相似詞庫：可自行擴充 */
const SYNONYMS: Record<string, string[]> = {
  // 商品常見字
  '外套': ['連帽外套', '風衣', '夾克', '外衣', 'hoodie', 'jacket'],
  't恤': ['短t', '短袖', 'tee', 't-shirt', '素t', '素tee'],
  '鞋': ['鞋子', '球鞋', '運動鞋', '跑鞋', '慢跑鞋', '帆布鞋', 'sneaker', 'sneakers'],
  '帆布鞋': ['sneaker', 'sneakers'],
  '皮夾': ['錢包', 'wallet', '卡夾'],
  '耳機': ['藍牙耳機', '藍芽耳機', '真無線', 'tws', '耳麥', '無線耳機', 'headset', 'earbuds'],
  '行動電源': ['行充', 'powerbank', '充電寶', '行動充電器'],
  '帽': ['漁夫帽', 'bucket hat', '帽子'],
}

/** 將使用者輸入切成詞陣列；每個詞會擴展成同義詞集合 */
function expandQuerySets(input: string): string[][] {
  const raw = input.trim()
  if (!raw) return []

  // 以空白分詞（支援多個關鍵字）；你也可以改成逗號/頓號
  const tokens = raw.split(/\s+/).filter(Boolean)

  return tokens.map((t) => {
    const n = norm(t)
    // 找出與 key 比對後的同義詞；同時也把 key 本身放進集合
    const hit = Object.entries(SYNONYMS).find(([k]) => norm(k) === n)
    const exp = hit ? hit[1] : []
    // 同義詞本身也要正規化
    const all = [t, ...exp].map(norm)
    // 去重
    return Array.from(new Set(all))
  })
}

/** 產品標題的正規化版本（可視需要把 category 也拼進去） */
function normalizedTitle(p: Product) {
  return norm(p.title)
}

export function applyFilters(
  list: Product[],
  options: {
    category?: Product['category'] | 'ALL'
    price?: PriceRange
    onlyFav?: boolean
    favSet?: Set<string>
    search?: string
  }
) {
  const { category = 'ALL', price, onlyFav, favSet, search } = options
  const querySets = search ? expandQuerySets(search) : []

  return list.filter((p) => {
    if (category !== 'ALL' && p.category !== category) return false
    if (price?.min != null && p.price < price.min) return false
    if (price?.max != null && p.price > price.max) return false
    if (onlyFav && !(favSet?.has(p.id))) return false

    if (querySets.length) {
      const titleN = normalizedTitle(p)
      // AND 規則：每個詞集合都要至少命中其中一個展開詞
      const allSetsMatched = querySets.every((set) =>
        set.some((term) => titleN.includes(term))
      )
      if (!allSetsMatched) return false
    }

    return true
  })
}

export function applySort(list: Product[], key: SortKey) {
  const c = [...list]
  switch (key) {
    case 'price-asc':
      return c.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return c.sort((a, b) => b.price - a.price)
    case 'sold-desc':
      return c.sort((a, b) => b.sold - a.sold)
    case 'newest':
      return c.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      )
  }
}
