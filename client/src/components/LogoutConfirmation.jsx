import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { logout } from "../api/auth"
import { useAuth } from "../context/AuthContext"

const LogoutConfirmation = () => {
  const navigate = useNavigate()
  const {setIsLoggedIn} = useAuth()

  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result.success){
        toast.success("Successfully Logged Out!")
        setIsLoggedIn(false)
        navigate('/')
      }
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-slate-900 flex flex-col items-center justify-center p-8 rounded-lg shadow-lg w-full  sm:w-160 text-indigo-300 text-m">
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-white text-center mb-3">
            Log Out
          </h2>
          <p className="mb-8 text-lg">Are you sure you want to Log Out ?</p>
          <div className="w-full flex">
            <button onClick={() => navigate(-1)} className="w-full border py-1 mr-4 text-lg hover:bg-red-100 hover:text-neutral-900 cursor-pointer">
              Cancel
            </button>
            <button onClick={handleLogout} className="w-full border-red-500 py-1 text-lg bg-red-500 hover:bg-red-600 hover:text-neutral-100 cursor-pointer">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirmation
