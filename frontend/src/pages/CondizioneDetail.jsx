import { Link, useParams } from 'react-router-dom'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { CONDIZIONI } from '../utils/condizioni.js'
import { FONTI } from '../utils/fonti.js'
import NotFound from './NotFound.jsx'

function Elenco({ voci }) {
  return (
    <ul>
      {voci.map((voce) => (
        <li key={voce}>{voce}</li>
      ))}
    </ul>
  )
}

export default function CondizioneDetail() {
  const { id } = useParams()
  const condizione = CONDIZIONI.find((c) => c.id === id)
  useTitoloPagina(condizione?.nome ?? 'Condizioni')

  if (!condizione) return <NotFound />

  const indice = CONDIZIONI.indexOf(condizione)
  const precedente = CONDIZIONI[indice - 1]
  const successiva = CONDIZIONI[indice + 1]

  return (
    <article className="pc-article pc-condizioni">
      <Link to="/condizioni" className="pc-back">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Tutte le condizioni
      </Link>

      <h1>{condizione.nome}</h1>
      <p className="pc-lead">{condizione.sintesi}</p>

      <div className="pc-avviso" role="note">
        Questa scheda non fa diagnosi. Solo uno specialista, dopo una valutazione, può dire se c’è una condizione.
        Molti bambini mostrano alcuni di questi segnali senza averla.
      </div>

      <h2>Cos’è</h2>
      {condizione.cosaE.map((paragrafo) => (
        <p key={paragrafo}>{paragrafo}</p>
      ))}

      {condizione.comune && (
        <>
          <h2>Quanto è frequente</h2>
          <p>{condizione.comune}</p>
        </>
      )}

      <h2>Segnali a cui fare attenzione</h2>
      {condizione.segnali.map((gruppo) => (
        <section key={gruppo.titolo}>
          <h3>{gruppo.titolo}</h3>
          <Elenco voci={gruppo.voci} />
        </section>
      ))}

      <h2>Cosa non è</h2>
      <Elenco voci={condizione.cosaNonE} />

      <h2>Come si arriva a una diagnosi</h2>
      {condizione.valutazione.map((paragrafo) => (
        <p key={paragrafo}>{paragrafo}</p>
      ))}

      <h2>Cosa può aiutare</h2>
      <Elenco voci={condizione.cosaAiuta} />

      <h2>Quando parlarne con il pediatra</h2>
      <Elenco voci={condizione.quando} />
      <p className="pc-nota">
        Se hai un dubbio, annota gli episodi nel diario: date, luoghi e cosa è successo sono esattamente le
        informazioni che il pediatra o lo specialista ti chiederanno.
      </p>

      <h2>Per approfondire</h2>
      <ul className="pc-fonti">
        {condizione.fonti.map((chiave) => {
          const fonte = FONTI[chiave]
          return (
            <li key={chiave}>
              <a href={fonte.url} target="_blank" rel="noopener noreferrer">
                {fonte.titolo}
              </a>
              <span>{fonte.ente}</span>
            </li>
          )
        })}
      </ul>
      <p className="text-body-secondary">
        Le fonti in inglese sono tradotte e adattate. Pagine consultate il 21 ottobre 2026. Le informazioni non
        sostituiscono il parere di un medico o di un terapista.
      </p>

      <nav className="pc-cond-nav" aria-label="Altre condizioni">
        {precedente ? <Link to={`/condizioni/${precedente.id}`}>Precedente: {precedente.nome}</Link> : <span />}
        {successiva ? <Link to={`/condizioni/${successiva.id}`}>Successiva: {successiva.nome}</Link> : <span />}
      </nav>
    </article>
  )
}
