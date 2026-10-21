import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ErrorNote from '../components/ErrorNote.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { RUOLO_GENITORE } from '../utils/constants.js'

export default function Login() {
  useTitoloPagina('Accedi')
  const { utente, accedi, messaggio } = useAuth()
  const navigate = useNavigate()
  const posizione = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState(null)
  const [invio, setInvio] = useState(false)

  // Chi e' gia' dentro non ha motivo di stare qui.
  if (utente) {
    return <Navigate to={utente.ruolo === RUOLO_GENITORE ? '/diario' : '/community'} replace />
  }

  async function invia(evento) {
    evento.preventDefault()
    setInvio(true)
    setErrore(null)
    try {
      const loggato = await accedi(email, password)
      const destinazione = posizione.state?.da ?? (loggato.ruolo === RUOLO_GENITORE ? '/diario' : '/community')
      navigate(destinazione, { replace: true })
    } catch (e) {
      setErrore(e.message)
      setInvio(false)
    }
  }

  return (
    <div className="pc-auth">
      <h1>Accedi</h1>
      <p className="text-body-secondary mb-0">Riprendi dal tuo diario e dalla community.</p>

      <div className="pc-auth-card">
        {messaggio && !errore && <ErrorNote messaggio={messaggio} />}
        <ErrorNote messaggio={errore} />
        <Form onSubmit={invia}>
          <Form.Group className="mb-3" controlId="login-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={invio}>
            {invio ? 'Accesso in corso…' : 'Accedi'}
          </Button>
        </Form>
      </div>

      <p className="mt-4">
        Non hai ancora un account? <Link to="/registrati">Creane uno</Link>
      </p>
    </div>
  )
}
