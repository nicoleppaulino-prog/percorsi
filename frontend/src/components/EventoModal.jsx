import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import { api } from '../api/client.js'
import { STIMOLI } from '../utils/constants.js'
import { adessoPerInput } from '../utils/format.js'
import ChipGroup from './ChipGroup.jsx'
import ErrorNote from './ErrorNote.jsx'
import VolumePicker from './VolumePicker.jsx'

/** Finestra per registrare un evento sensoriale: pochi tocchi, il resto e' facoltativo. */
export default function EventoModal({ show, bambinoId, onHide, onSalvato }) {
  const [dataOra, setDataOra] = useState(adessoPerInput())
  const [luogo, setLuogo] = useState('')
  const [stimoli, setStimoli] = useState([])
  const [intensita, setIntensita] = useState(null)
  const [reazione, setReazione] = useState('')
  const [aiuto, setAiuto] = useState('')
  const [errore, setErrore] = useState(null)
  const [invio, setInvio] = useState(false)

  useEffect(() => {
    if (show) {
      setDataOra(adessoPerInput())
      setLuogo('')
      setStimoli([])
      setIntensita(null)
      setReazione('')
      setAiuto('')
      setErrore(null)
      setInvio(false)
    }
  }, [show])

  async function salva(evento) {
    evento.preventDefault()
    if (!intensita) {
      setErrore('Scegli quanto è stato forte, da 1 a 5.')
      return
    }
    setInvio(true)
    setErrore(null)
    try {
      await api.eventi.crea(bambinoId, {
        dataOra,
        luogo: luogo.trim() || null,
        stimolo: stimoli.length ? stimoli.join(', ') : null,
        reazioneOsservata: reazione.trim() || null,
        cosaHaAiutato: aiuto.trim() || null,
        intensita,
      })
      onSalvato()
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
            Registra un evento sensoriale
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-body-secondary">
            Non sai cosa scrivere? <Link to="/guida">Leggi la guida</Link>.
          </p>
          <ErrorNote messaggio={errore} />

          <Form.Group className="mb-3" controlId="evento-quando">
            <Form.Label>Quando è successo</Form.Label>
            <Form.Control
              type="datetime-local"
              required
              value={dataOra}
              onChange={(e) => setDataOra(e.target.value)}
              style={{ maxWidth: '16rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="evento-dove">
            <Form.Label>Dove</Form.Label>
            <Form.Control
              maxLength={120}
              placeholder="Es. supermercato, scuola, casa"
              value={luogo}
              onChange={(e) => setLuogo(e.target.value)}
            />
          </Form.Group>

          <div className="mb-4">
            <div className="form-label" id="etichetta-stimoli">
              Cosa può averlo scatenato
            </div>
            <ChipGroup
              opzioni={STIMOLI}
              selezionate={stimoli}
              onChange={setStimoli}
              etichetta="Cosa può averlo scatenato"
            />
          </div>

          <div className="mb-4">
            <VolumePicker valore={intensita} onChange={setIntensita} />
          </div>

          <Form.Group className="mb-3" controlId="evento-reazione">
            <Form.Label>Come ha reagito</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              maxLength={1000}
              placeholder="Es. si è coperto le orecchie e ha iniziato a dondolarsi"
              value={reazione}
              onChange={(e) => setReazione(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="evento-aiuto">
            <Form.Label>Cosa ha aiutato</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              maxLength={1000}
              placeholder="Es. siamo usciti all’aperto, ha messo le cuffie"
              value={aiuto}
              onChange={(e) => setAiuto(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide} disabled={invio}>
            Annulla
          </Button>
          <Button type="submit" variant="primary" disabled={invio}>
            {invio ? 'Salvataggio…' : 'Salva evento'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
