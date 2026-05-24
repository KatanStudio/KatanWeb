import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './pages/MainPage.jsx'
import Briefing from './pages/Briefing.jsx'
import AvisoLegal from './pages/AvisoLegal.jsx'
import Privacidad from './pages/Privacidad.jsx'
import Cookies from './pages/Cookies.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Loader />
      <ScrollToTop />
      <Cursor />
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* Rutas separadas */}
        <Route path="/briefing" element={<Briefing />} />
        <Route path="/legal/aviso-legal" element={<AvisoLegal />} />
        <Route path="/legal/privacidad" element={<Privacidad />} />
        <Route path="/legal/cookies" element={<Cookies />} />

        {/* Redirects de rutas antiguas a secciones del scroll */}
        <Route path="/servicios" element={<Navigate to="/#servicios" replace />} />
        <Route path="/nosotros" element={<Navigate to="/#nosotros" replace />} />
        <Route path="/proceso" element={<Navigate to="/#proceso" replace />} />
        <Route path="/portfolio" element={<Navigate to="/#portfolio" replace />} />
        <Route path="/faq" element={<Navigate to="/#faq" replace />} />
        <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
