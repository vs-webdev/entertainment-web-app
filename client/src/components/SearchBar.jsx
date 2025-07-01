import searchIcon from '../assets/svg_files/icon-search.svg'

const SearchBar = ({placeholder, handleOnSearchChange, searchText}) => {
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
