import MediaCard from "./MediaCard"

const SearchResults = ({searchText, searchMediaContent, toggleBookmark}) => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-start overflow-hidden">
        <h2 className="text-3xl mb-7 w-full truncate text-left">
          Found {searchMediaContent.length} results for '{searchText}'
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
          {searchMediaContent.map((movie, index) => (
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

export default SearchResults
