import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useMedia } from '../context/MediaContext'
import { fetchBookmarkedMedia, toggleBookmark } from '../api/media'
import bookmarkEmpty from '../assets/svg_files/icon-bookmark-empty.svg'
import bookmarkFull from '../assets/svg_files/icon-bookmark-full.svg'
import movieTag from '../assets/svg_files/icon-nav-movies.svg'
import play from '../assets/svg_files/icon-play.svg'

const MediaCard = ({year, category, rating, title, mediaId, isBookmarked, posterImg, media, setMedia}) => {
  const [isHover, setIsHover] = useState(false)
  const {isLoggedIn} = useAuth()
  const {setBookmarkMedia, setIsLoadingBookmarks} = useMedia()

  const handleToggleBookmark = async (mediaData) => {
    try {
      const result = await toggleBookmark(mediaData, isLoggedIn)
      if (result.success){
        toast.success(result.message)
        const bookmarkData = await fetchBookmarkedMedia()
        setBookmarkMedia(bookmarkData?.bookmarks || []);
      } else {
        toast.error(result.message)
        setIsLoadingBookmarks(false);
        return
      }
    } catch (error) {
      console.error("Error toggling bookmark", error)
    }
  }

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="rouded h-[210px] lg:h-[174px] w-full rounded-2xl bg-cover bg-center relative mb-2"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterImg})`}}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className={`bg-gray-700/20 inset-0 absolute flex ${isHover ? '' : 'hidden'} items-center justify-center`}>
          <div className='flex items-center w-max gap-2 bg-gray-500 px-4 py-2 rounded-full'>
            <img src={play} alt="Play" className='w-[20px]' />
            <span className='text-md'>Play</span>
          </div>
        </div>

        <div 
          className='z-10 absolute top-3 right-3 flex items-center justify-center h-8 w-8 cursor-pointer rounded-full bg-gray-500'
          onClick={() => handleToggleBookmark({title, mediaId, posterPath: posterImg, releaseDate: year, mediaType: category})}
        >
          <img src={isBookmarked ? bookmarkFull : bookmarkEmpty} alt="Empty Bookmark" />
        </div>
      </div>

      <div className='flex items-center gap-2 mb-1'>
        <span>{year?.slice(0, 4)}</span>
        <span className='flex items-center capitalize gap-2 before:content-["\00B7"] before:font-extrabold before:inline-block before:align-middle'>
          <img src={movieTag} alt="Moive Tag" className='w-4 h-4' />
          {category === 'tv' ? 'TV Series' : 'Movie'}
          </span>
        <span>{rating}</span>
      </div>

      <h3 className='text-xl text-left'>{title}</h3>
    </div>
  )
}

export default MediaCard
