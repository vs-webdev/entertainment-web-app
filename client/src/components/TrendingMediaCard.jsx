import { useState } from 'react'
import bookmarkEmpty from '../assets/svg_files/icon-bookmark-empty.svg'
import bookmarkFull from '../assets/svg_files/icon-bookmark-full.svg'
import movieTag from '../assets/svg_files/icon-nav-movies.svg'
import play from '../assets/svg_files/icon-play.svg'

const TrendingMediaCard = ({year, category, rating, title, isBookmarked, toggleBookmark}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className="p-5 w-[470px] h-[230px] flex flex-col items-between justify-between border rounded-xl relative overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={`bg-gray-700/20 inset-0 absolute flex items-center ${isHover ? '' : 'hidden'} justify-center`}>
        <div className='flex items-center w-max gap-3 bg-gray-500 px-5 py-3 rounded-full'>
          <img src={play} alt="Play" />
          <span className='text-lg'>Play</span>
        </div>
      </div>

      <div 
        className='z-10 flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 ml-auto'
        onClick={() => toggleBookmark(title)}
      >
        <img src={isBookmarked ? bookmarkFull : bookmarkEmpty} alt="Empty Bookmark" />
      </div>

      <div>
        <div className='flex items-center gap-2 mb-1'>
          <span>{year}</span>
          <span>.</span>
          <span className='flex items-center gap-2'>
            <img src={movieTag} alt="Moive Tag" className='w-4 h-4' />
            {category}
            </span>
          <span>.</span>
          <span>{rating}</span>
        </div>
        
        <h3 className='text-xl text-left'>{title}</h3>
      </div>
    </div>
  )
}

export default TrendingMediaCard
