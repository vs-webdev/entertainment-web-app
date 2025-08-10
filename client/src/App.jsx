import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavSidebar from './components/NavSidebar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import Bookmarked from './pages/Bookmarked'
import AuthPage from './pages/AuthPage'
import PrivateRoute from './components/PrivateRoute'
import {ToastContainer} from 'react-toastify'
import { useAuth } from './context/AuthContext'
import LogoutConfirmation from './components/LogoutConfirmation'

function App() {
  const {isLoggedIn, isAuthLoading} = useAuth()

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-3xl text-indigo-400">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className='w-full h-full lg:flex gap-6'>
        <NavSidebar />
        <main className='h-full pt-6 w-full overflow-y-auto'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movies' element={<Movies />}/>
              <Route path='/tvseries' element={<TvSeries />}/>
              <Route path='/bookmarked' element={<PrivateRoute >
                  <Bookmarked />
                </PrivateRoute>}>
              </Route>
              <Route path='/auth' 
                element={ isLoggedIn ? <LogoutConfirmation /> : <AuthPage />} />
            </Routes>
        </main>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
