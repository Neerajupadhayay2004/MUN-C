"use client"

import type React from "react"
import type { Product } from "../../types/product"

interface PricingTaxProps {
  data: Partial<Product>
  onChange: (data: Partial<Product>) => void
}

const PricingTax: React.FC<PricingTaxProps> = ({ data, onChange }) => {
  const handleInputChange = (field: keyof Product, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Purchase Price and Selling Price */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {data.itemType === "services" ? "Service Cost" : "Purchase Price"}
          </label>
          <input
            type="number"
            value={data.purchasePrice || ""}
            onChange={(e) => handleInputChange("purchasePrice", Number.parseFloat(e.target.value))}
            placeholder={`Enter ${data.itemType === "services" ? "Service Cost" : "Purchase Price"}`}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {data.itemType === "services" ? "Service Price" : "Selling Price"}
          </label>
          <input
            type="number"
            value={data.sellingPrice || ""}
            onChange={(e) => handleInputChange("sellingPrice", Number.parseFloat(e.target.value))}
            placeholder={`Enter ${data.itemType === "services" ? "Service Price" : "Selling Price"}`}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Wholesale Price / Bulk Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {data.itemType === "services" ? "Bulk Service Price" : "Wholesale Price / Bulk Price"}
        </label>
        <select
          value={data.wholesalePrice || ""}
          onChange={(e) => handleInputChange("wholesalePrice", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Discount Tier</option>
          <option value="tier1">Tier 1 - 10% off</option>
          <option value="tier2">Tier 2 - 15% off</option>
          <option value="tier3">Tier 3 - 20% off</option>
          <option value="tier4">Tier 4 - 25% off</option>
        </select>
      </div>

      {/* Quantity and Unit - Only for goods */}
      {data.itemType === "goods" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              value={data.quantity || ""}
              onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value))}
              placeholder="In No."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label>
            <select
              value={data.unit || ""}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Unit</option>
              <option value="piece">Piece</option>
              <option value="kg">Kilogram</option>
              <option value="liter">Liter</option>
              <option value="meter">Meter</option>
              <option value="box">Box</option>
              <option value="pack">Pack</option>
            </select>
          </div>
        </div>
      )}

      {/* Service Duration - Only for services */}
      {data.itemType === "services" && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h4 className="font-medium text-green-800 dark:text-green-300 mb-3">Service Pricing Details</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hourly Rate</label>
              <input
                type="number"
                placeholder="Rate per hour"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Charge</label>
              <input
                type="number"
                placeholder="Minimum service charge"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Discount Price and Discount Period */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Price</label>
          <select
            value={data.discountPrice || ""}
            onChange={(e) => handleInputChange("discountPrice", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Discount</option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Start Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount End Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Tax Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate</label>
        <select
          value={data.taxRate || ""}
          onChange={(e) => handleInputChange("taxRate", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Tax Rate</option>
          <option value="0">0% - Exempt</option>
          <option value="5">5% - Reduced Rate</option>
          <option value="12">12% - Standard Rate</option>
          <option value="18">18% - Standard Rate</option>
          <option value="28">28% - Luxury Rate</option>
        </select>
      </div>

      {/* HSN / SAC */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {data.itemType === "services" ? "SAC Code" : "HSN Code"}
        </label>
        <select
          value={data.hsnSac || ""}
          onChange={(e) => handleInputChange("hsnSac", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">{data.itemType === "services" ? "SAC Code" : "HSN Code"}</option>
          {data.itemType === "services" ? (
            <>
              <option value="998314">998314 - Business Support Services</option>
              <option value="998313">998313 - Technical Testing Services</option>
              <option value="998311">998311 - Maintenance Services</option>
              <option value="998312">998312 - Consulting Services</option>
            </>
          ) : (
            <>
              <option value="8517">8517 - Telephone sets</option>
              <option value="8471">8471 - Automatic data processing machines</option>
              <option value="6204">6204 - Women's suits, jackets</option>
              <option value="6203">6203 - Men's suits, jackets</option>
            </>
          )}
        </select>
      </div>

      {/* Price Include GST */}
      <div className="flex items-center space-x-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={data.priceIncludeGst || false}
            onChange={(e) => handleInputChange("priceIncludeGst", e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Price Include GST</span>
        </label>
      </div>

      {/* GST Rate */}
      {data.priceIncludeGst && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GST Rate</label>
          <select
            value={data.gstRate || ""}
            onChange={(e) => handleInputChange("gstRate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select GST Rate</option>
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>
      )}

      {/* Price Summary */}
      {(data.sellingPrice || data.purchasePrice) && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-3">Price Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.purchasePrice && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {data.itemType === "services" ? "Service Cost:" : "Purchase Price:"}
                </span>
                <span className="font-medium">₹{data.purchasePrice.toLocaleString()}</span>
              </div>
            )}
            {data.sellingPrice && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {data.itemType === "services" ? "Service Price:" : "Selling Price:"}
                </span>
                <span className="font-medium">₹{data.sellingPrice.toLocaleString()}</span>
              </div>
            )}
            {data.sellingPrice && data.purchasePrice && (
              <div className="flex justify-between col-span-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Profit Margin:</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  ₹{(data.sellingPrice - data.purchasePrice).toLocaleString()}(
                  {(((data.sellingPrice - data.purchasePrice) / data.purchasePrice) * 100).toFixed(1)}%)
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PricingTax
