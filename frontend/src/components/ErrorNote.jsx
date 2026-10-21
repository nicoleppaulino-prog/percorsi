import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

/** Messaggio d'errore con, se serve, il pulsante per riprovare. */
export default function ErrorNote({ messaggio, onRiprova, className = '' }) {
  if (!messaggio) return null
  return (
    <Alert variant="danger" className={className} role="alert">
      <p className="mb-0">{messaggio}</p>
      {onRiprova && (
        <Button variant="outline-danger" size="sm" className="mt-2" onClick={onRiprova}>
          Riprova
        </Button>
      )}
    </Alert>
  )
}
