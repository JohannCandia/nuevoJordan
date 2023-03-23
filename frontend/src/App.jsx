import { useState } from 'react'
import './App.css'
import FormInicio from './Components/FormInicio'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrimeraEtapa from './Components/PrimeraEtapa'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormInicio />} />
      
      <Route path="ot/:NumOT" element={<PrimeraEtapa />} />

    </Routes>
  </BrowserRouter>

  )
}

export default App
