import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'

export default function NotFound() {
  useTitoloPagina('Pagina non trovata')
  return (
    <EmptyState titolo="Questa pagina non esiste" testo="L’indirizzo potrebbe essere sbagliato o la pagina spostata.">
      <Button as={Link} to="/" variant="primary">
        Torna alla home
      </Button>
    </EmptyState>
  )
}
