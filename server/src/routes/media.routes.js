import express from 'express'
import { homeMediaController, searchMediaController, movieMediaController, tvseriesMediaController } from '../controllers/media.controllers.js'

const mediaRouter = express.Router()

mediaRouter.get("/trending", homeMediaController)
mediaRouter.get("/home/search", searchMediaController)

mediaRouter.get("/movies", movieMediaController)

mediaRouter.get("/tvseries", tvseriesMediaController)

export default mediaRouter;