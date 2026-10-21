import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ErrorNote from './ErrorNote.jsx'

/**
 * Finestra di conferma prima di un'azione che non si puo' annullare.
 * `onConferma` puo' essere asincrona: se fallisce mostra l'errore senza chiudersi.
 */
export default function ConfirmModal({ show, titolo, testo, etichetta = 'Elimina', onConferma, onAnnulla }) {
  const [inCorso, setInCorso] = useState(false)
  const [errore, setErrore] = useState(null)

  async function conferma() {
    setInCorso(true)
    setErrore(null)
    try {
      await onConferma()
    } catch (e) {
      setErrore(e.message)
    } finally {
      setInCorso(false)
    }
  }

  function chiudi() {
    if (inCorso) return
    setErrore(null)
    onAnnulla()
  }

  return (
    <Modal show={show} onHide={chiudi} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h2" className="h4">
          {titolo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{testo}</p>
        <ErrorNote messaggio={errore} className="mt-3 mb-0" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={chiudi} disabled={inCorso}>
          Annulla
        </Button>
        <Button variant="danger" onClick={conferma} disabled={inCorso}>
          {inCorso ? 'Un momento…' : etichetta}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
