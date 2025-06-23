"use client"

import type React from "react"
import { Bell, X, Check, Trash2, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearNotifications } = useAuth()

  if (!isOpen) return null

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getNotificationBg = (type: string, read: boolean) => {
    if (read) return "bg-white dark:bg-gray-800"

    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20"
      case "error":
        return "bg-red-50 dark:bg-red-900/20"
      default:
        return "bg-blue-50 dark:bg-blue-900/20"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end pt-16 pr-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-96 max-h-96 overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
              )}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${getNotificationBg(notification.type, notification.read)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getNotificationIcon(notification.type)}
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-400">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors ml-2"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationPanel
