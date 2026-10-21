import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { api } from '../api/client.js'
import ErrorNote from './ErrorNote.jsx'

/** Finestra per aggiungere un bambino al diario. */
export default function BambinoModal({ show, onHide, onSalvato }) {
  const [nome, setNome] = useState('')
  const [eta, setEta] = useState('')
  const [note, setNote] = useState('')
  const [errore, setErrore] = useState(null)
  const [invio, setInvio] = useState(false)

  // Ogni volta che si apre, il modulo riparte vuoto.
  useEffect(() => {
    if (show) {
      setNome('')
      setEta('')
      setNote('')
      setErrore(null)
      setInvio(false)
    }
  }, [show])

  async function salva(evento) {
    evento.preventDefault()
    setInvio(true)
    setErrore(null)
    try {
      const nuovo = await api.bambini.crea({
        nome: nome.trim(),
        eta: eta === '' ? null : Number(eta),
        noteGenerali: note.trim() || null,
      })
      onSalvato(nuovo)
    } catch (e) {
      setErrore(e.message)
      setInvio(false)
    }
  }

  return (
    <Modal show={show} onHide={invio ? undefined : onHide} centered>
      <Form onSubmit={salva}>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h4">
            Aggiungi un bambino
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorNote messaggio={errore} />
          <Form.Group className="mb-3" controlId="bambino-nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control required maxLength={80} value={nome} onChange={(e) => setNome(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bambino-eta">
            <Form.Label>Età (facoltativa)</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={30}
              inputMode="numeric"
              style={{ maxWidth: '8rem' }}
              value={eta}
              onChange={(e) => setEta(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="bambino-note">
            <Form.Label>Note utili (facoltative)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={2000}
              placeholder="Passioni, sensibilità già note, cose che aiutano di solito…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide} disabled={invio}>
            Annulla
          </Button>
          <Button type="submit" variant="primary" disabled={invio}>
            {invio ? 'Salvataggio…' : 'Aggiungi'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
