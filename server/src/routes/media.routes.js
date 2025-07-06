import express from 'express'
import { homeMediaController, movieMediaController, tvseriesMediaController } from '../controllers/media.controllers.js'

const mediaRouter = express.Router()

mediaRouter.get("/media/trending", homeMediaController)

mediaRouter.get("/media/movies", movieMediaController)

mediaRouter.get("/media/tvseries", tvseriesMediaController)

export default mediaRouter;