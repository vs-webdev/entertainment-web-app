import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import bookmarkEmpty from '../assets/svg_files/icon-bookmark-empty.svg'
import bookmarkFull from '../assets/svg_files/icon-bookmark-full.svg'
import movieTag from '../assets/svg_files/icon-nav-movies.svg'
import play from '../assets/svg_files/icon-play.svg'
import { fetchBookmarkedMedia, toggleBookmark } from '../api/media'
import { toast } from 'react-toastify'
import { useMedia } from '../context/MediaContext'

const TrendingMediaCard = ({year, category, rating, title, mediaId, isBookmarked, posterImg}) => {
  const [isHover, setIsHover] = useState(false)
  const {isLoggedIn} = useAuth()
  const {setBookmarkMedia} = useMedia()

  const handleToggleBookmark = async (media) => {
    try {
      const result = await toggleBookmark(media, isLoggedIn);
      if (result.success) {
        toast.success(result.message);

        // Refresh bookmarks in context
        const bookmarkData = await fetchBookmarkedMedia();
        setBookmarkMedia(bookmarkData?.bookmarks || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error toggling bookmark", error);
    }
  };

  return (
    <div
      className={`p-5 w-[460px] h-[260px] bg-cover bg-center flex flex-col items-between justify-between rounded-xl relative overflow-hidden cursor-pointer group`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out transform group-hover:scale-103"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterImg})`}}
      ></div>
      <div className={`bg-gray-600/40 inset-0 absolute flex items-center ${isHover ? '' : 'hidden'} justify-center`}>
        <div className='flex items-center w-max gap-3 bg-gray-500 hover:bg-gray-600 px-5 py-3 rounded-full'>
          <img src={play} alt="Play" />
          <span className='text-lg text-neutral-100'>Play</span>
        </div>
      </div>

      <div 
        className='z-10 flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 ml-auto cursor-pointer hover:bg-gray-600'
        onClick={() => handleToggleBookmark({title, mediaId, posterPath: posterImg, releaseDate: year, mediaType: category}, isLoggedIn)}
      >
        <img src={isBookmarked ? bookmarkFull : bookmarkEmpty} alt="Empty Bookmark" />
      </div>

      <div className='z-10'>
        <div className='flex items-center gap-2 mb-1'>
          <span>{year.slice(0, 4)}</span>
          <span className='flex items-center gap-2 capitalize before:content-["\00B7"] before:font-extrabold before:inline-block before:align-middle'>
            <img src={movieTag} alt="Moive Tag" className='w-4 h-4' />
            {category === 'tv' ? 'TV Series' : 'Movie'}
            </span>
          <span>{rating}</span>
        </div>
        
        <h3 className='text-2xl font-bold text-left'>{title}</h3>
      </div>
    </div>
  )
}

export default TrendingMediaCard
