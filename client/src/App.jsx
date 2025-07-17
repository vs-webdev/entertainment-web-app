import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavSidebar from './components/NavSidebar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import Bookmarked from './pages/Bookmarked'
import AuthPage from './pages/AuthPage'
import PrivateRoute from './components/PrivateRoute'

function App() {

  const toggleBookmark = (title) => {
    setMovies(prev => {
      const updated = [...prev]
      const index = updated.findIndex(movie => movie.title === title)
      if (index !== -1){
        updated[index] = {
          ...updated[index],
          isBookmarked: !updated[index].isBookmarked
        }
      }
      return updated;
    })
  }

  return (
    <>
      <div className='w-full h-full flex gap-6'>
        <NavSidebar />
        <main className='h-full pt-6 w-full overflow-y-auto'>
            <Routes>
              <Route path='/' element={<Home
                toggleBookmark={toggleBookmark}
                />} />
              <Route path='/movies' element={<Movies 
                toggleBookmark={toggleBookmark} 
                />}/>
              <Route path='/tvseries' element={<TvSeries 
                toggleBookmark={toggleBookmark} 
                />}/>
              <Route path='/bookmarked' element={<PrivateRoute >
                  <Bookmarked toggleBookmark={toggleBookmark}/>
                </PrivateRoute>}>
              </Route>
              <Route path='/auth' element={<AuthPage />}/>
            </Routes>
        </main>
      </div>
    </>
  )
}

export default App
