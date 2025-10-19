export type Product = {
  id: string
  title: string
  price: number
  category: 'Clothes' | 'Shoes' | 'Accessories' | 'Electronics'
  rating: number
  sold: number
  createdAt: string // ISO
  thumbnail?: string
}

export type SortKey = 'price-asc' | 'price-desc' | 'sold-desc' | 'newest'

export type PriceRange = {
  min?: number
  max?: number
}
