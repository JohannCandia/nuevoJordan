import { useState } from 'react'
import './App.css'
import FormInicio from './Components/FormInicio'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrimeraEtapa from './Components/PrimeraEtapa'
import MonitorOT from './pages/MonitorOT'

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MonitorOT />} />
      <Route path="/OTS" element={<FormInicio />} />
      <Route path="ot/:NumOT" element={<PrimeraEtapa />} />

    </Routes>
  </BrowserRouter>

  )
}

export default App
