import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../api/auth";

const AuthPage = () => {
  const [isUserRegister, setIsUserRegister] = useState(false);
  const {setIsLoggedIn} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: ''
  })
  
  const submitHandler = async (e) => {
    e.preventDefault()
    const payload = {
      username: userData.userName.trim(),
      email: userData.email.trim(),
      password: userData.password.trim()
    }

    if (isUserRegister){
      try {
        const registration = await registerUser(payload)
        if (registration.success){
          toast.success("User successfully registered!")
          setIsUserRegister(false)
        }
      } catch (error) {
        toast.error("User could not sign up")
      }

    } else {
      const result = await loginUser({email: payload.email, password: payload.password})
      console.log('login', result)
      if (result?.success){
        navigate(from, {replace: true})
        setIsLoggedIn(true)
        const bookmarkData = await fetchBookmarkedMedia()
        setBookmarkMedia(bookmarkData?.bookmarks || []);
      } else {
        toast.error("Login failed")
        setIsLoggedIn(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-slate-900 flex flex-col items-center justify-center p-10 rounded-lg shadow-lg w-full  sm:w-160 text-indigo-300 text-m">
          <div className="w-full">
            <h2 className="text-4xl font-semibold text-white text-center mb-3">
              {isUserRegister ? 'Create account' : 'Login'}
            </h2>
            <p className="text-center text-md mb-8">
              {isUserRegister ? 'Create your account' : 'Login to your account!'}
            </p>
            <form onSubmit={submitHandler}>
              {isUserRegister && (
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-1.5 rounded-full bg-[#333A5C]">
                  <input  
                    onChange={(e) => setUserData(prev => ({...prev, userName: e.target.value}))} 
                    value={userData.name} 
                    className="bg-transparent outline-none h-8 w-full" 
                    placeholder="Name"  
                    type="text" 
                  />
                </div>
              )}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-1.5 rounded-full bg-[#333A5C]">
                <input 
                  onChange={(e) => setUserData(prev => ({...prev, email: e.target.value}))} 
                  value={userData.email} 
                  className="bg-transparent outline-none h-8 w-full" 
                  placeholder="Email"  
                  type="email"
                />
              </div>
              <div className="mb-6 flex items-center gap-3 w-full px-5 py-1.5 rounded-full bg-[#333A5C]">
                <input 
                  onChange={(e) => setUserData(prev => ({...prev, password: e.target.value}))} 
                  value={userData.password}  
                  className="bg-transparent outline-none h-8 w-full" 
                  placeholder="Password"  
                  type="password" 
                />
              </div>
              <button className="w-full py-2 rounded-full bg-red-500 text-lg text-white font-medium cursor-pointer hover:bg-gray-100 hover:text-slate-900">
                {isUserRegister ? 'Sign Up' : 'Login'}
              </button>
            </form>
            {isUserRegister ? (
              <p className="text-gray-400 text-center text-md mt-8">
              Already have an account?{' '}
              <span onClick={() => setIsUserRegister(false)} className="text-blue-400 cursor-pointer underline">Login here</span>
            </p>
            ) : (
              <p className="text-gray-400 text-center text-md mt-6">
                Don't have an account?{' '}
                <span onClick={() => setIsUserRegister(true)} className="text-blue-400 cursor-pointer underline">Sign Up</span>
              </p>
            )}
          </div>
      </div>
    </div>
  )
}

export default AuthPage
