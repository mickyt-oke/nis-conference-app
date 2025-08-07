// Import the api module
import api from "./api"

class AuthManager {
  constructor() {
    this.user = null
    this.isAuthenticated = false
    this.init()
  }

  async init() {
    const token = localStorage.getItem("auth_token")
    if (token) {
      try {
        const response = await api.getUser()
        if (response.success) {
          this.user = response.data
          this.isAuthenticated = true
        }
      } catch (error) {
        console.error("Auth initialization failed:", error)
        this.logout()
      }
    }
  }

  async login(credentials) {
    try {
      const response = await api.login(credentials)
      if (response.success) {
        this.user = response.data.user
        this.isAuthenticated = true
        this.redirectAfterLogin()
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  async logout() {
    try {
      await api.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      this.user = null
      this.isAuthenticated = false
      window.location.href = "/login.html"
    }
  }

  redirectAfterLogin() {
    const redirectUrl = sessionStorage.getItem("redirect_after_login") || "/dashboard.html"
    sessionStorage.removeItem("redirect_after_login")
    window.location.href = redirectUrl
  }

  requireAuth() {
    if (!this.isAuthenticated) {
      sessionStorage.setItem("redirect_after_login", window.location.pathname)
      window.location.href = "/login.html"
      return false
    }
    return true
  }

  hasRole(role) {
    return this.user && this.user.role === role
  }

  hasAnyRole(roles) {
    return this.user && roles.includes(this.user.role)
  }

  requireRole(role) {
    if (!this.requireAuth()) return false

    if (!this.hasRole(role)) {
      window.location.href = "/unauthorized.html"
      return false
    }
    return true
  }

  requireAnyRole(roles) {
    if (!this.requireAuth()) return false

    if (!this.hasAnyRole(roles)) {
      window.location.href = "/unauthorized.html"
      return false
    }
    return true
  }
}

// Create global instance
const auth = new AuthManager()
