import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const {API_BASE_URL, setIsLoggedIn, isLoggedIn} = useAuth()
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: ''
  })
  
  const submitHandler = async (e) => {
    e.preventDefault()

    if (isRegister){
      console.log('Not Registered')
      const payload = {
        username: userData.userName.trim(),
        email: userData.email.trim(),
        password: userData.password.trim()
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      console.log('register', data)

    } else {
      console.log('Registered. Now logging in')
      const payload = {
        email: userData.email.trim(),
        password: userData.password.trim(),
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      console.log('login', data)
      if (data?.success){
        navigate(-1)
      }
      setIsLoggedIn(true)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      const result = await response.json()
      if (result.success){
        toast.success("Successfully Logged Out!")
        setIsLoggedIn(false)
        navigate('/')
      }
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }

  if (isLoggedIn){
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

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-slate-900 flex flex-col items-center justify-center p-10 rounded-lg shadow-lg w-full  sm:w-160 text-indigo-300 text-m">
          <div className="w-full">
            <h2 className="text-4xl font-semibold text-white text-center mb-3">
              {isRegister ? 'Create account' : 'Login'}
            </h2>
            <p className="text-center text-md mb-8">
              {isRegister ? 'Create your account' : 'Login to your account!'}
            </p>
            <form onSubmit={submitHandler}>
              {isRegister && (
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                  <input  
                    onChange={(e) => setUserData(prev => ({...prev, userName: e.target.value}))} 
                    value={userData.name} 
                    className="bg-transparent outline-none h-full w-full" 
                    placeholder="Name"  
                    type="text" 
                  />
                </div>
              )}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <input 
                  onChange={(e) => setUserData(prev => ({...prev, email: e.target.value}))} 
                  value={userData.email} 
                  className="bg-transparent outline-none h-full w-full" 
                  placeholder="Email"  
                  type="email"
                />
              </div>
              <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <input 
                  onChange={(e) => setUserData(prev => ({...prev, password: e.target.value}))} 
                  value={userData.password}  
                  className="bg-transparent outline-none h-full w-full" 
                  placeholder="Password"  
                  type="password" 
                />
              </div>
              <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">{isRegister ? 'Sign Up' : 'Login'}</button>
            </form>
            {isRegister ? (
              <p className="text-gray-400 text-center text-md mt-8">
              Already have an account?{' '}
              <span onClick={() => setIsRegister(false)} className="text-blue-400 cursor-pointer underline">Login here</span>
            </p>
            ) : (
              <p className="text-gray-400 text-center text-md mt-6">
                Don't have an account?{' '}
                <span onClick={() => setIsRegister(true)} className="text-blue-400 cursor-pointer underline">Sign Up</span>
              </p>
            )}
          </div>
      </div>
    </div>
  )
}

export default AuthPage
