"use client"

import type React from "react"
import { useState } from "react"
import { ImageIcon, X, Sparkles } from "lucide-react"
import type { Product } from "../../types/product"

interface DescriptionMediaProps {
  data: Partial<Product>
  onChange: (data: Partial<Product>) => void
}

const DescriptionMedia: React.FC<DescriptionMediaProps> = ({ data, onChange }) => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(data.keywords || [])

  const handleInputChange = (field: keyof Product, value: any) => {
    onChange({ [field]: value })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file))
    onChange({ images: [...(data.images || []), ...imageUrls] })
  }

  const removeImage = (index: number) => {
    const newImages = [...(data.images || [])]
    newImages.splice(index, 1)
    onChange({ images: newImages })
  }

  const getSuggestedKeywords = () => {
    if (data.itemType === "services") {
      return [
        "Professional Services",
        "Consultation",
        "Expert Support",
        "Quality Service",
        "Reliable",
        "Experienced",
        "Certified",
        "On-time Delivery",
      ]
    }
    return [
      "High Quality",
      "Durable",
      "Premium",
      "Best Price",
      "Fast Delivery",
      "Warranty",
      "Genuine Product",
      "Top Brand",
    ]
  }

  const addKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      const newKeywords = [...selectedKeywords, keyword]
      setSelectedKeywords(newKeywords)
      onChange({ keywords: newKeywords })
    }
  }

  const removeKeyword = (keyword: string) => {
    const newKeywords = selectedKeywords.filter((k) => k !== keyword)
    setSelectedKeywords(newKeywords)
    onChange({ keywords: newKeywords })
  }

  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {data.itemType === "services" ? "Service Description" : "Product Description"}
        </label>
        <textarea
          value={data.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder={`Add more details about your ${data.itemType === "services" ? "service" : "product"}`}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          {data.itemType === "services" ? "Service Images" : "Product Images"}
        </label>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                <span className="font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                  Drag your image here, or browse
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Supports: JPEG, PNG, JPG (Max 5MB each)</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Image Preview */}
        {data.images && data.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {data.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${data.itemType === "services" ? "Service" : "Product"} ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEO Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Meta Title</label>
          <input
            type="text"
            value={data.seoTitle || ""}
            onChange={(e) => handleInputChange("seoTitle", e.target.value)}
            placeholder="Add SEO Title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SEO Meta Description
          </label>
          <input
            type="text"
            value={data.seoDescription || ""}
            onChange={(e) => handleInputChange("seoDescription", e.target.value)}
            placeholder="Meta Description"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* AI Keywords */}
      <div>
        <div className="flex items-center mb-4">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Keywords</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Based on your {data.itemType === "services" ? "service" : "product"} data, we've identified{" "}
          <span className="font-medium">{getSuggestedKeywords().length} keywords</span> that may be a good fit.
        </p>

        {/* Selected Keywords */}
        {selectedKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center hover:bg-blue-300 dark:hover:bg-blue-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Suggested Keywords */}
        <div className="flex flex-wrap gap-2">
          {getSuggestedKeywords().map((keyword) => (
            <button
              key={keyword}
              onClick={() => addKeyword(keyword)}
              disabled={selectedKeywords.includes(keyword)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedKeywords.includes(keyword)
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* Content Preview */}
      {(data.description || data.seoTitle) && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Content Preview</h4>
          {data.seoTitle && (
            <div className="mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Title: </span>
              <span className="text-sm font-medium">{data.seoTitle}</span>
            </div>
          )}
          {data.description && (
            <div className="mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Description: </span>
              <span className="text-sm">
                {data.description.substring(0, 150)}
                {data.description.length > 150 ? "..." : ""}
              </span>
            </div>
          )}
          {selectedKeywords.length > 0 && (
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Keywords: </span>
              <span className="text-sm">{selectedKeywords.join(", ")}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DescriptionMedia
