import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"
import { useEffect } from "react"

const PrivateRoute = ({children}) => {
  const {isLoggedIn, isAuthLoading} = useAuth()
  
  useEffect(() => {
    if (!isLoggedIn) toast.error('Log In to access Bookmarks')
  }, [isLoggedIn])
  
  return (!isAuthLoading && isLoggedIn) ? children : <Navigate to="/auth" replace />
}

export default PrivateRoute
