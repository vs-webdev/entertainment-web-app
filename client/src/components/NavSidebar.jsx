import homeIcon from '../assets/svg_files/icon-nav-home.svg'
import moviesIcon from '../assets/svg_files/icon-nav-movies.svg'
import tvIcon from '../assets/svg_files/icon-nav-tv-series.svg'
import bookmarkIcon from '../assets/svg_files/icon-nav-bookmark.svg'
import avatar from '../assets/image-avatar.png'
import logo from '../assets/svg_files/logo.svg'

const NavSidebar = () => {
  const icons = [homeIcon, moviesIcon, tvIcon, bookmarkIcon]
  return (
    <nav className='flex flex-col justify-center items-start h-full w-[93px] py-10 px-8 rounded-3xl bg-[#161d2f]'>
      <div className='flex flex-col items-center justify-center '>
        <img className='s-10 mb-18' src={logo} alt="Logo" />
        <ul className='flex flex-col gap-y-12'>
          {
            icons.map((icon, index) =>
              <li key={index}>
                <img src={icon} alt={icon} />
              </li>)
          }
        </ul>
      </div>
      <img className='mt-53 border-white border-2 rounded-full' src={avatar} alt="Avatar" />
    </nav>
  )
}

export default NavSidebar
