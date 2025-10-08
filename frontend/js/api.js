class ApiService {
  constructor() {
    this.baseURL = "http://localhost:8000/api"
    this.token = localStorage.getItem("auth_token")
  }

  // Set authorization header
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  // Set token
  setToken(token) {
    this.token = token
    localStorage.setItem("auth_token", token)
  }

  // Remove token
  removeToken() {
    this.token = null
    localStorage.removeItem("auth_token")
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Request failed")
      }

      return data
    } catch (error) {
      console.error("API Request Error:", error)
      throw error
    }
  }

  // Auth methods
  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.success) {
      this.setToken(response.data.token)
    }

    return response
  }

  async logout() {
    try {
      await this.request("/auth/logout", { method: "POST" })
    } finally {
      this.removeToken()
    }
  }

  async getUser() {
    return await this.request("/auth/me")
  }

  async refreshToken() {
    const response = await this.request("/auth/refresh", { method: "POST" })
    if (response.success) {
      this.setToken(response.data.token)
    }
    return response
  }

  // Conference methods
  async getConferences() {
    return await this.request("/conferences")
  }

  async getConference(id) {
    return await this.request(`/conferences/${id}`)
  }

  async getUpcomingConferences() {
    return await this.request("/conferences/upcoming")
  }

  async createConference(data) {
    return await this.request("/conferences", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateConference(id, data) {
    return await this.request(`/conferences/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteConference(id) {
    return await this.request(`/conferences/${id}`, {
      method: "DELETE",
    })
  }

  // Registration methods
  async getRegistrations(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return await this.request(`/registrations?${queryString}`)
  }

  async getRegistration(id) {
    return await this.request(`/registrations/${id}`)
  }

  async createRegistration(data) {
    return await this.request("/registrations", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async approveRegistration(id, comments = "") {
    return await this.request(`/registrations/${id}/approve`, {
      method: "POST",
      body: JSON.stringify({ comments }),
    })
  }

  async rejectRegistration(id, comments) {
    return await this.request(`/registrations/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ comments }),
    })
  }

  // Speaker methods
  async getSpeakers() {
    return await this.request("/speakers")
  }

  async getSpeaker(id) {
    return await this.request(`/speakers/${id}`)
  }

  async createSpeaker(data) {
    return await this.request("/speakers", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateSpeaker(id, data) {
    return await this.request(`/speakers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteSpeaker(id) {
    return await this.request(`/speakers/${id}`, {
      method: "DELETE",
    })
  }

  // Document methods
  async getDocuments(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return await this.request(`/documents?${queryString}`)
  }

  async getDocument(id) {
    return await this.request(`/documents/${id}`)
  }

  async uploadDocument(formData) {
    const url = `${this.baseURL}/documents`
    const headers = {}

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    })

    return await response.json()
  }

  async updateDocument(id, data) {
    return await this.request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteDocument(id) {
    return await this.request(`/documents/${id}`, {
      method: "DELETE",
    })
  }

  getDocumentDownloadUrl(id) {
    return `${this.baseURL}/documents/${id}/download`
  }
}

// Create global instance
const api = new ApiService()

// Export for use in modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ApiService
}
