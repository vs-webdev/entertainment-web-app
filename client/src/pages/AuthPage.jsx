import { useState } from "react";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  
  const submitHandler = (e) => {
    e.preventdefault()
  }

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: ''
  })

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-slate-900 flex flex-col items-center justify-center p-10 rounded-lg shadow-lg w-full  sm:w-160 text-indigo-300 text-m">
          <div className="w-full">
            <h2 className="text-4xl font-semibold text-white text-center mb-3">
              {isRegister ? 'Create  account' : 'Login'}
            </h2>
            <p className="text-center text-md mb-8">
              {isRegister ? 'Create your account' : 'Login to your account!'}
            </p>
            <form onSubmit={submitHandler}>
              {isRegister && (
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                  <input onChange={(e) => setUserData(prev => ({...prev, userName: e.target.value}))} value={userData.name} className="bg-transparent outline-none" type="text" placeholder="Full Name"  />
                </div>
              )}
              <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <input onChange={(e) => setUserData(prev => ({...prev, email: e.target.value}))} value={userData.email} className="bg-transparent outline-none" type="email" placeholder="Email"  />
              </div>
              <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <input onChange={(e) => setUserData(prev => ({...prev, password: e.target.value}))} value={userData.password}  className="bg-transparent outline-none" type="password" placeholder="Password"  />
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
