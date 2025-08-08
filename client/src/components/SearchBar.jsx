import searchIcon from '../assets/svg_files/icon-search.svg'
import { useMedia } from '../context/MediaContext'

const SearchBar = ({placeholder, searchText}) => {
  const {setSearchText, setShowSearch} = useMedia()

  const handleOnSearchChange = (text) => {
    setSearchText(text)
    if (text.trim().length === 0){
      setShowSearch(false)
    } else {
      setShowSearch(true)
    }
  }
  return (
    <div className='flex items-center text-2xl w-full mb-8'>
      <label htmlFor="searchResult" className='w-full flex items-center gap-5'>
        <img src={searchIcon} alt="Search Icon" />
        <input 
          type="text" 
          className='w-full focus:border-b outline-none px-2'
          id="searchResult"
          placeholder={placeholder}
          value={searchText}
          onChange={e => handleOnSearchChange(e.target.value)}
        />
      </label>
    </div>
  )
}

export default SearchBar
