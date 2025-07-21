import express from 'express'
import { isAuthenticated, login, logout, register } from '../controllers/auth.controllers.js'
import protect from '../middleware/auth.middleware.js'

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/is-auth", protect, isAuthenticated)

export default authRouter