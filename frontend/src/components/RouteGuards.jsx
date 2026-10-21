import Button from 'react-bootstrap/Button'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { RUOLO_GENITORE } from '../utils/constants.js'
import EmptyState from './EmptyState.jsx'
import Loading from './Loading.jsx'

/** Pagine che richiedono di essere loggati: chi non lo e' viene mandato al login (e poi riportato qui). */
export function RichiedeAccesso() {
  const { utente, pronto } = useAuth()
  const posizione = useLocation()

  if (!pronto) return <Loading />
  if (!utente) return <Navigate to="/accedi" replace state={{ da: posizione.pathname }} />
  return <Outlet />
}

/** Il diario e' riservato ai genitori; chi ha scelto "solo community" vede un invito a usare la community. */
export function RichiedeGenitore() {
  const { utente } = useAuth()

  if (utente?.ruolo !== RUOLO_GENITORE) {
    return (
      <EmptyState
        titolo="Il diario è riservato ai genitori"
        testo="Con il tuo account puoi leggere e scrivere nella community."
      >
        <Button as={Link} to="/community" variant="primary">
          Vai alla community
        </Button>
      </EmptyState>
    )
  }
  return <Outlet />
}
