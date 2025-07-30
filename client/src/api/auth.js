
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  return await response.json()
}

export const loginUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload)
  })
  return await response.json()
}

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  })
  return await response.json()
}