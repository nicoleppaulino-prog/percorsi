import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client.js'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorNote from '../components/ErrorNote.jsx'
import EventoModal from '../components/EventoModal.jsx'
import IntensityBadge from '../components/IntensityBadge.jsx'
import Loading from '../components/Loading.jsx'
import ProgressoModal from '../components/ProgressoModal.jsx'
import { useCarica } from '../hooks/useCarica.js'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { formatData, formatDataOra, formatEta, formatMedia, plurale } from '../utils/format.js'
import { calcolaStatistiche, dividiStimoli } from '../utils/stats.js'

function Riepilogo({ stat }) {
  if (stat.totale === 0) {
    return <p className="pc-summary">Ancora nessun evento registrato.</p>
  }
  return (
    <>
      <p className="pc-summary">
        {plurale(stat.totale, 'evento registrato', 'eventi registrati')}, {stat.ultimi30Giorni} negli ultimi 30
        giorni. Intensità media: {formatMedia(stat.intensitaMedia)} su 5.
      </p>
      {stat.stimoliFrequenti.length > 0 && (
        <section className="pc-patterns" aria-labelledby="titolo-stimoli">
          <h2 id="titolo-stimoli">Stimoli che tornano più spesso</h2>
          <ul className="pc-tags list-unstyled mb-0">
            {stat.stimoliFrequenti.map(({ nome, conteggio }) => (
              <li key={nome} className="pc-tag">
                {nome} <em>{plurale(conteggio, 'volta', 'volte')}</em>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default function BambinoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    dati: scheda,
    caricamento,
    errore,
    ricarica,
  } = useCarica(async () => {
    const [bambino, eventi, progressi] = await Promise.all([
      api.bambini.dettaglio(id),
      api.eventi.elenco(id),
      api.progressi.elenco(id),
    ])
    return { bambino, eventi, progressi }
  }, [id])

  useTitoloPagina(scheda?.bambino?.nome ?? 'Diario')

  const [tab, setTab] = useState('eventi')
  const [modale, setModale] = useState(null) // 'evento' | 'progresso'
  const [daEliminare, setDaEliminare] = useState(null) // { tipo, id }

  const stat = useMemo(() => calcolaStatistiche(scheda?.eventi ?? []), [scheda])

  if (caricamento && !scheda) return <Loading />
  if (errore && !scheda) {
    return (
      <>
        <Link to="/diario" className="pc-back">
          Torna al diario
        </Link>
        <ErrorNote messaggio={errore} onRiprova={ricarica} />
      </>
    )
  }
  if (!scheda) return null

  const { bambino, eventi, progressi } = scheda

  function dopoSalvataggio() {
    setModale(null)
    ricarica()
  }

  async function eliminaSelezionato() {
    if (daEliminare.tipo === 'evento') await api.eventi.elimina(bambino.id, daEliminare.id)
    if (daEliminare.tipo === 'progresso') await api.progressi.elimina(bambino.id, daEliminare.id)
    if (daEliminare.tipo === 'bambino') {
      await api.bambini.elimina(bambino.id)
      navigate('/diario', { replace: true })
      return
    }
    setDaEliminare(null)
    ricarica()
  }

  const testiConferma = {
    evento: {
      titolo: 'Eliminare questo evento?',
      testo: 'L’evento sparirà dal diario e dai conteggi. Non si può annullare.',
    },
    progresso: {
      titolo: 'Eliminare questo progresso?',
      testo: 'La nota sparirà dal diario. Non si può annullare.',
    },
    bambino: {
      titolo: `Eliminare il diario di ${bambino.nome}?`,
      testo: 'Verranno eliminati anche tutti gli eventi sensoriali e i progressi. Non si può annullare.',
    },
  }

  return (
    <>
      <Link to="/diario" className="pc-back">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Torna al diario
      </Link>

      <div className="pc-page-head mb-0">
        <div>
          <h1>{bambino.nome}</h1>
          {bambino.eta !== null && bambino.eta !== undefined && <p>{formatEta(bambino.eta)}</p>}
        </div>
      </div>
      {bambino.noteGenerali && <p className="mt-3 pc-measure">{bambino.noteGenerali}</p>}
      <Riepilogo stat={stat} />
      <ErrorNote messaggio={errore} onRiprova={ricarica} className="mt-3" />

      <Nav variant="underline" className="pc-tabs" activeKey={tab} onSelect={(chiave) => setTab(chiave)}>
        <Nav.Item>
          <Nav.Link eventKey="eventi">Eventi sensoriali ({eventi.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="progressi">Progressi ({progressi.length})</Nav.Link>
        </Nav.Item>
      </Nav>

      {tab === 'eventi' && (
        <section aria-label="Eventi sensoriali">
          <div className="pc-toolbar">
            <h2>Il percorso degli eventi</h2>
            <Button variant="primary" onClick={() => setModale('evento')}>
              Registra un evento
            </Button>
          </div>

          {eventi.length === 0 ? (
            <EmptyState
              titolo="Nessun evento registrato"
              testo="Quando succede qualcosa, segna dove eri, cosa può averlo scatenato e quanto è stato forte. Bastano pochi tocchi."
            >
              <Button variant="primary" onClick={() => setModale('evento')}>
                Registra il primo evento
              </Button>
            </EmptyState>
          ) : (
            <ol className="pc-timeline">
              {eventi.map((evento) => (
                <li className="pc-stop" key={evento.id}>
                  <span
                    className={`pc-stop-dot pc-level-${evento.intensita}`}
                    style={{ '--dot': `${0.7 + evento.intensita * 0.2}rem` }}
                    aria-hidden="true"
                  />
                  <article className="pc-stop-card">
                    <div className="pc-stop-head">
                      <div>
                        <span className="pc-stop-when">{formatDataOra(evento.dataOra)}</span>
                        {evento.luogo && <span className="pc-stop-where">, {evento.luogo}</span>}
                      </div>
                      <IntensityBadge valore={evento.intensita} />
                    </div>
                    {dividiStimoli(evento.stimolo).length > 0 && (
                      <ul className="pc-tags list-unstyled mt-2 mb-0">
                        {dividiStimoli(evento.stimolo).map((stimolo) => (
                          <li key={stimolo} className="pc-tag">
                            {stimolo}
                          </li>
                        ))}
                      </ul>
                    )}
                    {evento.reazioneOsservata && (
                      <p className="pc-field-note">
                        <b>Come ha reagito</b>
                        {evento.reazioneOsservata}
                      </p>
                    )}
                    {evento.cosaHaAiutato && (
                      <p className="pc-field-note">
                        <b>Cosa ha aiutato</b>
                        {evento.cosaHaAiutato}
                      </p>
                    )}
                    <button
                      type="button"
                      className="btn btn-link pc-delete mt-2"
                      onClick={() => setDaEliminare({ tipo: 'evento', id: evento.id })}
                    >
                      Elimina
                    </button>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {tab === 'progressi' && (
        <section aria-label="Progressi">
          <div className="pc-toolbar">
            <h2>I passi avanti</h2>
            <Button variant="primary" onClick={() => setModale('progresso')}>
              Annota un progresso
            </Button>
          </div>

          {progressi.length === 0 ? (
            <EmptyState
              titolo="Nessun progresso annotato"
              testo="Una parola nuova, un’autonomia in più, una giornata serena: scrivilo qui, tra qualche mese farà piacere rileggerlo."
            >
              <Button variant="primary" onClick={() => setModale('progresso')}>
                Annota il primo progresso
              </Button>
            </EmptyState>
          ) : (
            <ul className="list-unstyled d-grid gap-3">
              {progressi.map((progresso) => (
                <li key={progresso.id} className="pc-stop-card">
                  <div className="pc-stop-head">
                    <span className="pc-stop-when">{formatData(progresso.data)}</span>
                    <span className="pc-cat">{progresso.area}</span>
                  </div>
                  {progresso.nota && <p className="mb-0">{progresso.nota}</p>}
                  <button
                    type="button"
                    className="btn btn-link pc-delete mt-2"
                    onClick={() => setDaEliminare({ tipo: 'progresso', id: progresso.id })}
                  >
                    Elimina
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <hr className="my-5" />
      <Button variant="outline-danger" size="sm" onClick={() => setDaEliminare({ tipo: 'bambino' })}>
        Elimina il diario di {bambino.nome}
      </Button>

      <EventoModal
        show={modale === 'evento'}
        bambinoId={bambino.id}
        onHide={() => setModale(null)}
        onSalvato={dopoSalvataggio}
      />
      <ProgressoModal
        show={modale === 'progresso'}
        bambinoId={bambino.id}
        onHide={() => setModale(null)}
        onSalvato={dopoSalvataggio}
      />
      <ConfirmModal
        show={daEliminare !== null}
        titolo={daEliminare ? testiConferma[daEliminare.tipo].titolo : ''}
        testo={daEliminare ? testiConferma[daEliminare.tipo].testo : ''}
        onConferma={eliminaSelezionato}
        onAnnulla={() => setDaEliminare(null)}
      />
    </>
  )
}
