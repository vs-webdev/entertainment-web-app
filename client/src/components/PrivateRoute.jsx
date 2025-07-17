import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = ({children}) => {
  const {isLoggedIn} = useAuth()
  
  return isLoggedIn ? children : <Navigate to="/auth" replace />
}

export default PrivateRoute
