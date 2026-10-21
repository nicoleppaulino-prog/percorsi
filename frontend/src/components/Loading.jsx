import Spinner from 'react-bootstrap/Spinner'

export default function Loading({ testo = 'Caricamento…' }) {
  return (
    <div className="pc-loading" role="status">
      <Spinner animation="border" size="sm" aria-hidden="true" />
      <span>{testo}</span>
    </div>
  )
}
