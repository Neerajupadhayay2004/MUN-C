"use client"

import type React from "react"
import { useState } from "react"
import { QrCode, ChevronDown, ChevronUp, Package, Wrench, Layers, Box } from "lucide-react"
import type { Product } from "../../types/product"
import QRScanner from "../QRScanner"

interface GeneralInformationProps {
  data: Partial<Product>
  onChange: (data: Partial<Product>) => void
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ data, onChange }) => {
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [qrScanType, setQrScanType] = useState<"barcode" | "ean">("barcode")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleInputChange = (field: keyof Product, value: any) => {
    onChange({ [field]: value })
  }

  const handleQRScan = (result: string) => {
    if (qrScanType === "barcode") {
      onChange({ barcode: result })
    } else {
      onChange({ ean: result })
    }
    setShowQRScanner(false)
  }

  const generateBarcode = () => {
    const barcode = Math.floor(Math.random() * 1000000000000).toString()
    onChange({ barcode })
  }

  const getCategoryOptions = () => {
    if (data.itemType === "services") {
      return [
        { value: "consulting", label: "Consulting" },
        { value: "maintenance", label: "Maintenance & Repair" },
        { value: "installation", label: "Installation Services" },
        { value: "training", label: "Training & Education" },
        { value: "support", label: "Technical Support" },
        { value: "design", label: "Design Services" },
        { value: "development", label: "Development Services" },
        { value: "cleaning", label: "Cleaning Services" },
        { value: "delivery", label: "Delivery Services" },
      ]
    }
    return [
      { value: "electronics", label: "Electronics" },
      { value: "clothing", label: "Clothing & Fashion" },
      { value: "books", label: "Books & Media" },
      { value: "home", label: "Home & Garden" },
      { value: "sports", label: "Sports & Outdoors" },
      { value: "automotive", label: "Automotive" },
      { value: "health", label: "Health & Beauty" },
      { value: "food", label: "Food & Beverages" },
      { value: "toys", label: "Toys & Games" },
    ]
  }

  const getSubCategoryOptions = () => {
    if (data.itemType === "services") {
      switch (data.category) {
        case "consulting":
          return [
            { value: "business", label: "Business Consulting" },
            { value: "technical", label: "Technical Consulting" },
            { value: "financial", label: "Financial Consulting" },
            { value: "legal", label: "Legal Consulting" },
          ]
        case "maintenance":
          return [
            { value: "hvac", label: "HVAC Maintenance" },
            { value: "electrical", label: "Electrical Maintenance" },
            { value: "plumbing", label: "Plumbing Services" },
            { value: "general", label: "General Maintenance" },
          ]
        case "training":
          return [
            { value: "corporate", label: "Corporate Training" },
            { value: "technical", label: "Technical Training" },
            { value: "safety", label: "Safety Training" },
            { value: "software", label: "Software Training" },
          ]
        default:
          return []
      }
    } else {
      switch (data.category) {
        case "electronics":
          return [
            { value: "smartphones", label: "Smartphones" },
            { value: "laptops", label: "Laptops" },
            { value: "tablets", label: "Tablets" },
            { value: "accessories", label: "Accessories" },
          ]
        case "clothing":
          return [
            { value: "mens", label: "Men's Clothing" },
            { value: "womens", label: "Women's Clothing" },
            { value: "kids", label: "Kids' Clothing" },
            { value: "shoes", label: "Shoes" },
          ]
        default:
          return []
      }
    }
  }

  const getProductTypeOptions = () => {
    const baseOptions = [
      {
        value: "simple",
        label: "Simple Product",
        description:
          data.itemType === "services" ? "A single service without variations" : "A single product without variations",
        icon: <Package className="w-5 h-5 text-blue-600" />,
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        textColor: "text-blue-700 dark:text-blue-400",
      },
    ]

    if (data.itemType === "goods") {
      baseOptions.push(
        {
          value: "variant",
          label: "Variable Product",
          description: "Product with variations (size, color, material, etc.)",
          icon: <Layers className="w-5 h-5 text-purple-600" />,
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
          borderColor: "border-purple-200 dark:border-purple-800",
          textColor: "text-purple-700 dark:text-purple-400",
        },
        {
          value: "bundle",
          label: "Bundle Product",
          description: "Multiple products sold together as a package",
          icon: <Box className="w-5 h-5 text-orange-600" />,
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
          borderColor: "border-orange-200 dark:border-orange-800",
          textColor: "text-orange-700 dark:text-orange-400",
        },
      )
    } else {
      baseOptions.push({
        value: "bundle",
        label: "Service Package",
        description: "Multiple services bundled together",
        icon: <Box className="w-5 h-5 text-orange-600" />,
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        borderColor: "border-orange-200 dark:border-orange-800",
        textColor: "text-orange-700 dark:text-orange-400",
      })
    }

    return baseOptions
  }

  const handleProductTypeChange = (productType: string) => {
    // Clear existing variant/bundle data when changing product type
    const updatedData: Partial<Product> = { productType }

    if (productType === "simple") {
      updatedData.variants = []
      updatedData.bundleItems = []
      // Set default simple product data
      updatedData.trackSerial = false
      updatedData.batchTracking = false
      // Simple product specific defaults
      updatedData.leadTime = "1-week"
      updatedData.reorderLevel = "10"
    } else if (productType === "variant") {
      updatedData.bundleItems = []
      // Initialize with one empty variant if none exist
      if (!data.variants || data.variants.length === 0) {
        updatedData.variants = [
          {
            id: Date.now().toString(),
            color: "",
            size: "",
            material: "",
            weight: "",
            sku: `${data.sku || "SKU"}-VAR-001`,
            price: data.sellingPrice || 0,
            stock: 0,
            images: [],
          },
        ]
      }
      // Enable tracking for variable products
      updatedData.trackSerial = true
      updatedData.batchTracking = true
      // Variable product specific defaults
      updatedData.leadTime = "2-weeks"
      updatedData.reorderLevel = "25"
    } else if (productType === "bundle") {
      updatedData.variants = []
      // Initialize with one empty bundle item if none exist
      if (!data.bundleItems || data.bundleItems.length === 0) {
        updatedData.bundleItems = [
          {
            id: Date.now().toString(),
            productId: "",
            productName: "",
            quantity: 1,
            price: 0,
          },
        ]
      }
      // Bundle product specific defaults
      updatedData.trackSerial = false
      updatedData.batchTracking = true
      updatedData.leadTime = "3-days"
      updatedData.reorderLevel = "5"
    }

    onChange(updatedData)
  }

  return (
    <div className="space-y-6">
      {/* Item Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Item Type</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name="itemType"
              value="goods"
              checked={data.itemType === "goods"}
              onChange={(e) => handleInputChange("itemType", e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="ml-3">
              <Package className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Goods</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Physical products</p>
            </div>
          </label>
          <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name="itemType"
              value="services"
              checked={data.itemType === "services"}
              onChange={(e) => handleInputChange("itemType", e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="ml-3">
              <Wrench className="w-5 h-5 text-green-600 mb-1" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Services</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Service offerings</p>
            </div>
          </label>
        </div>
      </div>

      {/* Product/Service Name and SKU */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {data.itemType === "services" ? "Service Name" : "Product Name"}
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder={`Enter ${data.itemType === "services" ? "Service" : "Product"} Name`}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SKU</label>
          <input
            type="text"
            value={data.sku || ""}
            onChange={(e) => handleInputChange("sku", e.target.value)}
            placeholder="Enter SKU"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Service-specific fields */}
      {data.itemType === "services" && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-green-800 dark:text-green-300">Service Details</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type</label>
              <select
                value={data.serviceType || ""}
                onChange={(e) => handleInputChange("serviceType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Service Type</option>
                <option value="one-time">One-time Service</option>
                <option value="recurring">Recurring Service</option>
                <option value="subscription">Subscription Based</option>
                <option value="project">Project Based</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={data.duration || ""}
                  onChange={(e) => handleInputChange("duration", Number.parseInt(e.target.value))}
                  placeholder="Duration"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <select
                  value={data.durationUnit || "hours"}
                  onChange={(e) => handleInputChange("durationUnit", e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barcode and EAN - Only for goods */}
      {data.itemType === "goods" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Barcode</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={data.barcode || ""}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
                placeholder="Enter Product Code"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => {
                  setQrScanType("barcode")
                  setShowQRScanner(true)
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={generateBarcode}
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Generate Barcode
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">EAN</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={data.ean || ""}
                onChange={(e) => handleInputChange("ean", e.target.value)}
                placeholder="Enter 13 Digit Code"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => {
                  setQrScanType("ean")
                  setShowQRScanner(true)
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category and Sub-Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select
            value={data.category || ""}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Category</option>
            {getCategoryOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sub-Category</label>
          <select
            value={data.subCategory || ""}
            onChange={(e) => handleInputChange("subCategory", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={!data.category}
          >
            <option value="">Select Sub-Category</option>
            {getSubCategoryOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brand/Manufacturer */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {data.itemType === "services" ? "Service Provider" : "Brand/Manufacturer"}
        </label>
        <select
          value={data.brand || ""}
          onChange={(e) => handleInputChange("brand", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select {data.itemType === "services" ? "Provider" : "Brand"}</option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
          <option value="google">Google</option>
          <option value="microsoft">Microsoft</option>
          <option value="local-provider">Local Provider</option>
        </select>
      </div>

      {/* Product Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {data.itemType === "services" ? "Service Type" : "Product Type"}
        </label>
        <div className="space-y-3">
          {getProductTypeOptions().map((option) => (
            <label
              key={option.value}
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                data.productType === option.value
                  ? `${option.bgColor} ${option.borderColor} shadow-lg transform scale-[1.02] ring-2 ring-blue-200 dark:ring-blue-800`
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md"
              }`}
            >
              <input
                type="radio"
                name="productType"
                value={option.value}
                checked={data.productType === option.value}
                onChange={(e) => handleProductTypeChange(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {option.icon}
                  <span
                    className={`text-sm font-medium ${
                      data.productType === option.value ? option.textColor : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {option.label}
                  </span>
                  {data.productType === option.value && (
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full animate-pulse">
                      ✓ Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{option.description}</p>

                {/* Show additional info based on selection */}
                {data.productType === option.value && (
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 animate-fade-in">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {option.value === "simple" && "✓ Perfect for single items without variations"}
                        {option.value === "variant" &&
                          "✓ Ideal for products with multiple options like colors, sizes, etc."}
                        {option.value === "bundle" && "✓ Great for selling multiple items together at a package price"}
                      </p>

                      {/* Show specific features for each type */}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {option.value === "simple" && (
                          <div className="space-y-1">
                            <div>• Single SKU management</div>
                            <div>• Basic inventory tracking</div>
                            <div>• Simple pricing structure</div>
                          </div>
                        )}
                        {option.value === "variant" && (
                          <div className="space-y-1">
                            <div>• Multiple SKUs per product</div>
                            <div>• Individual pricing & stock</div>
                            <div>• Image support per variant</div>
                            <div>• Advanced tracking enabled</div>
                          </div>
                        )}
                        {option.value === "bundle" && (
                          <div className="space-y-1">
                            <div>• Multiple products in one package</div>
                            <div>• Automatic price calculation</div>
                            <div>• Quantity management</div>
                            <div>• Batch tracking enabled</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Content Based on Product Type */}
      {data.productType && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 animate-fade-in">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-3">
            {data.productType === "simple" && "Simple Product Configuration"}
            {data.productType === "variant" && "Variable Product Configuration"}
            {data.productType === "bundle" && "Bundle Product Configuration"}
          </h4>

          {data.productType === "simple" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Tracking:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">Basic inventory only</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Variations:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">None</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Default Lead Time:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">1 Week</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Reorder Level:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">10 Units</span>
              </div>
            </div>
          )}

          {data.productType === "variant" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Tracking:</span>
                <span className="ml-2 text-green-600 dark:text-green-400">Serial & Batch enabled</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Variations:</span>
                <span className="ml-2 text-purple-600 dark:text-purple-400">Multiple variants supported</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Default Lead Time:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">2 Weeks</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Reorder Level:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">25 Units</span>
              </div>
            </div>
          )}

          {data.productType === "bundle" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Tracking:</span>
                <span className="ml-2 text-orange-600 dark:text-orange-400">Batch tracking enabled</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Items:</span>
                <span className="ml-2 text-orange-600 dark:text-orange-400">Multiple products bundled</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Default Lead Time:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">3 Days</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Reorder Level:</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200">5 Units</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Supplier Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Supplier</label>
          <select
            value={data.supplier || ""}
            onChange={(e) => handleInputChange("supplier", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Supplier</option>
            <option value="supplier1">ABC Suppliers Ltd.</option>
            <option value="supplier2">XYZ Trading Co.</option>
            <option value="supplier3">Global Supply Chain</option>
            <option value="supplier4">Local Distributor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supplier SKU</label>
          <select
            value={data.supplierSku || ""}
            onChange={(e) => handleInputChange("supplierSku", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Supplier SKU</option>
            <option value="sku1">SUP-001</option>
            <option value="sku2">SUP-002</option>
            <option value="sku3">SUP-003</option>
          </select>
        </div>
      </div>

      {/* Warehouse/Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warehouse/Location</label>
        <select
          value={data.warehouse || ""}
          onChange={(e) => handleInputChange("warehouse", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Location</option>
          <option value="warehouse-a">Main Warehouse - Delhi</option>
          <option value="warehouse-b">Secondary Warehouse - Mumbai</option>
          <option value="warehouse-c">Distribution Center - Bangalore</option>
          <option value="warehouse-d">Regional Hub - Chennai</option>
        </select>
      </div>

      {/* Advanced Settings */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>Advanced Settings</span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="mt-6 space-y-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lead Time</label>
                <select
                  value={data.leadTime || ""}
                  onChange={(e) => handleInputChange("leadTime", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Lead Time</option>
                  <option value="1-day">1 Day</option>
                  <option value="3-days">3 Days</option>
                  <option value="1-week">1 Week</option>
                  <option value="2-weeks">2 Weeks</option>
                  <option value="1-month">1 Month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reorder Level</label>
                <select
                  value={data.reorderLevel || ""}
                  onChange={(e) => handleInputChange("reorderLevel", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Reorder Level</option>
                  <option value="5">5 Units</option>
                  <option value="10">10 Units</option>
                  <option value="25">25 Units</option>
                  <option value="50">50 Units</option>
                  <option value="100">100 Units</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Initial Stock Quantity
                </label>
                <input
                  type="number"
                  value={data.initialStock || ""}
                  onChange={(e) => handleInputChange("initialStock", Number.parseInt(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Track</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.trackSerial || false}
                      onChange={(e) => handleInputChange("trackSerial", e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Serial No.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.batchTracking || false}
                      onChange={(e) => handleInputChange("batchTracking", e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Batch No.</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="returnable"
                      checked={data.status === "returnable"}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Returnable</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="non-returnable"
                      checked={data.status === "non-returnable"}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Non-returnable</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
          title={`Scan ${qrScanType === "barcode" ? "Barcode" : "EAN"}`}
        />
      )}
    </div>
  )
}

export default GeneralInformation
