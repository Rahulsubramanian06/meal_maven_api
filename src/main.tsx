import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App.tsx'
import {Add_item} from './components/Add_item.tsx'
import { All_items_table } from './components/all_items_table.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<App />}/>
      <Route path='/items' element = {<Add_item />} />
      <Route path='/item_table' element={<All_items_table />} />
      <Route path='/item_table/:id' element={<All_items_table />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
