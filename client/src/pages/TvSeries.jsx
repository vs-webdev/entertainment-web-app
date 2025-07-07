import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useMedia } from "../context/MediaContext";

const TvSeries = ({toggleBookmark, showSearch, searchText, setSearchText}) => {
  const {tvMedia, fetchTvSeriesMedia, currentPage} = useMedia()
  const [searchMediaContent, setSearchMediaContent] = useState(tvMedia?.filter(media => media.category === 'TV Series'))

  useEffect(() => {
    fetchTvSeriesMedia()
  }, [currentPage])

  const handleOnSearchChange = (text) => {
    setSearchText(text)
    const newMedia = [...tvMedia.filter(media => 
      media.category === 'TV Series' && media.title.toLowerCase().includes(text.toLowerCase())
    )]
    setSearchMediaContent(newMedia)
  }

  return (
    <div className="h-full w-full">
      <SearchBar
        placeholder={"Search for movies or TV series"}
        searchText={searchText}
        setSearchText={setSearchText}
        handleOnSearchChange={handleOnSearchChange}
      />

      {showSearch ? 
        <SearchResults 
          searchText={searchText}
          searchMediaContent={searchMediaContent}
          toggleBookmark={toggleBookmark}
        /> :
        <><div className="flex flex-col items-start">
          <h2 className="text-3xl mb-7">
            TV Series
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
            {tvMedia.map((movie, index) => (
              <li key={index}>
                <MediaCard
                  title={movie.name}
                  year={movie.first_air_date}
                  category={'TV Series'}
                  rating={movie.rating}
                  isBookmarked={movie.isBookmarked}
                  toggleBookmark={toggleBookmark}
                  posterImg={movie.backdrop_path}
                />
              </li>))}
          </ul>
          </div></>}
          <Pagination />
    </div>
  )
}

export default TvSeries
