"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Menu, CheckCircle } from "lucide-react"
import type { Product } from "../types/product"
import StepIndicator from "./StepIndicator"
import GeneralInformation from "./form-steps/GeneralInformation"
import PricingTax from "./form-steps/PricingTax"
import DescriptionMedia from "./form-steps/DescriptionMedia"
import Variants from "./form-steps/Variants"

interface AddProductProps {
  onSave: (product: Product) => void
  onCancel: () => void
  onMenuClick: () => void
}

const AddProduct: React.FC<AddProductProps> = ({ onSave, onCancel, onMenuClick }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({
    itemType: "goods",
    productType: "simple",
    status: "returnable",
    priceIncludeGst: false,
    keywords: [],
    variants: [],
    bundleItems: [],
  })

  const steps = [
    { id: 1, title: "General Information", subtitle: "Basic Info • Category • Supplier • Inventory • Product Type" },
    { id: 2, title: "Pricing & Tax", subtitle: "All price and tax-related information" },
    { id: 3, title: "Description & Media", subtitle: "Images • Description • Documents • SEO" },
    { id: 4, title: "Variants", subtitle: "Product Type and Variants Configuration" },
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // Generate unique ID and timestamp
    const productToSave = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    } as Product

    onSave(productToSave)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onCancel()
    }, 2000)
  }

  const handleSaveAsDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("munc-product-drafts") || "[]")
    const draftProduct = {
      ...formData,
      id: Date.now().toString(),
      isDraft: true,
      createdAt: new Date().toISOString(),
    }
    drafts.push(draftProduct)
    localStorage.setItem("munc-product-drafts", JSON.stringify(drafts))
    alert("Product saved as draft successfully!")
  }

  const updateFormData = (data: Partial<Product>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const isFormValid = () => {
    return formData.name && formData.sku && formData.category
  }

  if (showSuccess) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {formData.itemType === "services" ? "Service" : "Product"} Added Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The {formData.itemType === "services" ? "service" : "product"} has been successfully added to your
            inventory.
          </p>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + Add More {formData.itemType === "services" ? "Services" : "Products"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <button onClick={onCancel} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Add New {formData.itemType === "services" ? "Service" : "Product"}
          </h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-8">
            {currentStep === 1 && <GeneralInformation data={formData} onChange={updateFormData} />}
            {currentStep === 2 && <PricingTax data={formData} onChange={updateFormData} />}
            {currentStep === 3 && <DescriptionMedia data={formData} onChange={updateFormData} />}
            {currentStep === 4 && <Variants data={formData} onChange={updateFormData} />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="w-full sm:w-auto px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={handleSaveAsDraft}
              className="w-full sm:w-auto px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Save as draft
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                disabled={!isFormValid()}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!isFormValid()}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save {formData.itemType === "services" ? "Service" : "Product"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
