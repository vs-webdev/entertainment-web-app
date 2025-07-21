import { useEffect, useState } from "react";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults";
import { useMedia } from "../context/MediaContext";

const Bookmarked = ({ toggleBookmark}) => {
  const {showSearch, searchText, setSearchText, bookmarkMedia, fetchBookmarkedMedia} = useMedia()
  const [searchMediaContent, setSearchMediaContent] = useState(bookmarkMedia?.filter(movie => movie.isBookmarked))

  const handleOnSearchChange = (text) => {
    setSearchText(text)
    const newMedia = [...bookmarkMedia.filter(movie => 
      movie.isBookmarked && movie.title.toLowerCase().includes(text.toLowerCase())
    )]
    setSearchMediaContent(newMedia)
  }

  useEffect(() => {
    fetchBookmarkedMedia()
  }, [])

  if (!bookmarkMedia?.length){
    return (
      <div className="h-full w-full">
        <h1 className="text-2xl">There are no bookmarks</h1>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <SearchBar
        placeholder={"Search for bookmarked movies or TV series"}
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
      <><div className="flex flex-col w-full items-start mb-8">
        <h2 className="text-3xl mb-7">
          Bookmarked Movies
        </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] w-full gap-8">
            {bookmarkMedia?.filter(movie =>  movie.category === 'Movie' && movie.isBookmarked).map((movie, index) => (
              <li key={index}>
                <MediaCard
                  title={movie?.title}
                  year={movie?.year}
                  category={movie?.category}
                  rating={movie?.rating}
                  isBookmarked={movie?.isBookmarked}
                  toggleBookmark={toggleBookmark}
                />
              </li>
            ))}
          </ul>
      </div>

      <div className="flex flex-col items-start">
        <h2 className="text-3xl mb-7">
          Bookmarked TV Series
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_318px))] gap-8 w-full">
          {bookmarkMedia?.filter(movie => movie.category === 'TV Series' && movie.isBookmarked).map((movie, index) => (
            <li key={index}>
              <MediaCard
                title={movie?.title}
                year={movie?.year}
                category={movie?.category}
                rating={movie?.rating}
                isBookmarked={movie?.isBookmarked}
                toggleBookmark={toggleBookmark}
              />
            </li>
          ))}
        </ul>
      </div></>}
    </div>
  )
}

export default Bookmarked
