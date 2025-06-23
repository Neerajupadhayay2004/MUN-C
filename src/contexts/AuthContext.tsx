"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthState, Notification } from "../types/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  toggleTheme: () => void
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void
  markNotificationAsRead: (id: string) => void
  clearNotifications: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    theme: "light",
  })
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setNotifications((prev) => [...prev, newNotification])
    localStorage.setItem("munc-notifications", JSON.stringify([...notifications, newNotification]))
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    localStorage.setItem("munc-notifications", JSON.stringify(notifications))
  }

  const clearNotifications = () => {
    setNotifications([])
    localStorage.removeItem("munc-notifications")
  }

  useEffect(() => {
    // Load auth state from localStorage
    const savedAuth = localStorage.getItem("munc-auth-state")
    const savedTheme = localStorage.getItem("munc-theme") || "light"
    const savedNotifications = localStorage.getItem("munc-notifications")

    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth)
        setAuthState((prev) => ({ ...prev, ...parsedAuth, theme: savedTheme as "light" | "dark" }))
      } catch (error) {
        console.error("Error loading auth state:", error)
      }
    } else {
      setAuthState((prev) => ({ ...prev, theme: savedTheme as "light" | "dark" }))
    }

    // Apply theme immediately
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications))
      } catch (error) {
        console.error("Error loading notifications:", error)
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (email && password) {
      const user: User = {
        id: "1",
        name: email.split("@")[0] || "User",
        email,
        role: "admin",
        createdAt: new Date().toISOString(),
      }

      const newAuthState = { ...authState, user, isAuthenticated: true }
      setAuthState(newAuthState)
      localStorage.setItem("munc-auth-state", JSON.stringify(newAuthState))

      addNotification({
        title: "Welcome back!",
        message: "You have successfully logged in to MUN-C.",
        type: "success",
        read: false,
      })

      return true
    }
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (name && email && password) {
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
        createdAt: new Date().toISOString(),
      }

      const newAuthState = { ...authState, user, isAuthenticated: true }
      setAuthState(newAuthState)
      localStorage.setItem("munc-auth-state", JSON.stringify(newAuthState))

      addNotification({
        title: "Account created!",
        message: "Welcome to MUN-C Inventory Management System.",
        type: "success",
        read: false,
      })

      return true
    }
    return false
  }

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false, theme: authState.theme })
    localStorage.removeItem("munc-auth-state")
    addNotification({
      title: "Logged out",
      message: "You have been successfully logged out.",
      type: "info",
      read: false,
    })
  }

  const toggleTheme = () => {
    const newTheme = authState.theme === "light" ? "dark" : "light"
    setAuthState((prev) => ({ ...prev, theme: newTheme }))
    localStorage.setItem("munc-theme", newTheme)

    // Apply theme immediately with proper DOM manipulation
    const htmlElement = document.documentElement
    if (newTheme === "dark") {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }

    // Force a re-render by triggering a small DOM change
    document.body.style.transition = "background-color 0.3s ease"

    // Add notification for theme change
    addNotification({
      title: "Theme Changed",
      message: `Switched to ${newTheme} mode successfully.`,
      type: "info",
      read: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        toggleTheme,
        notifications,
        addNotification,
        markNotificationAsRead,
        clearNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
