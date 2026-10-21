import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { CATEGORIE_CONDIZIONI, CONDIZIONI } from '../utils/condizioni.js'
import { RUOLO_GENITORE } from '../utils/constants.js'

export default function Condizioni() {
  useTitoloPagina('Conoscere le condizioni')
  const { utente } = useAuth()

  return (
    <article className="pc-article pc-condizioni">
      <h1>Conoscere le condizioni</h1>
      <p className="pc-lead">
        Le principali condizioni del neurosviluppo, del linguaggio, del movimento e genetiche, spiegate con i segnali
        da osservare, come si arriva a una diagnosi e cosa può aiutare. Ogni scheda indica le fonti ufficiali.
      </p>

      <div className="pc-avviso" role="note">
        <strong>Queste pagine non fanno diagnosi.</strong> Tanti bambini mostrano uno o più di questi comportamenti e
        crescono benissimo. Solo uno specialista, dopo una valutazione, può dire se c’è una condizione. Se qualcosa ti
        preoccupa, non aspettare: parlane con il pediatra.
      </div>

      <h2>Cosa fare se hai un dubbio</h2>
      <ol>
        <li>Parla con il pediatra. Può fare un primo controllo, anche dell’udito e della vista, e indirizzarti.</li>
        <li>
          Se serve, il pediatra ti indirizza al servizio di neuropsichiatria infantile della tua ASL, che fa la
          valutazione.
        </li>
        <li>Porta esempi concreti. Gli eventi che annoti nel diario sono proprio quello che i professionisti chiedono.</li>
      </ol>

      <div className="pc-avviso pc-avviso-urgente" role="note">
        <strong>Non aspettare che passi se:</strong>
        <ul className="mb-0 mt-2">
          <li>il bambino perde parole o abilità che prima aveva, a qualsiasi età;</li>
          <li>un neonato non sobbalza ai rumori forti, o dopo i 6 mesi non si volta verso i suoni;</li>
          <li>a 9 mesi non risponde al proprio nome;</li>
          <li>a 12 mesi non dice parole semplici e usa pochi o nessun gesto, come salutare con la mano;</li>
          <li>a 8 mesi non sta seduto, oppure a 18 mesi non cammina.</li>
        </ul>
      </div>

      {CATEGORIE_CONDIZIONI.map((categoria) => {
        const elenco = CONDIZIONI.filter((c) => c.categoria === categoria.id)
        if (elenco.length === 0) return null
        return (
          <section key={categoria.id} aria-labelledby={`cat-${categoria.id}`}>
            <h2 id={`cat-${categoria.id}`}>{categoria.nome}</h2>
            <p className="text-body-secondary">{categoria.testo}</p>
            <ul className="pc-cond-list">
              {elenco.map((condizione) => (
                <li key={condizione.id}>
                  <Link to={`/condizioni/${condizione.id}`} className="pc-cond-card">
                    <strong>{condizione.nome}</strong>
                    <span>{condizione.sintesi}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <h2>Da dove arrivano le informazioni</h2>
      <p>
        Ogni scheda si basa su fonti ufficiali: l’Istituto Superiore di Sanità (EpiCentro), la legge italiana sui DSA e
        sull’autismo, l’Associazione Italiana Dislessia e le autorità sanitarie internazionali (CDC, NIH e NHS). I
        link sono in fondo a ogni scheda. Le fonti inglesi sono tradotte e adattate: in Italia il percorso di
        valutazione passa dal pediatra e dalla neuropsichiatria infantile della ASL.
      </p>
      <p className="text-body-secondary">
        Le informazioni sono di carattere generale e non sostituiscono il parere di un medico o di un terapista.
      </p>

      <div className="mt-4">
        {!utente && (
          <Button as={Link} to="/registrati" variant="primary" size="lg">
            Crea il tuo diario
          </Button>
        )}
        {utente?.ruolo === RUOLO_GENITORE && (
          <Button as={Link} to="/diario" variant="primary" size="lg">
            Vai al diario
          </Button>
        )}
        {utente && utente.ruolo !== RUOLO_GENITORE && (
          <Button as={Link} to="/community" variant="primary" size="lg">
            Vai alla community
          </Button>
        )}
      </div>
    </article>
  )
}
