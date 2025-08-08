import { useEffect, useState } from "react";
import { useMedia } from "../context/MediaContext";
import { fetchMedia } from "../api/media";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults";
import Pagination from "../components/Pagination";

const TvSeries = () => {
  const {tvMedia, setTvMedia, currentPage, bookmarkMedia, showSearch, setTotalPages, toggleBookmark} = useMedia()
  const [rawTvMedia, setRawTvMedia] = useState([])
  const [taggedTvMedia, setTaggedTvMedia] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const mediaData = await fetchMedia('tvseries', currentPage)
      setRawTvMedia(mediaData?.results || [])
      setTotalPages(mediaData?.total_pages)
    }
    
    loadData()
  }, [currentPage])
  
  useEffect(() => {
    if (!rawTvMedia.length) return;
    const bookmarkedIds = new Set(bookmarkMedia.map(b => b.mediaId.toString()))
    // Tag each movie
    const taggedMedia = rawTvMedia.map(m => ({
      ...m,
      isBookmarked: bookmarkedIds.has(m.id.toString())
    }))
    console.log(taggedMedia)
  
    setTaggedTvMedia(taggedMedia)
  }, [rawTvMedia, bookmarkMedia])

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
            TV Series
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
            {taggedTvMedia?.map((movie, index) => (
              <li key={index}>
                <MediaCard
                  title={movie?.name}
                  year={movie?.first_air_date}
                  isBookmarked={movie?.isBookmarked}
                  posterImg={movie?.backdrop_path}
                  mediaId={movie?.id}
                  category={'tv'}
                  rating={movie?.certification}
                />
              </li>))}
          </ul>
          </div></>}
          <Pagination />
    </div>
  )
}

export default TvSeries
