import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import useDebounce from "../utils/useDebounce";

const MediaContext = createContext(null)

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (!context){
    throw new Error("useMedia must be used within a MediaProvider") 
  }
  return context;
}

export const MediaProvider = ({children}) => {
  const location = useLocation()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [trendingMedia, setTrendingMedia] = useState([])
  const [recommendedMedia, setRecommendedMedia] = useState([])
  const [movieMedia, setMovieMedia] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [pages, setPages] = useState([1,2,3,4,5,6,7,8,9,10])
  const [tvMedia, setTvMedia] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchMediaContent, setSearchMediaContent] = useState([])
  const debouncedSearchText = useDebounce(searchText, 500)

  useEffect(() => {
    if (debouncedSearchText.trim().length === 0 ){
      setShowSearch(false) 
      setSearchMediaContent([])
    } else {
      setShowSearch(true)
      fetchSearchMedia()
    }
  }, [debouncedSearchText])

  const fetchSearchMedia = async () => {
    const response = await fetch(`${API_BASE_URL}/api/media/home/search/?search_media=${searchText}`)
    const data = await response.json()
    let media = data?.data?.results.filter(media => media.media_type !== 'person') || []

    // filtering media based on path
    if (location.pathname === '/movies'){
      media = media.filter(media => media.media_type === 'movie')
    }
    if (location.pathname === '/tvseries'){
      media = media.filter(media => media.media_type === 'tv')
    }
    setSearchMediaContent(media)
  }
  
  const fetchHomeMedia = async () => {
    const response = await fetch(`${API_BASE_URL}/api/media/trending`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    })
    const result = await response.json()
    console.log(result)
    setTrendingMedia(result?.data?.results.slice(0,5))
    setRecommendedMedia(result?.data?.results)
  }

  const fetchMovieMedia = async () => {
    const response = await fetch(`${API_BASE_URL}/api/media/movies/?page=${currentPage}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    })
    const result = await response.json()
    console.log('result', result)
    
    setTotalPages(result?.data?.total_pages)
    setMovieMedia(result?.data?.results)
  }

  const fetchTvSeriesMedia = async () => {
    const response = await fetch(`${API_BASE_URL}/api/media/tvseries/?page=${currentPage}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    })
    const result = await response.json()
    console.log(result)
    setTvMedia(result?.data?.results)
  }

  useEffect(() => {
   const windowSize = 10;
   console.log('hi')

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
    trendingMedia, recommendedMedia,
    tvMedia, fetchTvSeriesMedia,
    movieMedia, fetchMovieMedia,
    currentPage, setCurrentPage,
    pages, fetchHomeMedia,
    showSearch, setShowSearch,
    searchText, setSearchText,
    searchMediaContent, setSearchMediaContent
  }

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  )
}