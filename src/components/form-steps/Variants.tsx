"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X, Package, Layers, Box } from "lucide-react"
import type { Product, ProductVariant, BundleItem } from "../../types/product"

interface VariantsProps {
  data: Partial<Product>
  onChange: (data: Partial<Product>) => void
}

const Variants: React.FC<VariantsProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState("Color")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])

  const tabs = [
    "Color",
    "Size",
    "Expiry",
    "Material",
    "Model",
    "Weight",
    "Skin type",
    "Packaging type",
    "Flavour",
    "Gender",
  ]

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      color: "",
      size: "",
      material: "",
      weight: "",
      sku: `${data.sku || "SKU"}-VAR-${(data.variants?.length || 0) + 1}`,
      price: data.sellingPrice || 0,
      stock: 0,
      images: [],
    }

    const variants = [...(data.variants || []), newVariant]
    onChange({ variants })
  }

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const variants = [...(data.variants || [])]
    variants[index] = { ...variants[index], [field]: value }
    onChange({ variants })
  }

  const removeVariant = (index: number) => {
    const variants = [...(data.variants || [])]
    variants.splice(index, 1)
    onChange({ variants })
  }

  const addVariantImage = (variantIndex: number, imageUrl: string) => {
    const variants = [...(data.variants || [])]
    variants[variantIndex].images = [...(variants[variantIndex].images || []), imageUrl]
    onChange({ variants })
  }

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const variants = [...(data.variants || [])]
    variants[variantIndex].images?.splice(imageIndex, 1)
    onChange({ variants })
  }

  const addBundleItem = () => {
    const newBundleItem: BundleItem = {
      id: Date.now().toString(),
      productId: "",
      productName: "",
      quantity: 1,
      price: 0,
    }

    const bundleItems = [...(data.bundleItems || []), newBundleItem]
    onChange({ bundleItems })
  }

  const updateBundleItem = (index: number, field: keyof BundleItem, value: any) => {
    const bundleItems = [...(data.bundleItems || [])]
    bundleItems[index] = { ...bundleItems[index], [field]: value }
    onChange({ bundleItems })
  }

  const removeBundleItem = (index: number) => {
    const bundleItems = [...(data.bundleItems || [])]
    bundleItems.splice(index, 1)
    onChange({ bundleItems })
  }

  // Mock products for bundle selection
  const availableProducts = [
    { id: "1", name: "Premium Laptop Stand", price: 2500 },
    { id: "2", name: "Wireless Mouse", price: 1200 },
    { id: "3", name: "USB-C Hub", price: 3500 },
    { id: "4", name: "Laptop Sleeve", price: 800 },
    { id: "5", name: "Portable Charger", price: 1800 },
  ]

  const availableServices = [
    { id: "s1", name: "Installation Service", price: 500 },
    { id: "s2", name: "Setup & Configuration", price: 800 },
    { id: "s3", name: "Training Session", price: 1500 },
    { id: "s4", name: "Technical Support", price: 1000 },
  ]

  const bundleOptions = data.itemType === "services" ? availableServices : availableProducts

  if (data.productType === "simple") {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {data.itemType === "services" ? "Simple Service" : "Simple Product"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This is a {data.itemType === "services" ? "simple service" : "simple product"} without variations. No
          additional configuration needed.
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between mb-2">
              <span>{data.itemType === "services" ? "Service Name:" : "Product Name:"}</span>
              <span className="font-medium">{data.name || "Not set"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>SKU:</span>
              <span className="font-medium">{data.sku || "Not set"}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">₹{data.sellingPrice || 0}</span>
            </div>
            {data.itemType === "services" && data.duration && (
              <div className="flex justify-between mt-2">
                <span>Duration:</span>
                <span className="font-medium">
                  {data.duration} {data.durationUnit}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (data.productType === "bundle") {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Box className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {data.itemType === "services" ? "Service Package" : "Bundle Product"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add multiple {data.itemType === "services" ? "services" : "products"} to create a{" "}
            {data.itemType === "services" ? "package" : "bundle"}. The total price will be calculated automatically.
          </p>
        </div>

        {/* Bundle Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              {data.itemType === "services" ? "Package Items" : "Bundle Items"}
            </h4>
            <button
              onClick={addBundleItem}
              className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>

          {data.bundleItems && data.bundleItems.length > 0 ? (
            <div className="space-y-4">
              {data.bundleItems.map((item, index) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {data.itemType === "services" ? "Service" : "Product"}
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) => {
                          const selectedItem = bundleOptions.find((p) => p.id === e.target.value)
                          updateBundleItem(index, "productId", e.target.value)
                          if (selectedItem) {
                            updateBundleItem(index, "productName", selectedItem.name)
                            updateBundleItem(index, "price", selectedItem.price)
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select {data.itemType === "services" ? "Service" : "Product"}</option>
                        {bundleOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name} - ₹{option.price}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateBundleItem(index, "quantity", Number.parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit Price
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateBundleItem(index, "price", Number.parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => removeBundleItem(index)}
                        className="w-full px-3 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Subtotal: ₹{(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {data.itemType === "services" ? "Package Total:" : "Bundle Total:"}
                  </span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{data.bundleItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Box className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No items in {data.itemType === "services" ? "package" : "bundle"} yet
              </p>
              <button
                onClick={addBundleItem}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Variable Product
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Variable Product</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create variations of your product with different attributes like color, size, material, etc.
        </p>
      </div>

      {/* Variant Attribute Tabs */}
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800 shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select {activeTab}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="">Select {activeTab}</option>
              {getAttributeOptions(activeTab).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available {activeTab} Options
            </label>
            <div className="flex flex-wrap gap-2">
              {getAttributeOptions(activeTab).map((option) => (
                <span
                  key={option}
                  className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  onClick={() => {
                    // Add logic to select this attribute
                  }}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Variants Table with Images */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Product Variants</h4>
          <button
            onClick={addVariant}
            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Variant
          </button>
        </div>

        {data.variants && data.variants.length > 0 ? (
          <div className="space-y-4">
            {data.variants.map((variant, index) => (
              <div
                key={variant.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                    <input
                      type="text"
                      value={variant.color || ""}
                      onChange={(e) => updateVariant(index, "color", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="Color"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
                    <input
                      type="text"
                      value={variant.size || ""}
                      onChange={(e) => updateVariant(index, "size", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="Size"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Material</label>
                    <input
                      type="text"
                      value={variant.material || ""}
                      onChange={(e) => updateVariant(index, "material", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="Material"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, "sku", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="SKU"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, "price", Number.parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="Price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="Stock"
                    />
                  </div>
                </div>

                {/* Variant Images */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Variant Images
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {variant.images?.map((image, imageIndex) => (
                      <div key={imageIndex} className="relative group">
                        <img
                          src={image || "/placeholder.svg?height=60&width=60"}
                          alt={`Variant ${index + 1} Image ${imageIndex + 1}`}
                          className="w-16 h-16 object-cover rounded border border-gray-200 dark:border-gray-600"
                        />
                        <button
                          onClick={() => removeVariantImage(index, imageIndex)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <label className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      <Plus className="w-6 h-6 text-gray-400" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const imageUrl = URL.createObjectURL(file)
                            addVariantImage(index, imageUrl)
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => removeVariant(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">No variants created yet</p>
            <button
              onClick={addVariant}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Variant
            </button>
          </div>
        )}
      </div>

      {/* Variant Summary */}
      {data.variants && data.variants.length > 0 && (
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Variant Summary</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Total Variants:</span>
              <span className="ml-2 font-medium">{data.variants.length}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Total Stock:</span>
              <span className="ml-2 font-medium">
                {data.variants.reduce((total, variant) => total + variant.stock, 0)}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Price Range:</span>
              <span className="ml-2 font-medium">
                ₹{Math.min(...data.variants.map((v) => v.price))} - ₹{Math.max(...data.variants.map((v) => v.price))}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Avg. Price:</span>
              <span className="ml-2 font-medium">
                ₹
                {(data.variants.reduce((total, variant) => total + variant.price, 0) / data.variants.length).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Helper function to get attribute options
  function getAttributeOptions(attribute: string): string[] {
    switch (attribute) {
      case "Color":
        return ["Red", "Blue", "Green", "Black", "White", "Yellow", "Purple", "Orange", "Pink", "Gray"]
      case "Size":
        return ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40"]
      case "Material":
        return ["Cotton", "Polyester", "Wool", "Silk", "Leather", "Denim", "Linen", "Plastic", "Metal", "Wood"]
      case "Weight":
        return ["100g", "250g", "500g", "1kg", "2kg", "5kg", "Light", "Medium", "Heavy"]
      case "Expiry":
        return ["1 Month", "3 Months", "6 Months", "1 Year", "2 Years", "No Expiry"]
      case "Model":
        return ["Model A", "Model B", "Model C", "Pro", "Standard", "Basic"]
      case "Skin type":
        return ["Oily", "Dry", "Combination", "Sensitive", "Normal", "All Types"]
      case "Packaging type":
        return ["Box", "Bottle", "Tube", "Pouch", "Jar", "Sachet"]
      case "Flavour":
        return ["Vanilla", "Chocolate", "Strawberry", "Mint", "Orange", "Natural"]
      case "Gender":
        return ["Men", "Women", "Unisex", "Boys", "Girls"]
      default:
        return []
    }
  }
}

export default Variants
