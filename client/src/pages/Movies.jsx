import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useMedia } from "../context/MediaContext";
import { fetchMedia } from "../api/media";

const Movies = () => {
  const {movieMedia, setMovieMedia, bookmarkMedia, setTotalPages, currentPage, showSearch, toggleBookmark} = useMedia()
  const [rawMoviesMedia, setRawMoviesMedia] = useState([])
  const [taggedMoviesMedia, setTaggedMoviesMedia] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const mediaData = await fetchMedia('movies', currentPage)
      setRawMoviesMedia(mediaData?.results || [])
      setTotalPages(mediaData?.total_pages)
    }
    
    loadData()
  }, [currentPage])
  
  useEffect(() => {
    if (!rawMoviesMedia.length) return;
    const bookmarkedIds = new Set(bookmarkMedia.map(b => b.mediaId.toString()))
    // Tag each movie
    const taggedMedia = rawMoviesMedia.map(m => ({
      ...m,
      isBookmarked: bookmarkedIds.has(m.id.toString())
    }))
  
    setTaggedMoviesMedia(taggedMedia)
  }, [rawMoviesMedia, bookmarkMedia])


  return (
    <div className="h-full w-full">
      <SearchBar
        placeholder={"Search for movies or TV series"}
      />

      {showSearch ? 
        <SearchResults 
          toggleBookmark={toggleBookmark}
        /> :
        <><div className="flex flex-col items-start">
          <h2 className="text-3xl mb-7">
            Movies
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
            {taggedMoviesMedia?.map((movie, index) => (
              <li key={index}>
                <MediaCard
                  title={movie?.title}
                  year={movie?.release_date}
                  isBookmarked={movie?.isBookmarked}
                  posterImg={movie?.backdrop_path}
                  mediaId={movie?.id}
                  category={'movie'}
                  rating={movie?.certification}
                />
              </li>
            ))}
          </ul>
        </div></>}
        <Pagination />
    </div>
  )
}

export default Movies
