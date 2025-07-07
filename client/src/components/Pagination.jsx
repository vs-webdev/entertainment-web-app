import { useMedia } from "../context/MediaContext"

const Pagination = () => {
  const {setCurrentPage, pages, currentPage} = useMedia()

  return (
    <div className="flex justify-center mt-8 text-lg">
      <div className="flex justify-between">
        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} className="px-3 py-2 cursor-pointer">Prev</button>
        <ul className="flex items-center gap-5 mx-4">
          {pages.map(num => 
            <li key={num}
              style={{
                color: num === currentPage ? '#fff' : '#5A698F',
              }}
            >
              <button onClick={() => setCurrentPage(num)} className="cursor-pointer" >{num}</button>
            </li>)}
        </ul>
        <button onClick={() => setCurrentPage(prev => prev + 1)} className="px-3 py-2 cursor-pointer">Next</button>
      </div>
    </div>
  )
}

export default Pagination
