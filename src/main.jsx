import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Card from './assets/components/card'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Card linkToApi={"https://pokeapi.co/api/v2/pokemon/ditto"}></Card>
  </StrictMode>,
)
