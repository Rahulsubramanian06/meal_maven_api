import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Add_item} from './components/Add_item.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Add_item />
  </StrictMode>,
)
