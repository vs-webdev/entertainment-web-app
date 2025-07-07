import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const MediaContext = createContext(null)

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (!context){
    throw new Error("useMedia must be used within a MediaProvider") 
  }
  return context;
}

export const MediaProvider = ({children}) => {
  const [movieMedia, setMovieMedia] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [pages, setPages] = useState([1,2,3,4,5,6,7,8,9,10])
  const [tvMedia, setTvMedia] = useState([])
  const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

  const fetchTvSeriesMedia = async () => {
    const {data} = await axios.get(`${API_BASE_URL}/api/media/tvseries/?page=${currentPage}`)
    console.log(data)
    setTvMedia(data?.data?.results)
  }

  const fetchMovieMedia = async () => {
    const {data} = await axios.get(`${API_BASE_URL}/api/media/movies/?page=${currentPage}`)
    console.log(data)
    setTotalPages(data?.data?.total_pages)
    setMovieMedia(data?.data?.results)
  }

  useEffect(() => {
   const windowSize = 10;

  const shiftPages = (offset) => {
    let newStart = pages[0] + offset;

    // Ensure we don't go out of bounds
    if (newStart < 1) newStart = 1;
    if (newStart + windowSize - 1 > totalPages) {
      newStart = totalPages - windowSize + 1;
      if (newStart < 1) newStart = 1; // fallback if totalPages < windowSize
    }

    const newPages = Array.from({ length: windowSize }, (_, i) => newStart + i);
    setPages(newPages);
  };

  // Shift window by 1 when current page is 9th in window
  if (currentPage === pages[8] && pages[pages.length - 1] < totalPages) {
    shiftPages(1);
  }

  // Shift window by 2 when current page is 10th in window
  else if (currentPage === pages[9] && pages[pages.length - 1] < totalPages) {
    shiftPages(2);
  }

  // Optional: handle leftward shift (clicking 2nd or 1st button)
  else if (currentPage === pages[1] && pages[0] > 1) {
    shiftPages(-1);
  } else if (currentPage === pages[0] && pages[0] > 1) {
    shiftPages(-2);
  }

  }, [currentPage])

  const value = {
    tvMedia, fetchTvSeriesMedia,
    movieMedia, fetchMovieMedia,
    currentPage, setCurrentPage,
    pages,
  }

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  )
}