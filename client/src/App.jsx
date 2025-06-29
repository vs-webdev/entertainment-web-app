import { useState } from 'react'
import './App.css'
import NavSidebar from './components/NavSidebar'
import Home from './pages/Home'
import data from './data.json'

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
          <Home 
            movies={movies}
            setMovies={setMovies}
            toggleBookmark={toggleBookmark}
          />
        </main>
      </div>
    </>
  )
}

export default App
