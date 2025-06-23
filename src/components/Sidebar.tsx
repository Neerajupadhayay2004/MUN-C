"use client"

import type React from "react"
import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  Plus,
  Warehouse,
  ShoppingCart,
  FileText,
  RefreshCw,
  BarChart3,
  X,
  Settings,
  Bell,
  User,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface SidebarProps {
  currentView: string
  setCurrentView: (view: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout, theme, toggleTheme, notifications } = useAuth()

  const menuItems = [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, view: "dashboard" }]

  const inventoryItems = [
    { id: "add-product", label: "Add Product", icon: Plus, view: "add-product" },
    { id: "products", label: "All Products", icon: Package, view: "dashboard" },
  ]

  const otherItems = [
    { id: "stocks", label: "Stocks", icon: Warehouse, view: "stocks" },
    { id: "sales", label: "Sales", icon: ShoppingCart, view: "sales" },
    { id: "documents", label: "Documents", icon: FileText, view: "documents" },
    { id: "return-audit", label: "Return & Audit", icon: RefreshCw, view: "return-audit" },
    { id: "report", label: "Report", icon: BarChart3, view: "report" },
    { id: "notifications", label: "Notifications", icon: Bell, view: "notifications" },
  ]

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">MUN-C</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      toggleTheme()
                      setShowUserMenu(false)
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {theme === "light" ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView("settings")
                      setShowUserMenu(false)
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
          {/* Main Dashboard */}
          <div>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.view)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.view
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Inventory Section */}
          <div>
            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/50 rounded-lg mb-2">
              <Package className="w-5 h-5 mr-3 text-blue-700 dark:text-blue-400" />
              Inventory
            </div>
            <div className="ml-6 space-y-1">
              {inventoryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.view)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === item.view && item.view === "add-product"
                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Other Sections */}
          <div className="space-y-1">
            {otherItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.view)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.view
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
                {item.id === "notifications" && unreadNotifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
