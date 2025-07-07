import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MediaProvider } from './context/MediaContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <MediaProvider>
        <App />
      </MediaProvider>
    </BrowserRouter>
  // </StrictMode>
  ,
)
