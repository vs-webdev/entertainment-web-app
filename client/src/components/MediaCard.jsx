import { useState } from 'react'
import bookmarkEmpty from '../assets/svg_files/icon-bookmark-empty.svg'
import bookmarkFull from '../assets/svg_files/icon-bookmark-full.svg'
import movieTag from '../assets/svg_files/icon-nav-movies.svg'
import play from '../assets/svg_files/icon-play.svg'

const MediaCard = ({year, category, rating, title, isBookmarked, toggleBookmark, posterImg}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="rouded h-[174px] w-full border rounded-2xl bg-cover bg-center relative mb-2"
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
          className='z-10 absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-gray-500'
          onClick={() => toggleBookmark(title)}
        >
          <img src={isBookmarked ? bookmarkFull : bookmarkEmpty} alt="Empty Bookmark" />
        </div>
      </div>

      <div className='flex items-center gap-2 mb-1'>
        <span>{year.slice(0, 4)}</span>
        <span className='flex items-center capitalize gap-2 before:content-["\00B7"] before:font-extrabold before:inline-block before:align-middle after:content-["\00B7"] after:inline-block after:font-extrabold after:align-middle'>
          <img src={movieTag} alt="Moive Tag" className='w-4 h-4' />
          {category}
          </span>
        <span>{rating}</span>
      </div>

      <h3 className='text-xl text-left'>{title}</h3>
    </div>
  )
}

export default MediaCard
