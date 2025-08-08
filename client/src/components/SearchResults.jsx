import { useMedia } from "../context/MediaContext"
import useSearchMedia from "../utils/useSearchMedia"
import MediaCard from "./MediaCard"

const SearchResults = () => {
  const {searchMediaContent, searchText} = useMedia()
  useSearchMedia()

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
                  mediaId={movie.id || movie.mediaId}
                  year={movie?.release_date || movie?.first_air_date || movie?.releaseDate}
                  category={movie?.media_type || movie?.mediaType}
                  rating={movie?.certification}
                  isBookmarked={movie?.isBookmarked}
                  posterImg={movie?.backdrop_path || movie?.posterPath}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchResults
