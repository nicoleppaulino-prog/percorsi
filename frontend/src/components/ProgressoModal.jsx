import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { api } from '../api/client.js'
import { AREE_PROGRESSO } from '../utils/constants.js'
import { oggiPerInput } from '../utils/format.js'
import ErrorNote from './ErrorNote.jsx'

/** Finestra per annotare un passo avanti del bambino. */
export default function ProgressoModal({ show, bambinoId, onHide, onSalvato }) {
  const [data, setData] = useState(oggiPerInput())
  const [area, setArea] = useState(AREE_PROGRESSO[0])
  const [nota, setNota] = useState('')
  const [errore, setErrore] = useState(null)
  const [invio, setInvio] = useState(false)

  useEffect(() => {
    if (show) {
      setData(oggiPerInput())
      setArea(AREE_PROGRESSO[0])
      setNota('')
      setErrore(null)
      setInvio(false)
    }
  }, [show])

  async function salva(evento) {
    evento.preventDefault()
    setInvio(true)
    setErrore(null)
    try {
      await api.progressi.crea(bambinoId, { data, area, nota: nota.trim() || null })
      onSalvato()
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
            Annota un progresso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorNote messaggio={errore} />
          <Form.Group className="mb-3" controlId="progresso-data">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ maxWidth: '12rem' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="progresso-area">
            <Form.Label>Area</Form.Label>
            <Form.Select value={area} onChange={(e) => setArea(e.target.value)}>
              {AREE_PROGRESSO.map((voce) => (
                <option key={voce} value={voce}>
                  {voce}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="progresso-nota">
            <Form.Label>Cosa è successo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={2000}
              placeholder="Es. oggi ha chiesto l’acqua usando una parola"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide} disabled={invio}>
            Annulla
          </Button>
          <Button type="submit" variant="primary" disabled={invio}>
            {invio ? 'Salvataggio…' : 'Salva progresso'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
