"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import AddProduct from "./components/AddProduct"
import AuthModal from "./components/AuthModal"
import NotificationPanel from "./components/NotificationPanel"
import SettingsModal from "./components/SettingsModal"
import Header from "./components/Header"
import type { Product, Stock, Sale, Document } from "./types/product"
import { Package, TrendingUp, DollarSign, Warehouse, FileText, BarChart3, RefreshCcw } from "lucide-react"

// Sample data generator
const generateSampleData = () => {
  const sampleProducts: Product[] = [
    {
      id: "1",
      createdAt: new Date().toISOString(),
      itemType: "goods",
      name: "Premium Wireless Headphones",
      sku: "WH-001",
      barcode: "1234567890123",
      category: "electronics",
      subCategory: "accessories",
      brand: "apple",
      productType: "variant",
      supplier: "supplier1",
      warehouse: "warehouse-a",
      status: "returnable",
      purchasePrice: 8000,
      sellingPrice: 12000,
      initialStock: 50,
      description: "High-quality wireless headphones with noise cancellation and premium sound quality",
      keywords: ["wireless", "headphones", "premium", "noise cancellation"],
      variants: [
        { id: "v1", color: "Black", size: "", material: "", weight: "", sku: "WH-001-BLK", price: 12000, stock: 20 },
        { id: "v2", color: "White", size: "", material: "", weight: "", sku: "WH-001-WHT", price: 12000, stock: 15 },
        { id: "v3", color: "Silver", size: "", material: "", weight: "", sku: "WH-001-SLV", price: 12500, stock: 15 },
      ],
    },
    {
      id: "2",
      createdAt: new Date().toISOString(),
      itemType: "services",
      name: "Technical Consultation",
      sku: "SRV-001",
      category: "consulting",
      subCategory: "technical",
      productType: "simple",
      serviceType: "one-time",
      duration: 2,
      durationUnit: "hours",
      status: "returnable",
      sellingPrice: 2500,
      description: "Expert technical consultation for IT infrastructure and system optimization",
      keywords: ["consultation", "technical", "expert", "IT"],
    },
    {
      id: "3",
      createdAt: new Date().toISOString(),
      itemType: "goods",
      name: "Office Starter Bundle",
      sku: "BND-001",
      category: "electronics",
      productType: "bundle",
      status: "returnable",
      sellingPrice: 25000,
      description: "Complete office setup bundle with laptop accessories and peripherals",
      bundleItems: [
        { id: "b1", productId: "1", productName: "Premium Laptop Stand", quantity: 1, price: 2500 },
        { id: "b2", productId: "2", productName: "Wireless Mouse", quantity: 1, price: 1200 },
        { id: "b3", productId: "3", productName: "USB-C Hub", quantity: 1, price: 3500 },
        { id: "b4", productId: "4", productName: "Laptop Sleeve", quantity: 1, price: 800 },
      ],
    },
    {
      id: "4",
      createdAt: new Date().toISOString(),
      itemType: "goods",
      name: "Smartphone Case",
      sku: "ACC-001",
      category: "electronics",
      subCategory: "accessories",
      productType: "simple",
      status: "returnable",
      purchasePrice: 200,
      sellingPrice: 500,
      initialStock: 100,
      description: "Protective smartphone case with premium materials and shock absorption",
    },
    {
      id: "5",
      createdAt: new Date().toISOString(),
      itemType: "services",
      name: "Installation Service Package",
      sku: "SRV-PKG-001",
      category: "installation",
      productType: "bundle",
      serviceType: "project",
      status: "returnable",
      sellingPrice: 5000,
      description: "Complete installation service package with setup and training",
      bundleItems: [
        { id: "s1", productId: "s1", productName: "Installation Service", quantity: 1, price: 500 },
        { id: "s2", productId: "s2", productName: "Setup & Configuration", quantity: 1, price: 800 },
        { id: "s3", productId: "s3", productName: "Training Session", quantity: 1, price: 1500 },
        { id: "s4", productId: "s4", productName: "Technical Support", quantity: 1, price: 1000 },
      ],
    },
  ]

  return sampleProducts
}

// Dashboard Stats Component
const DashboardStats = ({ products, stocks, sales }: { products: Product[]; stocks: Stock[]; sales: Sale[] }) => {
  const totalProducts = products.length
  const lowStockItems = stocks.filter((s) => s.currentStock <= s.minStock).length
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalPrice, 0)
  const completedSales = sales.filter((s) => s.status === "completed").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProducts}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <Warehouse className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowStockItems}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalSales.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Orders</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedSales}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stocks View Component
const StocksView = ({ products, stocks }: { products: Product[]; stocks: Stock[] }) => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stock Management</h1>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total Items: <span className="font-medium">{stocks.length}</span>
        </div>
        <div className="text-sm text-red-600 dark:text-red-400">
          Low Stock: <span className="font-medium">{stocks.filter((s) => s.currentStock <= s.minStock).length}</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map((stock) => (
        <div
          key={stock.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">{stock.productName}</h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                stock.currentStock <= stock.minStock
                  ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  : stock.currentStock <= stock.minStock * 2
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              }`}
            >
              {stock.currentStock <= stock.minStock ? "Low Stock" : "In Stock"}
            </span>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Current Stock:</span>
              <span
                className={`font-medium ${
                  stock.currentStock <= stock.minStock
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {stock.currentStock}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Min Stock:</span>
              <span className="font-medium">{stock.minStock}</span>
            </div>
            <div className="flex justify-between">
              <span>Max Stock:</span>
              <span className="font-medium">{stock.maxStock}</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium">{stock.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span className="font-medium">{new Date(stock.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Sales View Component
const SalesView = ({ sales }: { sales: Sale[] }) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0)
  const completedSales = sales.filter((s) => s.status === "completed")
  const pendingSales = sales.filter((s) => s.status === "pending")

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Management</h1>
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-gray-600 dark:text-gray-400">
            Total Revenue:{" "}
            <span className="font-medium text-green-600 dark:text-green-400">₹{totalRevenue.toLocaleString()}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Pending: <span className="font-medium text-yellow-600 dark:text-yellow-400">{pendingSales.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {sale.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {sale.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{sale.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ₹{sale.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ₹{sale.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sale.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : sale.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Documents View Component
const DocumentsView = ({ documents }: { documents: Document[] }) => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Upload Document
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{doc.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{doc.type}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>Size: {(doc.size / 1024).toFixed(1)} KB</p>
            <p>Created: {new Date(doc.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Main App Content Component
const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard")
  const [products, setProducts] = useState<Product[]>([])
  const [stocks, setStocks] = useState<Stock[]>([])
  const [sales, setSales] = useState<Sale[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const { user, isAuthenticated, notifications, addNotification } = useAuth()

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("munc-inventory-products")
    const savedStocks = localStorage.getItem("munc-inventory-stocks")
    const savedSales = localStorage.getItem("munc-inventory-sales")
    const savedDocuments = localStorage.getItem("munc-inventory-documents")

    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        setProducts(parsedProducts)
      } catch (error) {
        console.error("Error loading products from localStorage:", error)
        // Load sample data if parsing fails
        const sampleProducts = generateSampleData()
        setProducts(sampleProducts)
        localStorage.setItem("munc-inventory-products", JSON.stringify(sampleProducts))
      }
    } else {
      // Load sample data if no saved products
      const sampleProducts = generateSampleData()
      setProducts(sampleProducts)
      localStorage.setItem("munc-inventory-products", JSON.stringify(sampleProducts))
    }

    // Generate stocks, sales, and documents if they don't exist
    if (!savedStocks) {
      const generatedStocks = generateSampleData().map((product: Product) => ({
        id: `stock-${product.id}`,
        productId: product.id!,
        productName: product.name,
        currentStock: product.initialStock || Math.floor(Math.random() * 100) + 10,
        minStock: Number.parseInt(product.reorderLevel || "10"),
        maxStock: (product.initialStock || 50) * 2,
        location: product.warehouse || "Main Warehouse - Delhi",
        lastUpdated: new Date().toISOString(),
        status: "in-stock" as const,
      }))
      setStocks(generatedStocks)
      localStorage.setItem("munc-inventory-stocks", JSON.stringify(generatedStocks))
    } else {
      try {
        setStocks(JSON.parse(savedStocks))
      } catch (error) {
        console.error("Error loading stocks:", error)
      }
    }

    if (!savedSales) {
      const sampleSales = generateSampleData()
        .slice(0, 8)
        .map((product: Product, index: number) => ({
          id: `sale-${Date.now()}-${index}`,
          productId: product.id!,
          productName: product.name,
          quantity: Math.floor(Math.random() * 5) + 1,
          unitPrice: product.sellingPrice || Math.floor(Math.random() * 1000) + 100,
          totalPrice:
            (product.sellingPrice || Math.floor(Math.random() * 1000) + 100) * (Math.floor(Math.random() * 5) + 1),
          customerName: `Customer ${index + 1}`,
          customerEmail: `customer${index + 1}@example.com`,
          saleDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: ["completed", "pending", "cancelled"][Math.floor(Math.random() * 3)] as
            | "completed"
            | "pending"
            | "cancelled",
          paymentMethod: "card",
        }))
      setSales(sampleSales)
      localStorage.setItem("munc-inventory-sales", JSON.stringify(sampleSales))
    } else {
      try {
        setSales(JSON.parse(savedSales))
      } catch (error) {
        console.error("Error loading sales:", error)
      }
    }

    if (!savedDocuments) {
      const sampleDocs = [
        {
          id: "doc-1",
          name: "Inventory Report Q4 2024",
          type: "report" as const,
          url: "/documents/inventory-q4.pdf",
          createdAt: new Date().toISOString(),
          size: 2048,
        },
        {
          id: "doc-2",
          name: "Sales Invoice #001",
          type: "invoice" as const,
          url: "/documents/invoice-001.pdf",
          createdAt: new Date().toISOString(),
          size: 1024,
        },
        {
          id: "doc-3",
          name: "Purchase Receipt #PR-001",
          type: "receipt" as const,
          url: "/documents/receipt-001.pdf",
          createdAt: new Date().toISOString(),
          size: 512,
        },
      ]
      setDocuments(sampleDocs)
      localStorage.setItem("munc-inventory-documents", JSON.stringify(sampleDocs))
    } else {
      try {
        setDocuments(JSON.parse(savedDocuments))
      } catch (error) {
        console.error("Error loading documents:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever data changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("munc-inventory-products", JSON.stringify(products))
    }
  }, [products])

  useEffect(() => {
    if (stocks.length > 0) {
      localStorage.setItem("munc-inventory-stocks", JSON.stringify(stocks))
    }
  }, [stocks])

  useEffect(() => {
    if (sales.length > 0) {
      localStorage.setItem("munc-inventory-sales", JSON.stringify(sales))
    }
  }, [sales])

  const handleAddProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    setProducts((prev) => [...prev, newProduct])

    // Create stock entry for new product
    const newStock: Stock = {
      id: `stock-${newProduct.id}`,
      productId: newProduct.id!,
      productName: newProduct.name,
      currentStock: newProduct.initialStock || 0,
      minStock: Number.parseInt(newProduct.reorderLevel || "10"),
      maxStock: (newProduct.initialStock || 0) * 2,
      location: newProduct.warehouse || "Main Warehouse - Delhi",
      lastUpdated: new Date().toISOString(),
      status: "in-stock",
    }

    setStocks((prev) => [...prev, newStock])
    setCurrentView("dashboard")

    addNotification({
      title: `${newProduct.itemType === "services" ? "Service" : "Product"} Added Successfully`,
      message: `${newProduct.name} has been added to your inventory.`,
      type: "success",
      read: false,
    })
  }

  const handleDeleteProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    setProducts((prev) => prev.filter((p) => p.id !== productId))
    setStocks((prev) => prev.filter((s) => s.productId !== productId))

    addNotification({
      title: `${product?.itemType === "services" ? "Service" : "Product"} Deleted`,
      message: `${product?.name || "Item"} has been removed from inventory.`,
      type: "info",
      read: false,
    })
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))

    addNotification({
      title: `${updatedProduct.itemType === "services" ? "Service" : "Product"} Updated`,
      message: `${updatedProduct.name} has been updated successfully.`,
      type: "success",
      read: false,
    })
  }

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">MUN-C</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Inventory Management System</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to access your inventory management dashboard and start managing your products efficiently.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setAuthMode("login")
                  setShowAuthModal(true)
                }}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md"
              >
                Sign In to Dashboard
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup")
                  setShowAuthModal(true)
                }}
                className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onAddProduct={() => setCurrentView("add-product")}
          onShowNotifications={() => setShowNotifications(true)}
          onShowSettings={() => setShowSettings(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {currentView === "dashboard" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back, {user?.name}! Here's your inventory overview.
                  </p>
                </div>
              </div>

              <DashboardStats products={products} stocks={stocks} sales={sales} />

              <Dashboard
                products={searchTerm ? filteredProducts : products}
                onAddProduct={() => setCurrentView("add-product")}
                onMenuClick={() => setSidebarOpen(true)}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            </div>
          )}
          {currentView === "add-product" && (
            <AddProduct
              onSave={handleAddProduct}
              onCancel={() => setCurrentView("dashboard")}
              onMenuClick={() => setSidebarOpen(true)}
            />
          )}
          {currentView === "stocks" && <StocksView products={products} stocks={stocks} />}
          {currentView === "sales" && <SalesView sales={sales} />}
          {currentView === "documents" && <DocumentsView documents={documents} />}
          {(currentView === "return-audit" || currentView === "report" || currentView === "notifications") && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentView === "return-audit"
                  ? "Return & Audit"
                  : currentView === "report"
                    ? "Reports"
                    : "Notifications"}
              </h1>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {currentView === "return-audit" ? (
                    <RefreshCcw className="w-8 h-8 text-gray-400" />
                  ) : currentView === "report" ? (
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  ) : (
                    <Package className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {currentView === "return-audit"
                    ? "Return & Audit Management"
                    : currentView === "report"
                      ? "Advanced Reports"
                      : "Notification Center"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This section is under development. Advanced features coming soon!
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Request Feature
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
