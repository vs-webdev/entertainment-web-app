import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults";
import Pagination from "../components/Pagination";
import { useEffect } from "react";
import { useMedia } from "../context/MediaContext";

const Movies = ({toggleBookmark}) => {
  const {movieMedia, fetchMovieMedia, currentPage, showSearch, searchText, setSearchText} = useMedia()

  useEffect(() => {
    fetchMovieMedia()
  }, [currentPage])

  const handleOnSearchChange = (text) => {
    setSearchText(text)
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
          toggleBookmark={toggleBookmark}
        /> :
        <><div className="flex flex-col items-start">
          <h2 className="text-3xl mb-7">
            Movies
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
            {movieMedia?.map((movie, index) => (
              <li key={index}>
                <MediaCard
                  title={movie.title}
                  year={movie.release_date}
                  category={'Movie'}
                  rating={movie.certification}
                  isBookmarked={movie.isBookmarked}
                  toggleBookmark={toggleBookmark}
                  posterImg={movie.backdrop_path}
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
