export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "manager" | "user"
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  theme: "light" | "dark"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}
