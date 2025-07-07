import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavSidebar from './components/NavSidebar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import Bookmarked from './pages/Bookmarked'

function App() {
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    searchText.trim().length === 0 ? setShowSearch(false) : setShowSearch(true)
  }, [searchText])

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
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                searchText={searchText}
                setSearchText={setSearchText}
                />} />
              <Route path='/movies' element={<Movies 
                toggleBookmark={toggleBookmark} 
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                searchText={searchText}
                setSearchText={setSearchText}
                />}/>
              <Route path='/tvseries' element={<TvSeries 
                toggleBookmark={toggleBookmark} 
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                searchText={searchText}
                setSearchText={setSearchText}
                />}/>
              <Route path='/bookmarked' element={<Bookmarked 
                toggleBookmark={toggleBookmark} 
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                searchText={searchText}
                setSearchText={setSearchText}
              />}/>
            </Routes>
        </main>
      </div>
    </>
  )
}

export default App
