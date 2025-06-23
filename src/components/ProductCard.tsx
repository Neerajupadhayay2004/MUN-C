"use client"

import type React from "react"
import { useState } from "react"
import { Package, Tag, MapPin, Edit, Trash2, MoreVertical, Wrench, Layers, Box } from "lucide-react"
import type { Product } from "../types/product"

interface ProductCardProps {
  product: Product
  onDelete: (productId: string) => void
  onUpdate: (product: Product) => void
  viewMode: "grid" | "list"
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onUpdate, viewMode }) => {
  const [showMenu, setShowMenu] = useState(false)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product.id!)
    }
    setShowMenu(false)
  }

  const getProductTypeIcon = () => {
    switch (product.productType) {
      case "variant":
        return <Layers className="w-4 h-4 text-purple-600" />
      case "bundle":
        return <Box className="w-4 h-4 text-orange-600" />
      default:
        return <Package className="w-4 h-4 text-blue-600" />
    }
  }

  const getItemTypeIcon = () => {
    return product.itemType === "services" ? (
      <Wrench className="w-4 h-4 text-green-600" />
    ) : (
      <Package className="w-4 h-4 text-blue-600" />
    )
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
              {getItemTypeIcon()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">{product.name}</h3>
                {getProductTypeIcon()}
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.itemType === "services"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  }`}
                >
                  {product.itemType}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>SKU: {product.sku}</span>
                {product.category && <span>{product.category}</span>}
                {product.sellingPrice && (
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₹{product.sellingPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                product.status === "returnable"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              {product.status}
            </span>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          {getItemTypeIcon()}
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.itemType === "services"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
            }`}
          >
            {product.itemType}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
        {getProductTypeIcon()}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Tag className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">SKU: {product.sku}</span>
        </div>

        {product.category && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span className="w-4 h-4 mr-2 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </span>
            <span className="truncate">{product.category}</span>
          </div>
        )}

        {product.warehouse && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{product.warehouse}</span>
          </div>
        )}

        {product.productType === "variant" && product.variants && (
          <div className="text-sm text-purple-600 dark:text-purple-400">{product.variants.length} variants</div>
        )}

        {product.productType === "bundle" && product.bundleItems && (
          <div className="text-sm text-orange-600 dark:text-orange-400">
            {product.bundleItems.length} items in bundle
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {product.sellingPrice ? (
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{product.sellingPrice.toLocaleString()}
          </span>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">No price set</span>
        )}

        <div className="flex items-center space-x-2">
          {product.initialStock !== undefined && (
            <span className="text-sm text-gray-500 dark:text-gray-400">Stock: {product.initialStock}</span>
          )}
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.status === "returnable"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {product.status}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
