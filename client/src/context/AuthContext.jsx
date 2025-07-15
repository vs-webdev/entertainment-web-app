import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context){
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
};

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const value = {
    isLoggedIn, setIsLoggedIn,
    API_BASE_URL,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}