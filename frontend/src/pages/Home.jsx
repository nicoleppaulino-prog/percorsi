import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { RUOLO_GENITORE } from '../utils/constants.js'

// Le tappe del sentiero di esempio: x/y sono percentuali dell'immagine, d e' il ritardo dell'apparizione.
// Le posizioni seguono i punti del percorso disegnato nell'SVG qui sotto (viewBox 520 x 420).
const TAPPE = [
  { x: '41.2%', y: '67.1%', tx: '-108%', ty: '-135%', d: '1.0s', titolo: 'Parco', testo: 'Tranquillo, 1/5' },
  { x: '66.5%', y: '58.6%', tx: '1.6rem', ty: '-30%', d: '1.5s', titolo: 'Supermercato', testo: 'Rumore e luci, 4/5' },
  { x: '75.4%', y: '30.5%', tx: '-12%', ty: '1.3rem', tySm: '0.9rem', d: '2.0s', titolo: 'Festa di compleanno', testo: 'Folla, 3/5' },
  { x: '93.8%', y: '8.6%', tx: '-108%', ty: '-50%', d: '2.4s', titolo: 'Ha aiutato', testo: 'Cuffie e una pausa fuori' },
]

function Sentiero() {
  return (
    <div className="pc-trail" aria-hidden="true">
      <svg viewBox="0 0 520 420" focusable="false">
        <path
          className="pc-trail-line"
          pathLength="1"
          d="M36 372 C150 372 130 286 214 282 S330 330 346 246 S300 150 392 128 S470 70 488 36"
        />
        <circle className="pc-trail-dot" cx="36" cy="372" r="8" fill="var(--pc-ramp-1)" style={{ '--d': '0.3s' }} />
        <circle className="pc-trail-dot" cx="214" cy="282" r="9" fill="var(--pc-ramp-1)" style={{ '--d': '1.0s' }} />
        <circle className="pc-trail-dot" cx="346" cy="246" r="18" fill="var(--pc-ramp-4)" style={{ '--d': '1.5s' }} />
        <circle className="pc-trail-dot" cx="392" cy="128" r="15" fill="var(--pc-ramp-3)" style={{ '--d': '2.0s' }} />
        <circle className="pc-trail-dot" cx="488" cy="36" r="10" fill="var(--pc-ramp-2)" style={{ '--d': '2.4s' }} />
      </svg>
      {TAPPE.map((tappa) => (
        <div
          key={tappa.titolo}
          className="pc-trail-note"
          style={{ '--x': tappa.x, '--y': tappa.y, '--tx': tappa.tx, '--ty': tappa.ty, '--ty-sm': tappa.tySm ?? tappa.ty, '--d': tappa.d }}
        >
          <strong>{tappa.titolo}</strong>
          <span>{tappa.testo}</span>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  useTitoloPagina(null)
  const { utente } = useAuth()
  const eGenitore = utente?.ruolo === RUOLO_GENITORE

  return (
    <>
      <section className="pc-hero">
        <div>
          <h1>Capire cosa succede, un momento alla volta.</h1>
          <p className="pc-lead">
            Percorsi è il diario in cui segni quando, dove e perché tuo figlio ha reagito a un rumore, a una luce o
            alla folla. E il posto dove altre famiglie ti rispondono.
          </p>
          <div className="d-flex flex-wrap gap-2 mt-4">
            {!utente && (
              <>
                <Button as={Link} to="/registrati" variant="primary" size="lg">
                  Crea il tuo diario
                </Button>
                <Button as={Link} to="/accedi" variant="outline-primary" size="lg">
                  Accedi
                </Button>
              </>
            )}
            {eGenitore && (
              <>
                <Button as={Link} to="/diario" variant="primary" size="lg">
                  Apri il diario
                </Button>
                <Button as={Link} to="/community" variant="outline-primary" size="lg">
                  Vai alla community
                </Button>
              </>
            )}
            {utente && !eGenitore && (
              <Button as={Link} to="/community" variant="primary" size="lg">
                Vai alla community
              </Button>
            )}
          </div>
        </div>
        <Sentiero />
      </section>

      <section className="pc-features" aria-label="Cosa puoi fare con Percorsi">
        <div>
          <h2>Un diario solo tuo</h2>
          <p>
            Aggiungi tuo figlio o tua figlia e annota eventi sensoriali e progressi. Nessun altro utente può vedere
            il tuo diario.
          </p>
        </div>
        <div>
          <h2>Gli schemi emergono col tempo</h2>
          <p>
            Dopo qualche settimana vedi quali stimoli tornano più spesso, così puoi preparare le uscite e portare
            esempi concreti a terapisti e insegnanti.
          </p>
        </div>
        <div>
          <h2>Una community che capisce</h2>
          <p>Fai una domanda, racconta cosa ha funzionato, rispondi a un’altra famiglia.</p>
        </div>
      </section>

      <section className="pc-band" aria-labelledby="titolo-guida">
        <h2 id="titolo-guida">Non sai cosa annotare?</h2>
        <p>
          Un evento sensoriale è un momento in cui un rumore, una luce o la folla mettono in difficoltà il bambino.
          La guida spiega cosa scrivere, con un esempio.
        </p>
        <div>
          <Button as={Link} to="/guida" variant="outline-primary">
            Leggi la guida
          </Button>
        </div>
      </section>
    </>
  )
}
