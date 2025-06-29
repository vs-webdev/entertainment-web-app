import MediaCard from "../components/MediaCard"
import Search from "../components/Search"
import TrendingMediaCard from "../components/TrendingMediaCard"

const Home = ({movies, toggleBookmark}) => {
  const handleSearch = (e) => {

  }

  return (
    <div className="h-full w-full">
      <Search 
        placeholder={"Search for movies or TV series"}
        handleSearch={handleSearch}
      />

      <div className="flex flex-col items-start mb-8">
        <h2 className="text-3xl mb-7">
          Trending
        </h2>
        <div className="w-full flex overflow-x-auto">
          <div className="w-auto flex gap-8">
            {movies.filter(movie => movie.isTrending).map((movie, index) => (
              <TrendingMediaCard 
                index={index}
                title={movie.title}
                year={movie.year}
                category={movie.category}
                rating={movie.rating}
                isBookmarked={movie.isBookmarked}
                toggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <h2 className="text-3xl mb-7">
          Recommended for you
        </h2>
        <div className="grid grid-cols-4 gap-8 w-full">
          {movies.map((movie, index) => (
            <MediaCard 
              index={index} 
              title={movie.title}
              year={movie.year}
              category={movie.category}
              rating={movie.rating}
              isBookmarked={movie.isBookmarked}
              toggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
