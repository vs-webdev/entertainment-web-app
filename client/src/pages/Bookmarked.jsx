import { useEffect } from "react";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults";
import { useMedia } from "../context/MediaContext";
import { fetchBookmarkedMedia } from "../api/media";

const Bookmarked = () => {
  const {showSearch, searchText, bookmarkMedia, setBookmarkMedia, setIsLoadingBookmarks, isLoadingBookmarks} = useMedia()

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const data = await fetchBookmarkedMedia();
        setBookmarkMedia(data?.bookmarks || []);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      } finally {
        setIsLoadingBookmarks(false);
      }
    };

    loadBookmarks();
  }, []); 

  if (isLoadingBookmarks){
    return (
      <div className="h-full w-full">
        <h1 className="text-2xl">...Loading</h1>
      </div>
    )
  }
  
  if (!isLoadingBookmarks && bookmarkMedia?.length === 0){
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
      />

    {showSearch ? 
      <SearchResults 
        searchText={searchText}
      /> :
      <><div className="flex flex-col w-full items-start mb-8">
        <h2 className="text-3xl mb-7">
          Bookmarked Movies
        </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(318px,_1fr))] w-full gap-8">
            {bookmarkMedia?.filter(movie =>  movie.mediaType === 'movie').map((movie, index) => (
              <li key={index}>
                <MediaCard
                  title={movie?.title}
                  mediaId={movie?.mediaId}
                  year={movie?.releaseDate}
                  category={movie?.mediaType}
                  rating={movie?.rating}
                  isBookmarked={true}
                  posterImg={movie?.posterPath}
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
          {bookmarkMedia?.filter(movie => movie.mediaType === 'tv').map((movie, index) => (
            <li key={index}>
              <MediaCard
                  title={movie?.title}
                  mediaId={movie?.mediaId}
                  year={movie?.releaseDate}
                  category={movie?.mediaType}
                  rating={movie?.rating}
                  isBookmarked={movie?.isBookmarked}
                  posterImg={movie?.posterPath}
              />
            </li>
          ))}
        </ul>
      </div></>}
    </div>
  )
}

export default Bookmarked
