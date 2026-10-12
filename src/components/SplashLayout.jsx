import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Loader from './Loader.jsx'

// Marca en localStorage: el splash solo se muestra en la primera visita
// del navegador (mencionada en la política de cookies)
const STORAGE_KEY = 'katanSplashVisto'

function splashSeen() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

// Se marca tras el primer montaje: si el layout se vuelve a montar
// (p. ej. al volver a la home desde la 404), no se repite el splash
let splashShown = false

export default function SplashLayout() {
  const [showSplash] = useState(() => !splashShown && !splashSeen())

  useEffect(() => {
    splashShown = true
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Sin acceso a localStorage (p. ej. modo privado): se mostrará en cada visita
    }
  }, [])

  return (
    <>
      {showSplash && <Loader />}
      <Outlet />
    </>
  )
}
