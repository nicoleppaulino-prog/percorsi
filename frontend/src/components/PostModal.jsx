import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { api } from '../api/client.js'
import { CATEGORIE_POST } from '../utils/constants.js'
import ErrorNote from './ErrorNote.jsx'

/** Finestra per scrivere un nuovo post nella community. */
export default function PostModal({ show, onHide, onSalvato }) {
  const [titolo, setTitolo] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIE_POST[0])
  const [testo, setTesto] = useState('')
  const [errore, setErrore] = useState(null)
  const [invio, setInvio] = useState(false)

  useEffect(() => {
    if (show) {
      setTitolo('')
      setCategoria(CATEGORIE_POST[0])
      setTesto('')
      setErrore(null)
      setInvio(false)
    }
  }, [show])

  async function salva(evento) {
    evento.preventDefault()
    setInvio(true)
    setErrore(null)
    try {
      const nuovo = await api.post.crea({ titolo: titolo.trim(), categoria, testo: testo.trim() })
      onSalvato(nuovo)
    } catch (e) {
      setErrore(e.message)
      setInvio(false)
    }
  }

  return (
    <Modal show={show} onHide={invio ? undefined : onHide} centered scrollable>
      <Form onSubmit={salva}>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h4">
            Scrivi un post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorNote messaggio={errore} />
          <Form.Group className="mb-3" controlId="post-titolo">
            <Form.Label>Titolo</Form.Label>
            <Form.Control required maxLength={150} value={titolo} onChange={(e) => setTitolo(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="post-categoria">
            <Form.Label>Argomento</Form.Label>
            <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {CATEGORIE_POST.map((voce) => (
                <option key={voce} value={voce}>
                  {voce}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="post-testo">
            <Form.Label>Testo</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              required
              maxLength={5000}
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
            />
            <Form.Text>Non scrivere dati che identificano tuo figlio: la community è visibile a tutti gli iscritti.</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide} disabled={invio}>
            Annulla
          </Button>
          <Button type="submit" variant="primary" disabled={invio}>
            {invio ? 'Pubblicazione…' : 'Pubblica'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
