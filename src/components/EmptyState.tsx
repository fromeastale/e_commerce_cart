export default function EmptyState() {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center">
      <div className="text-5xl mb-2">🔍</div>
      <h3 className="text-lg font-semibold">找不到符合條件的商品</h3>
      <p className="text-slate-500">試著調整分類、價格區間或關鍵字。</p>
    </div>
  )
}
