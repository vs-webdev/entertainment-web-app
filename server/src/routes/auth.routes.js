import express from 'express'
import { register } from '../controllers/auth.controllers.js'

const authRouter = express.Router()

authRouter.post("/register", register)

export default authRouter