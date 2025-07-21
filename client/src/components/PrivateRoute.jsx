import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"
import { useEffect } from "react"

const PrivateRoute = ({children}) => {
  const {isLoggedIn} = useAuth()

  useEffect(() => {
    if (!isLoggedIn) toast.error('Log In to access Bookmarks')
  }, [isLoggedIn])
  
  return isLoggedIn ? children : <Navigate to="/auth" replace />
}

export default PrivateRoute
