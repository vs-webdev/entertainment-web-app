import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mediaRouter from './src/routes/media.routes.js';
import { connectDB } from './src/config/db.js';
import authRouter from './src/routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = express()
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

// routes
app.use("/api/media", mediaRouter)
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port ${PORT}`)
})