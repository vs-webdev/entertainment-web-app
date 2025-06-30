import { useState } from 'react'
import './App.css'
import NavSidebar from './components/NavSidebar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import Bookmarked from './pages/Bookmarked'
import data from './data.json'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [movies, setMovies] = useState(data.movies)

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
        <main className='h-full w-full overflow-y-auto'>
            <Routes>
              <Route path='/' element={<Home movies={movies} toggleBookmark={toggleBookmark} />} />
              <Route path='/movies' element={<Movies movies={movies} toggleBookmark={toggleBookmark} />}/>
              <Route path='/tvseries' element={<TvSeries movies={movies} toggleBookmark={toggleBookmark} />}/>
              <Route path='/bookmarked' element={<Bookmarked movies={movies} toggleBookmark={toggleBookmark} />}/>
            </Routes>
        </main>
      </div>
    </>
  )
}

export default App
