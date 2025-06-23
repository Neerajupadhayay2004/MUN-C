"use client"

import type React from "react"
import { useState } from "react"
import { Search, Plus, Menu, Package, Grid, List } from "lucide-react"
import type { Product } from "../types/product"
import ProductCard from "./ProductCard"

interface DashboardProps {
  products: Product[]
  onAddProduct: () => void
  onMenuClick: () => void
  onDeleteProduct: (productId: string) => void
  onUpdateProduct: (product: Product) => void
}

const Dashboard: React.FC<DashboardProps> = ({
  products,
  onAddProduct,
  onMenuClick,
  onDeleteProduct,
  onUpdateProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedItemType, setSelectedItemType] = useState("")
  const [selectedProductType, setSelectedProductType] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))]
  const itemTypes = [...new Set(products.map((p) => p.itemType).filter(Boolean))]
  const productTypes = [...new Set(products.map((p) => p.productType).filter(Boolean))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesItemType = !selectedItemType || product.itemType === selectedItemType
    const matchesProductType = !selectedProductType || product.productType === selectedProductType
    return matchesSearch && matchesCategory && matchesItemType && matchesProductType
  })

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button onClick={onMenuClick} className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              All Products ({filteredProducts.length})
            </h1>
          </div>
          <button
            onClick={onAddProduct}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedItemType}
              onChange={(e) => setSelectedItemType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Item Types</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Product Types</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
            >
              {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {filteredProducts.length > 0 ? (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-4"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={onDeleteProduct}
                onUpdate={onUpdateProduct}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {products.length === 0 ? "No products yet" : "No products found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {products.length === 0
                ? "Get started by adding your first product to the inventory."
                : "Try adjusting your search terms or filters."}
            </p>
            {products.length === 0 && (
              <button
                onClick={onAddProduct}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
