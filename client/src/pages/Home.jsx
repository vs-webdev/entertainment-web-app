import { useEffect, useState } from "react"
import MediaCard from "../components/MediaCard"
import SearchBar from "../components/SearchBar"
import TrendingMediaCard from "../components/TrendingMediaCard"
import SearchResults from "../components/SearchResults"
import { useMedia } from "../context/MediaContext"
import { fetchMedia } from "../api/media"

const Home = () => {
  const {bookmarkMedia, setTotalPages, showSearch, toggleBookmark} = useMedia()
  const [rawMediaData, setRawMediaData] = useState([])
  const [trendingMedia, setTrendingMedia] = useState([])
  const [recommendedMedia, setRecommendedMedia] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const mediaData = await fetchMedia('trending')
      setRawMediaData(mediaData?.results || [])
      setTotalPages(mediaData?.total_pages)
    }
    
    loadData()
  }, [])
  
  useEffect(() => {
    if (!rawMediaData.length) return;
    const bookmarkedIds = new Set(bookmarkMedia.map(b => b.mediaId.toString()))
    // Tag each movie
    const taggedMedia = rawMediaData.map(m => ({
      ...m,
      isBookmarked: bookmarkedIds.has(m.id.toString())
    }))
  
    setTrendingMedia(taggedMedia?.slice(0, 5))
    setRecommendedMedia(taggedMedia)
  }, [rawMediaData, bookmarkMedia])

  return (
    <div className="h-full w-full">
      <SearchBar 
        placeholder={"Search for movies or TV series"}
      />

      {showSearch ? 
      <SearchResults
        toggleBookmark={toggleBookmark}
      /> :
      <><div className="flex flex-col items-start mb-8">
        <h2 className="text-3xl mb-7">
          Trending
        </h2>
        <div className="w-full flex overflow-x-auto">
          <ul className="w-auto flex gap-8">
            {trendingMedia?.map((movie, index) => (
              <li key={index}>
                <TrendingMediaCard
                  title={movie?.title || movie?.name}
                  mediaId={movie.id}
                  year={movie?.release_date || movie?.first_air_date}
                  category={movie?.media_type}
                  rating={movie?.certification}
                  isBookmarked={movie?.isBookmarked}
                  posterImg={movie?.backdrop_path}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <h2 className="text-3xl mb-7">
          Recommended for you
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
          {recommendedMedia?.map((movie, index) => (
            <li key={index}>
              <MediaCard
                  title={movie?.title || movie?.name}
                  mediaId={movie.id}
                  year={movie?.release_date || movie?.first_air_date}
                  category={movie?.media_type}
                  rating={movie?.certification}
                  isBookmarked={movie?.isBookmarked}
                  posterImg={movie?.backdrop_path}
              />
            </li>
          ))}
        </ul>
      </div></>
      }
    </div>
  )
}

export default Home
