
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMedia = async (mediaType, currentPage=1) => {
  const response = await fetch(`${API_BASE_URL}/api/media/${mediaType}/?page=${currentPage}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  const result = await response.json()
  return result?.data
}

export const fetchBookmarkedMedia = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/bookmarks`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      },
      credentials: 'include'
    })
    return await response.json()

  } catch (error) {
    console.log('fetch bookmark error', error.message)
  }
}

export const fetchSearchMedia = async (searchText) => {
  const response = await fetch(`${API_BASE_URL}/api/media/home/search/?search_media=${searchText}`)
  return await response.json()
}

export const toggleBookmark = async (media, isLoggedIn) => {
  if (!isLoggedIn) {
    return {success: false, message: "Log in to Bookmark"}
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/togglebookmark`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include",
      body: JSON.stringify(media),
    })
  
    const result = await response.json()
    return {success: response.ok, message: result.message}
    
  } catch (error) {
    console.error('toggle bookmark error', error.message)
  }
}