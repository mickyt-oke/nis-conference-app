/**
 * Unit tests for app/login/actions.ts
 * These tests require jest and @testing-library/jest-dom @types to be installed.
 */

import '@testing-library/jest-dom'
import { loginAction, logoutUser, getCurrentUser, checkAuth, requireAuth, requireRole } from './actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

describe('loginAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return error if email or password is missing', async () => {
    const result = await loginAction(new FormData())
    expect(result.success).toBe(false)
    expect(result.message).toBe('Please provide both email and password')
  })

  it('should return success and set cookies on valid login', async () => {
    const mockToken = 'mock-token'
    const mockUser = { id: '1', email: 'user@nis.gov.ng', name: 'User', role: 'user' }
    const mockJsonResponse = { token: mockToken, user: mockUser }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockJsonResponse),
    })

    const setMock = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      set: setMock,
    })

    const formData = new FormData()
    formData.append('email', mockUser.email)
    formData.append('password', 'password123')

    const result = await loginAction(formData)

    expect(result.success).toBe(true)
    expect(result.user).toEqual(mockUser)
    expect(setMock).toHaveBeenCalledTimes(2)
    expect(result.redirectTo).toBe('/dashboard')
  })

  it('should return error message on failed login', async () => {
    const mockErrorMsg = 'Invalid credentials'
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: mockErrorMsg }),
    })

    const formData = new FormData()
    formData.append('email', 'fail@user.com')
    formData.append('password', 'wrongpass')

    const result = await loginAction(formData)
    expect(result.success).toBe(false)
    expect(result.message).toBe(mockErrorMsg)
  })
})

describe('logoutUser', () => {
  it('should delete cookies and redirect to login', async () => {
    const deleteMock = jest.fn()
    ;(cookies as jest.Mock).mockReturnValue({
      delete: deleteMock,
    })

    await logoutUser()

    expect(deleteMock).toHaveBeenCalledWith('auth_token')
    expect(deleteMock).toHaveBeenCalledWith('user_data')
    expect(redirect).toHaveBeenCalledWith('/login')
  })
})

describe('getCurrentUser and checkAuth', () => {
  it('should return user when cookie exists', async () => {
    const user = { id: '1', email: 'user@nis.gov.ng', name: 'User', role: 'user' }
    ;(cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: JSON.stringify(user) }),
    })

    const result = await getCurrentUser()
    expect(result).toEqual(user)

    const authCheck = await checkAuth()
    expect(authCheck).toBe(true)
  })

  it('should return null when no user cookie', async () => {
    ;(cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    })

    const result = await getCurrentUser()
    expect(result).toBeNull()

    const authCheck = await checkAuth()
    expect(authCheck).toBe(false)
  })
})

describe('requireAuth and requireRole', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should redirect to login if not authenticated', async () => {
    ;(cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    })
    await requireAuth()
    expect(redirect).toHaveBeenCalledWith('/login')
  })

  it('should not redirect if authenticated', async () => {
    const user = { id: '1', email: 'email@test.com', name: 'Name', role: 'user' }
    ;(cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: JSON.stringify(user) }),
    })

    await requireAuth()
    expect(redirect).not.toHaveBeenCalled()
  })

  it('should redirect to unauthorized if role mismatch', async () => {
    const user = { id: '1', email: 'email@test.com', name: 'Name', role: 'user' }
    ;(cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: JSON.stringify(user) }),
    })

    await requireRole('admin')
    expect(redirect).toHaveBeenCalledWith('/unauthorized')
  })

  it('should not redirect if role matches', async () => {
    const user = { id: '1', email: 'email@test.com', name: 'Name', role: 'admin' }
    ;(cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: JSON.stringify(user) }),
    })

    await requireRole('admin')
    expect(redirect).not.toHaveBeenCalled()
  })
})
