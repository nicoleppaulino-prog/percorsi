import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client.js'
import ConfirmModal from '../components/ConfirmModal.jsx'
import ErrorNote from '../components/ErrorNote.jsx'
import Loading from '../components/Loading.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useCarica } from '../hooks/useCarica.js'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { NOME_RUOLO } from '../utils/constants.js'
import { formatDataOra, plurale } from '../utils/format.js'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { utente } = useAuth()

  const {
    dati: scheda,
    caricamento,
    errore,
    ricarica,
  } = useCarica(async () => {
    const [post, commenti] = await Promise.all([api.post.dettaglio(id), api.commenti.elenco(id)])
    return { post, commenti }
  }, [id])

  useTitoloPagina(scheda?.post?.titolo ?? 'Community')

  const [testo, setTesto] = useState('')
  const [erroreInvio, setErroreInvio] = useState(null)
  const [invio, setInvio] = useState(false)
  const [daEliminare, setDaEliminare] = useState(null) // { tipo: 'post' | 'commento', id }

  async function commenta(evento) {
    evento.preventDefault()
    setInvio(true)
    setErroreInvio(null)
    try {
      await api.commenti.crea(id, { testo: testo.trim() })
      setTesto('')
      ricarica()
    } catch (e) {
      setErroreInvio(e.message)
    } finally {
      setInvio(false)
    }
  }

  async function eliminaSelezionato() {
    if (daEliminare.tipo === 'post') {
      await api.post.elimina(id)
      navigate('/community', { replace: true })
      return
    }
    await api.commenti.elimina(id, daEliminare.id)
    setDaEliminare(null)
    ricarica()
  }

  if (caricamento && !scheda) return <Loading />
  if (errore && !scheda) {
    return (
      <>
        <Link to="/community" className="pc-back">
          Torna alla community
        </Link>
        <ErrorNote messaggio={errore} onRiprova={ricarica} />
      </>
    )
  }
  if (!scheda) return null

  const { post, commenti } = scheda
  const mio = (autore) => autore.id === utente?.id

  return (
    <>
      <Link to="/community" className="pc-back">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Torna alla community
      </Link>

      <article>
        <h1>{post.titolo}</h1>
        <div className="pc-meta mb-4">
          <span className="pc-cat">{post.categoria}</span>
          <span>
            {post.autore.nome} ({NOME_RUOLO[post.autore.ruolo] ?? 'community'})
          </span>
          <span>{formatDataOra(post.dataCreazione)}</span>
        </div>
        <p className="pc-post-body">{post.testo}</p>
        {mio(post.autore) && (
          <button
            type="button"
            className="btn btn-link pc-delete p-0"
            onClick={() => setDaEliminare({ tipo: 'post' })}
          >
            Elimina il post
          </button>
        )}
      </article>

      <hr className="my-5" />

      <section aria-labelledby="titolo-commenti">
        <h2 id="titolo-commenti" className="h4">
          {commenti.length === 0 ? 'Commenti' : `Commenti (${plurale(commenti.length, 'risposta', 'risposte')})`}
        </h2>

        {commenti.length === 0 ? (
          <p className="text-body-secondary">Nessuno ha ancora risposto.</p>
        ) : (
          <ul className="pc-comments">
            {commenti.map((commento) => (
              <li key={commento.id} className="pc-comment">
                <div className="pc-meta">
                  <strong>{commento.autore.nome}</strong>
                  <span>{formatDataOra(commento.dataCreazione)}</span>
                  {mio(commento.autore) && (
                    <button
                      type="button"
                      className="btn btn-link pc-delete p-0"
                      onClick={() => setDaEliminare({ tipo: 'commento', id: commento.id })}
                    >
                      Elimina
                    </button>
                  )}
                </div>
                <p>{commento.testo}</p>
              </li>
            ))}
          </ul>
        )}

        <Form onSubmit={commenta} className="mt-4 pc-measure">
          <ErrorNote messaggio={erroreInvio} />
          <Form.Group controlId="nuovo-commento">
            <Form.Label>Scrivi una risposta</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              maxLength={2000}
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3" disabled={invio || !testo.trim()}>
            {invio ? 'Invio…' : 'Rispondi'}
          </Button>
        </Form>
      </section>

      <ConfirmModal
        show={daEliminare !== null}
        titolo={daEliminare?.tipo === 'post' ? 'Eliminare questo post?' : 'Eliminare questo commento?'}
        testo={
          daEliminare?.tipo === 'post'
            ? 'Spariranno anche tutti i commenti. Non si può annullare.'
            : 'Il commento sparirà. Non si può annullare.'
        }
        onConferma={eliminaSelezionato}
        onAnnulla={() => setDaEliminare(null)}
      />
    </>
  )
}
