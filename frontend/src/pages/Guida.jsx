import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTitoloPagina } from '../hooks/useTitoloPagina.js'
import { RUOLO_GENITORE } from '../utils/constants.js'

export default function Guida() {
  useTitoloPagina('Cos’è un evento sensoriale')
  const { utente } = useAuth()

  return (
    <article className="pc-article">
      <h1>Cos’è un evento sensoriale</h1>
      <p className="pc-lead">
        Un momento in cui un bambino reagisce con forza a qualcosa che sente, vede, annusa o tocca.
      </p>

      <p>
        Per molte persone autistiche il mondo sensoriale è più intenso, o semplicemente diverso. Quello che per noi è
        sottofondo, come il brusio di un supermercato, il neon di un corridoio o l’etichetta di una maglietta, per
        loro può essere molto difficile da sopportare. Non è un capriccio: è una reazione vera a qualcosa che per
        loro pesa di più.
      </p>

      <h2>Un esempio</h2>
      <div className="pc-example">
        <p>
          Marco è al supermercato. Le luci al neon sfarfallano, c’è musica e la gente parla forte. A un certo punto
          si copre le orecchie e comincia a dondolarsi. Si calma solo quando escono all’aperto.
        </p>
        <p>Questo è un evento sensoriale. Non deve essere una crisi grave: anche solo allontanarsi conta.</p>
      </div>

      <h2>Cosa annotare</h2>
      <ul>
        <li>Quando è successo e dove.</li>
        <li>Cosa può averlo scatenato: rumore, luci, folla, odori, un tessuto, un cambio di programma.</li>
        <li>Come ha reagito il bambino, con parole tue.</li>
        <li>Quanto è stato forte, da 1 (lieve) a 5 (molto forte).</li>
        <li>Cosa ha aiutato a farlo passare.</li>
      </ul>

      <h2>A cosa serve</h2>
      <p>
        Una sola volta sembra un caso. Dopo qualche settimana, invece, gli appunti mostrano cosa ritorna: per
        esempio che i supermercati affollati sono sempre un problema, mentre quelli quasi vuoti no. Con questi
        esempi concreti è più facile pianificare le giornate e parlarne con terapisti e insegnanti, invece di
        affidarsi ai ricordi.
      </p>

      <h2>Una precisazione</h2>
      <p>
        Percorsi serve a prendere appunti e a vedere gli schemi. Non fa diagnosi e non sostituisce il parere di
        medici e terapisti.
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
