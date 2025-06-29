import searchIcon from '../assets/svg_files/icon-search.svg'

const Search = ({placeholder, handleSearch}) => {
  return (
    <div className='flex items-center text-2xl w-full mb-8'>
      <label htmlFor="searchResult" className='w-full flex items-center gap-5'>
        <img src={searchIcon} alt="Search Icon" />
        <input 
          type="text" 
          className='w-full'
          id="searchResult"
          placeholder={placeholder}
          onChange={handleSearch}
        />
      </label>
    </div>
  )
}

export default Search
