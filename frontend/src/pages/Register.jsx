import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ErrorNote from '../components/ErrorNote.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { RUOLO_COMMUNITY, RUOLO_GENITORE } from '../utils/constants.js'

export default function Register() {
  useTitoloPagina('Crea un account')
  const { utente, registra } = useAuth()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ruolo, setRuolo] = useState(RUOLO_GENITORE)
  const [errore, setErrore] = useState(null)
  const [erroriCampo, setErroriCampo] = useState({})
  const [invio, setInvio] = useState(false)

  if (utente) {
    return <Navigate to={utente.ruolo === RUOLO_GENITORE ? '/diario' : '/community'} replace />
  }

  async function invia(evento) {
    evento.preventDefault()
    setInvio(true)
    setErrore(null)
    setErroriCampo({})
    try {
      const nuovo = await registra({ nome: nome.trim(), email: email.trim(), password, ruolo })
      navigate(nuovo.ruolo === RUOLO_GENITORE ? '/diario' : '/community', { replace: true })
    } catch (e) {
      setErrore(e.message)
      setErroriCampo(e.errori ?? {})
      setInvio(false)
    }
  }

  return (
    <div className="pc-auth">
      <h1>Crea il tuo account</h1>
      <p className="text-body-secondary mb-0">Ci vuole meno di un minuto.</p>

      <div className="pc-auth-card">
        <ErrorNote messaggio={errore} />
        <Form onSubmit={invia}>
          <Form.Group className="mb-3" controlId="reg-nome">
            <Form.Label>Come ti chiami?</Form.Label>
            <Form.Control
              autoComplete="given-name"
              required
              maxLength={80}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              isInvalid={!!erroriCampo.nome}
            />
            <Form.Control.Feedback type="invalid">{erroriCampo.nome}</Form.Control.Feedback>
            <Form.Text>Questo nome è visibile agli altri nella community.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reg-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!erroriCampo.email}
            />
            <Form.Control.Feedback type="invalid">{erroriCampo.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="reg-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={72}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!erroriCampo.password}
            />
            <Form.Control.Feedback type="invalid">{erroriCampo.password}</Form.Control.Feedback>
            <Form.Text>Almeno 8 caratteri.</Form.Text>
          </Form.Group>

          <fieldset className="mb-4">
            <legend className="form-label">Come vuoi usare Percorsi?</legend>
            <div className="d-grid gap-2">
              <label className="pc-choice">
                <input
                  type="radio"
                  name="ruolo"
                  checked={ruolo === RUOLO_GENITORE}
                  onChange={() => setRuolo(RUOLO_GENITORE)}
                />
                <span>
                  <strong>Sono genitore o caregiver</strong>
                  <small>Diario privato dei miei figli e community.</small>
                </span>
              </label>
              <label className="pc-choice">
                <input
                  type="radio"
                  name="ruolo"
                  checked={ruolo === RUOLO_COMMUNITY}
                  onChange={() => setRuolo(RUOLO_COMMUNITY)}
                />
                <span>
                  <strong>Voglio solo partecipare alla community</strong>
                  <small>Leggo e rispondo ai post, senza diario.</small>
                </span>
              </label>
            </div>
          </fieldset>

          <Button type="submit" variant="primary" className="w-100" disabled={invio}>
            {invio ? 'Creazione in corso…' : 'Crea account'}
          </Button>
        </Form>
      </div>

      <p className="mt-4">
        Hai già un account? <Link to="/accedi">Accedi</Link>
      </p>
    </div>
  )
}
