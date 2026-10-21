import { INTENSITA } from '../utils/constants.js'

/** Etichetta dell'intensita': colore, numero e parola (il colore da solo non basta). */
export default function IntensityBadge({ valore }) {
  const voce = INTENSITA.find((v) => v.valore === valore)
  if (!voce) return null
  return (
    <span className={`pc-intensity pc-level-${valore}`}>
      {voce.etichetta} ({valore}/5)
    </span>
  )
}
