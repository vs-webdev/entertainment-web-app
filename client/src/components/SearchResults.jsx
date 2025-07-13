import { useMedia } from "../context/MediaContext"
import MediaCard from "./MediaCard"

const SearchResults = ({searchText, toggleBookmark}) => {
  const {searchMediaContent} = useMedia()

  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-start overflow-hidden">
        <h2 className="text-3xl mb-7 w-full truncate text-left">
          Found {searchMediaContent?.length} results for '{searchText}'
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] gap-8 w-full">
          {searchMediaContent?.map((movie, index) => (
            <li key={index}>
              <MediaCard
                title={movie?.title || movie?.name}
                year={movie?.release_date || movie?.first_air_date}
                category={movie?.media_type}
                rating={movie?.rating}
                isBookmarked={movie?.isBookmarked}
                toggleBookmark={toggleBookmark}
                posterImg={movie?.backdrop_path}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchResults
