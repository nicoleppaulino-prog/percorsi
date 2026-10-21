import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'
import EmptyState from '../components/EmptyState.jsx'
import ErrorNote from '../components/ErrorNote.jsx'
import Loading from '../components/Loading.jsx'
import PostModal from '../components/PostModal.jsx'
import { useCarica } from '../hooks/useCarica.js'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { CATEGORIE_POST } from '../utils/constants.js'
import { anteprima, formatData, plurale } from '../utils/format.js'

export default function Community() {
  useTitoloPagina('Community')
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState('')
  const [mostraModale, setMostraModale] = useState(false)
  const {
    dati: elenco,
    caricamento,
    errore,
    ricarica,
  } = useCarica(() => api.post.elenco(categoria || null), [categoria])

  return (
    <>
      <div className="pc-page-head">
        <div>
          <h1>Community</h1>
          <p>Genitori e persone vicine ai bambini si scambiano esperienze.</p>
        </div>
        <Button variant="primary" onClick={() => setMostraModale(true)}>
          Scrivi un post
        </Button>
      </div>

      <div className="pc-filters" role="group" aria-label="Filtra per argomento">
        {['', ...CATEGORIE_POST].map((voce) => (
          <button
            key={voce || 'tutti'}
            type="button"
            className={`pc-filter${categoria === voce ? ' is-on' : ''}`}
            aria-pressed={categoria === voce}
            onClick={() => setCategoria(voce)}
          >
            {voce || 'Tutti'}
          </button>
        ))}
      </div>

      {caricamento && !elenco && <Loading />}
      <ErrorNote messaggio={errore} onRiprova={ricarica} />

      {elenco && elenco.length === 0 && (
        <EmptyState
          titolo="Ancora nessun post qui"
          testo={categoria ? `Nessuno ha ancora scritto in “${categoria}”.` : 'Sii la prima persona a scrivere.'}
        >
          <Button variant="primary" onClick={() => setMostraModale(true)}>
            Scrivi un post
          </Button>
        </EmptyState>
      )}

      {elenco && elenco.length > 0 && (
        <ul className="pc-posts">
          {elenco.map((post) => (
            <li key={post.id}>
              <Link to={`/community/${post.id}`} className="pc-post-row">
                <h2>{post.titolo}</h2>
                <p>{anteprima(post.testo, 160)}</p>
                <div className="pc-meta">
                  <span className="pc-cat">{post.categoria}</span>
                  <span>{post.autore.nome}</span>
                  <span>{formatData(post.dataCreazione)}</span>
                  <span>{plurale(post.numeroCommenti, 'commento', 'commenti')}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <PostModal
        show={mostraModale}
        onHide={() => setMostraModale(false)}
        onSalvato={(nuovo) => {
          setMostraModale(false)
          if (nuovo?.id) navigate(`/community/${nuovo.id}`)
          else ricarica()
        }}
      />
    </>
  )
}
