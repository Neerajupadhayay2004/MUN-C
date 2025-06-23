"use client"

import type React from "react"
import { X, Moon, Sun, User, Bell, Database } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, theme, toggleTheme } = useAuth()

  if (!isOpen) return null

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* Theme Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Appearance</h3>
            <div className="space-y-2">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {theme === "light" ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-500" />
                  )}
                  <span className="text-gray-900 dark:text-white">
                    {theme === "light" ? "Light Mode" : "Dark Mode"}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Click to toggle</span>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Notifications</h3>
            <div className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Push Notifications</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Data Management */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Data Management</h3>
            <button
              onClick={clearAllData}
              className="w-full flex items-center justify-center space-x-2 p-3 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Database className="w-5 h-5" />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
