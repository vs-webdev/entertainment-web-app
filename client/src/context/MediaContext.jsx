import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { fetchBookmarkedMedia } from "../api/media";

const MediaContext = createContext(null)

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (!context){
    throw new Error("useMedia must be used within a MediaProvider") 
  }
  return context;
}

export const MediaProvider = ({children}) => {
  const {isLoggedIn} = useAuth()
  const [bookmarkMedia, setBookmarkMedia] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [pages, setPages] = useState([1,2,3,4,5,6,7,8,9,10])
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchMediaContent, setSearchMediaContent] = useState([])
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true)

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

  useEffect(() => {
    if (isLoggedIn){
      fetchBookmarkedMedia().then((data) => setBookmarkMedia(data.bookmarks))
    } else {
      setBookmarkMedia([])
    }
  }, [isLoggedIn])

  const value = {
    bookmarkMedia, setBookmarkMedia,
    currentPage, setCurrentPage,
    pages, setTotalPages,
    showSearch, setShowSearch,
    searchText, setSearchText,
    searchMediaContent, setSearchMediaContent,
    isLoadingBookmarks, setIsLoadingBookmarks,
  }

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  )
}