import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mediaRouter from './src/routes/media.routes.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

// routes
app.use("/api", mediaRouter)

app.listen(PORT, () => console.log(PORT))