export interface Product {
  id?: string
  createdAt?: string

  // General Information
  itemType: "goods" | "services"
  name: string
  sku: string
  barcode?: string
  ean?: string
  category: string
  subCategory?: string
  brand?: string
  productType: "simple" | "variant" | "bundle"
  supplier?: string
  supplierSku?: string
  warehouse?: string
  leadTime?: string
  reorderLevel?: string
  initialStock?: number
  trackSerial?: boolean
  batchTracking?: boolean
  status: "returnable" | "non-returnable"

  // Service-specific fields
  serviceType?: string
  duration?: number
  durationUnit?: "hours" | "days" | "weeks" | "months"
  serviceCategory?: string

  // Pricing & Tax
  purchasePrice?: number
  sellingPrice?: number
  wholesalePrice?: number
  quantity?: number
  unit?: string
  discountPrice?: number
  discountPeriod?: {
    from: string
    to: string
  }
  taxRate?: string
  hsnSac?: string
  priceIncludeGst?: boolean
  gstRate?: string

  // Description & Media
  description?: string
  images?: string[]
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]

  // Variants
  variants?: ProductVariant[]
  bundleItems?: BundleItem[]
  color?: string
  size?: string
  material?: string
  weight?: string
  dimensions?: string
}

export interface ProductVariant {
  id: string
  color?: string
  size?: string
  material?: string
  weight?: string
  sku: string
  price: number
  stock: number
  images?: string[]
}

export interface BundleItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Stock {
  id: string
  productId: string
  productName: string
  currentStock: number
  minStock: number
  maxStock: number
  location: string
  lastUpdated: string
  status: "in-stock" | "low-stock" | "out-of-stock"
}

export interface Sale {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  customerName: string
  customerEmail?: string
  saleDate: string
  status: "completed" | "pending" | "cancelled"
  paymentMethod?: string
}

export interface Document {
  id: string
  name: string
  type: "invoice" | "receipt" | "report" | "other"
  url: string
  createdAt: string
  size: number
}
