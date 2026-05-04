import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Servicios from './pages/Servicios.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Proceso from './pages/Proceso.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Briefing from './pages/Briefing.jsx'
import Contacto from './pages/Contacto.jsx'
import Faq from './pages/Faq.jsx'
import AvisoLegal from './pages/AvisoLegal.jsx'
import Privacidad from './pages/Privacidad.jsx'
import Cookies from './pages/Cookies.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/proceso" element={<Proceso />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/briefing" element={<Briefing />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/legal/aviso-legal" element={<AvisoLegal />} />
        <Route path="/legal/privacidad" element={<Privacidad />} />
        <Route path="/legal/cookies" element={<Cookies />} />
      </Routes>
    </BrowserRouter>
  )
}
