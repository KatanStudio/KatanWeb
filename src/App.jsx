import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Servicios from './pages/Servicios.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Proceso from './pages/Proceso.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Briefing from './pages/Briefing.jsx'
import Contacto from './pages/Contacto.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/proceso" element={<Proceso />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/briefing" element={<Briefing />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  )
}
