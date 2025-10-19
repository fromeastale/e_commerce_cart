import type { SortKey } from '@/types'

type Props = {
  category: string
  setCategory: (v: string) => void
  sort: SortKey
  setSort: (v: SortKey) => void
  priceMin: string
  priceMax: string
  setPriceMin: (v: string) => void
  setPriceMax: (v: string) => void
  onlyFav: boolean
  setOnlyFav: (v: boolean) => void
  search: string
  setSearch: (v: string) => void
  onClearFilters: () => void
}

export default function FiltersBar(p: Props) {
  return (
    <div className="bg-white border rounded-xl p-3 flex flex-wrap gap-3 items-center">
      {/* 分類（中文標籤，值仍使用英文 key） */}
      <select
        value={p.category}
        onChange={(e) => p.setCategory(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="ALL">全部分類</option>
        <option value="Clothes">服飾</option>
        <option value="Shoes">鞋履</option>
        <option value="Accessories">配飾</option>
        <option value="Electronics">3C 電子</option>
      </select>

      {/* 排序 */}
      <select
        value={p.sort}
        onChange={(e) => p.setSort(e.target.value as SortKey)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="newest">最新上架</option>
        <option value="price-asc">價格：低到高</option>
        <option value="price-desc">價格：高到低</option>
        <option value="sold-desc">熱銷排行</option>
      </select>

      {/* 價格區間 */}
      <div className="flex items-center gap-2">
        <input
          value={p.priceMin}
          inputMode="numeric"
          onChange={(e) => p.setPriceMin(e.target.value)}
          placeholder="最低價"
          className="w-24 px-2 py-2 border rounded-lg"
        />
        <span className="text-slate-400">~</span>
        <input
          value={p.priceMax}
          inputMode="numeric"
          onChange={(e) => p.setPriceMax(e.target.value)}
          placeholder="最高價"
          className="w-24 px-2 py-2 border rounded-lg"
        />
      </div>

      {/* 只看收藏 */}
      <label className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer">
        <input
          type="checkbox"
          checked={p.onlyFav}
          onChange={(e) => p.setOnlyFav(e.target.checked)}
        />
        <span>只看收藏</span>
      </label>

      {/* 搜尋（保留你的 placeholder） */}
      <input
        value={p.search}
        onChange={(e) => p.setSearch(e.target.value)}
        placeholder="搜尋商品名稱"
        className="px-3 py-2 border rounded-lg flex-1 min-w-[180px]"
      />

      <button
        onClick={p.onClearFilters}
        className="ml-auto px-3 py-2 border rounded-lg hover:bg-slate-50"
      >
        清除條件
      </button>
    </div>
  )
}
