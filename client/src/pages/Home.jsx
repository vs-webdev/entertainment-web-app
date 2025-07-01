import { useState } from "react"
import MediaCard from "../components/MediaCard"
import SearchBar from "../components/SearchBar"
import TrendingMediaCard from "../components/TrendingMediaCard"
import SearchResults from "../components/SearchResults"

const Home = ({movies, toggleBookmark, showSearch, searchText, setSearchText}) => {

  const [searchMediaContent, setSearchMediaContent] = useState(movies)

  const handleOnSearchChange = (text) => {
    setSearchText(text)
    const newMedia = [...movies.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()))]
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
      <><div className="flex flex-col items-start mb-8">
        <h2 className="text-3xl mb-7">
          Trending
        </h2>
        <div className="w-full flex overflow-x-auto">
          <ul className="w-auto flex gap-8">
            {movies.filter(movie => movie.isTrending).map((movie, index) => (
              <li key={index}>
                <TrendingMediaCard
                  title={movie.title}
                  year={movie.year}
                  category={movie.category}
                  rating={movie.rating}
                  isBookmarked={movie.isBookmarked}
                  toggleBookmark={toggleBookmark}
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
          {movies.map((movie, index) => (
            <li key={index}>
              <MediaCard
                title={movie.title}
                year={movie.year}
                category={movie.category}
                rating={movie.rating}
                isBookmarked={movie.isBookmarked}
                toggleBookmark={toggleBookmark}
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
