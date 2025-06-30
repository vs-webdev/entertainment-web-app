import MediaCard from "../components/MediaCard";
import Search from "../components/Search"

const TvSeries = ({movies, toggleBookmark}) => {
  const handleSearch = (e) => null;

  return (
    <div className="h-full w-full">
      <Search 
        placeholder={"Search for movies or TV series"}
        handleSearch={handleSearch}
      />

      <div className="flex flex-col items-start">
        <h2 className="text-3xl mb-7">
          TV Series
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
          {movies.filter(movie => movie.category === 'TV Series').map((movie, index) => (
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
      </div>
    </div>
  )
}

export default TvSeries
