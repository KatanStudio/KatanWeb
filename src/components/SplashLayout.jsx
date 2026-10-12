import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Loader from './Loader.jsx'

// Se marca tras el primer montaje: si el layout se vuelve a montar
// (p. ej. al volver a la home desde la 404), no se repite el splash
let splashShown = false

export default function SplashLayout() {
  const [showSplash] = useState(() => !splashShown)

  useEffect(() => {
    splashShown = true
  }, [])

  return (
    <>
      {showSplash && <Loader />}
      <Outlet />
    </>
  )
}
