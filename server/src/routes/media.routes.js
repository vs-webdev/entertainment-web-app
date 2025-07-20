import express from 'express'
import { homeMediaController, searchMediaController, movieMediaController, tvseriesMediaController, bookmarkedMediaController } from '../controllers/media.controllers.js'
import protect from '../middleware/auth.middleware.js'

const mediaRouter = express.Router()

mediaRouter.get("/trending", homeMediaController)
mediaRouter.get("/home/search", searchMediaController)

mediaRouter.get("/movies", movieMediaController)

mediaRouter.get("/tvseries", tvseriesMediaController)

mediaRouter.get("/bookmarks", protect, bookmarkedMediaController)

export default mediaRouter;