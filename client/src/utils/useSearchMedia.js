import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { fetchSearchMedia } from "../api/media"
import { useMedia } from "../context/MediaContext"
import useDebounce from "./useDebounce"

const useSearchMedia = () => {
  const {searchText, setSearchMediaContent, searchMediaContent, bookmarkMedia} = useMedia()
  const debounceText = useDebounce(searchText, 500)
  const path = useLocation().pathname

  useEffect(() => {
    if (debounceText.trim().length === 0 ){
      setSearchMediaContent([])
    } else {
      if (path === "/bookmarked"){
        const newMedia = [...bookmarkMedia.filter(movie => 
          movie.title.toLowerCase().includes(debounceText.toLowerCase()))]
          console.log('book', newMedia)
        setSearchMediaContent(newMedia)
        return
      }
      const getResults = async () => {
        const result = await fetchSearchMedia(debounceText)
        let filtered = result?.data?.results.filter(media => media.media_type !== 'person') || []
        
        if (path === "/movies") filtered = filtered.filter(media => media.media_type === 'movie')
        if (path === "/tvseries") filtered = filtered.filter(media => media.media_type === 'tv')
        
        setSearchMediaContent(filtered)
      }
      getResults()
    }
  }, [debounceText])

  return searchMediaContent
}

export default useSearchMedia
