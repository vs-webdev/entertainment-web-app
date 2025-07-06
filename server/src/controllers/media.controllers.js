import axios from "axios";
import { homeMediaUrl, movieMediaUrl, tvSeriesMediaUrl } from "../constants/media.constants.js";

export const homeMediaController = async (req, res) => {
  try {
    // fetching data
    const response = await axios.get(`${homeMediaUrl}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      }
    })

    res.status(200).json({
      success: true,
      data: response.data,
      message: 'Data fetch successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in trendingMediaController"
    })
  }
}
 
export const movieMediaController = async (req, res) => {
  try {
    const page = req.query.page || 1

    // fetching data
    const response = await axios.get(`${movieMediaUrl}${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
      }
    })

    res.status(200).json({
      success: true,
      data: response.data,
      message: 'movies fetch successfully'
    })
    
  } catch (error) {
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
    const response = await axios.get(`${tvSeriesMediaUrl}${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
      }
    })

    res.status(200).json({
      success: true,
      data: response.data,
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