import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { Outlet, useLocation } from 'react-router-dom'
import AppNavbar from './AppNavbar.jsx'

export default function AppLayout() {
  const { pathname } = useLocation()

  // Quando si cambia pagina si torna in cima, come in un sito normale.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="pc-shell">
      <a className="visually-hidden-focusable btn btn-primary m-2" href="#contenuto">
        Vai al contenuto
      </a>
      <AppNavbar />
      <main id="contenuto" className="pc-main">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="pc-footer">
        <Container>
          <p>
            Percorsi è uno strumento per prendere appunti e confrontarsi: non sostituisce il parere di medici e
            terapisti. Il diario di ogni bambino è visibile solo al genitore che lo ha creato.
          </p>
        </Container>
      </footer>
    </div>
  )
}
