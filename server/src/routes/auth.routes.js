import express from 'express'
import { isAuthenticated, login, register } from '../controllers/auth.controllers.js'
import protect from '../middleware/auth.middleware.js'

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/is-auth", protect, isAuthenticated)

export default authRouter