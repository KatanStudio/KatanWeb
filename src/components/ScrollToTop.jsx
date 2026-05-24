import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Let the browser save and restore scroll position on reload / back / forward
    history.scrollRestoration = 'auto'
  }, [])

  useEffect(() => {
    // On reload the browser already knows where the user was — don't interfere
    if (performance.getEntriesByType('navigation')[0]?.type === 'reload') return

    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
