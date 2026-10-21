import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { api } from '../api/client.js'
import BambinoModal from '../components/BambinoModal.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorNote from '../components/ErrorNote.jsx'
import Loading from '../components/Loading.jsx'
import { useCarica } from '../hooks/useCarica.js'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { anteprima, formatEta, iniziale } from '../utils/format.js'

export default function Diario() {
  useTitoloPagina('Il tuo diario')
  const { dati: bambini, caricamento, errore, ricarica } = useCarica(() => api.bambini.elenco(), [])
  const [mostraModale, setMostraModale] = useState(false)

  function dopoSalvataggio() {
    setMostraModale(false)
    ricarica()
  }

  return (
    <>
      <div className="pc-page-head">
        <div>
          <h1>Il tuo diario</h1>
          <p>Visibile solo a te.</p>
        </div>
        {bambini?.length > 0 && (
          <Button variant="primary" onClick={() => setMostraModale(true)}>
            Aggiungi un bambino
          </Button>
        )}
      </div>

      {caricamento && !bambini && <Loading />}
      <ErrorNote messaggio={errore} onRiprova={ricarica} />

      {bambini && bambini.length === 0 && (
        <EmptyState
          titolo="Il diario è ancora vuoto"
          testo="Comincia aggiungendo tuo figlio o tua figlia. Poi potrai registrare gli eventi sensoriali e i progressi."
        >
          <Button variant="primary" onClick={() => setMostraModale(true)}>
            Aggiungi un bambino
          </Button>
        </EmptyState>
      )}

      {bambini?.length > 0 && (
        <div className="pc-tiles">
          {bambini.map((bambino) => (
            <Link key={bambino.id} to={`/diario/${bambino.id}`} className="pc-tile">
              <span className="pc-avatar" aria-hidden="true">
                {iniziale(bambino.nome)}
              </span>
              <span>
                <h2>{bambino.nome}</h2>
                {bambino.eta !== null && bambino.eta !== undefined && <p>{formatEta(bambino.eta)}</p>}
                {bambino.noteGenerali && <p>{anteprima(bambino.noteGenerali, 110)}</p>}
              </span>
            </Link>
          ))}
        </div>
      )}

      <BambinoModal show={mostraModale} onHide={() => setMostraModale(false)} onSalvato={dopoSalvataggio} />
    </>
  )
}
