import { toast } from "react-toastify"

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

export const fetchSearchMedia = async () => {
  const response = await fetch(`${API_BASE_URL}/api/media/home/search/?search_media=${searchText}`)
  return await response.json()
}

export const toggleBookmark = async (media, isLoggedIn) => {
  if (!isLoggedIn) {
    return toast.error("Log In to bookmark")
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
    if (response.ok){
      toast.success(result.message)
    } else {
      toast.error("Bookmarked failed")
    }
    return result
    
  } catch (error) {
    console.error('toggle bookmark error', error.message)
  }
}