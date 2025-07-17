import { homeMediaUrl, searchMediaUrl, movieMediaUrl, tvSeriesMediaUrl } from "../constants/media.constants.js";

const tmdbHeaders = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
}

export const homeMediaController = async (req, res) => {
  try {
    // fetching data
    const response = await fetch(`${homeMediaUrl}`, {
      method: 'GET',
      headers: tmdbHeaders,
    })

    const data = await response.json()

    res.status(200).json({
      success: true,
      data,
      message: 'Data fetch successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in trendingMediaController"
    })
  }
}

export const searchMediaController = async (req, res) => {
  const searchMedia = req.query.search_media
  try {
    // fetching data
    const response = await fetch(`${searchMediaUrl}${searchMedia}`,  {
      method: 'GET',
      headers: tmdbHeaders,
    })
    const data = await response.json()

    res.status(200).json({
      success: true,
      data,
      message: 'Data fetched successfully'
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in homeSearchMediaController"
    })
  }
}
 
export const movieMediaController = async (req, res) => {
  try {
    const page = req.query.page || 1

    // fetching data
    const response = await fetch(`${movieMediaUrl}${page}`, {
      method: 'GET',
      headers: tmdbHeaders,
    })

    const data = await response.json()

    res.status(200).json({
      success: true,
      data,
      message: 'movies fetch successfully'
    })
    
  } catch (error) {
    console.log('--------------------------------')
    console.log('Error:', error)
    res.status(500).json({
      success: false,
      message: "Internal server error in movieMediaController"
    })
  }
}

export const tvseriesMediaController = async (req, res) => {
  try {
    const page = req.query.page || 1

    //fetching data
    const response = await fetch(`${tvSeriesMediaUrl}${page}`, {
      headers: tmdbHeaders,
    })

    const data = await response.json()

    res.status(200).json({
      success: true,
      data,
      message: 'Tv series fetch successfully'
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error in tvseriesMediaUrl"
    })
  }
}