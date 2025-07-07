import { useState } from "react";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults";
import { useEffect } from "react";
import Pagination from "../components/Pagination";
import { useMedia } from "../context/MediaContext";

const Movies = ({toggleBookmark, showSearch, searchText, setSearchText}) => {
  const {movieMedia, fetchMovieMedia, currentPage} = useMedia()
  const [searchMediaContent, setSearchMediaContent] = useState(movieMedia.filter(movie => movie.category === 'Movie'))

  useEffect(() => {
    fetchMovieMedia()
  }, [currentPage])

  const handleOnSearchChange = (text) => {
    setSearchText(text)
    const newMedia = [...movieMedia.filter(movie => 
      movie.category === 'Movie' && movie.title.toLowerCase().includes(text.toLowerCase())
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
            Movies
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
            {movieMedia.map((movie, index) => (
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
