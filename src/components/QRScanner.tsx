"use client"

import type React from "react"
import { useState } from "react"
import { X, Camera, Upload, RotateCcw } from "lucide-react"

interface QRScannerProps {
  onScan: (result: string) => void
  onClose: () => void
  title: string
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose, title }) => {
  const [manualCode, setManualCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateRandomCode = async () => {
    setIsGenerating(true)
    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const codeType = title.toLowerCase().includes("ean") ? "ean" : "barcode"
    let code = ""

    if (codeType === "ean") {
      // Generate 13-digit EAN code
      code = Math.floor(Math.random() * 9000000000000 + 1000000000000).toString()
    } else {
      // Generate 12-digit barcode
      code = Math.floor(Math.random() * 900000000000 + 100000000000).toString()
    }

    setIsGenerating(false)
    onScan(code)
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualCode.trim()) {
      onScan(manualCode.trim())
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate QR code scanning from image
      const simulatedCode = Math.floor(Math.random() * 1000000000000).toString()
      onScan(simulatedCode)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Camera Simulation */}
          <div className="relative">
            <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">Camera not available in demo</p>
                <p className="text-gray-400 text-xs">Use manual entry or generate code</p>
              </div>
            </div>
          </div>

          {/* Manual Entry */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Code Manually
              </label>
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder={title.toLowerCase().includes("ean") ? "Enter 13-digit EAN code" : "Enter barcode"}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={!manualCode.trim()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Use This Code
            </button>
          </form>

          {/* File Upload */}
          <div>
            <label className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Upload QR Code Image
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Generate Random Code */}
          <button
            onClick={generateRandomCode}
            disabled={isGenerating}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Generate Random {title.toLowerCase().includes("ean") ? "EAN" : "Barcode"}
              </>
            )}
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRScanner
