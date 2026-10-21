import { useId } from 'react'
import { INTENSITA } from '../utils/constants.js'

/**
 * Selettore dell'intensita' da 1 a 5: barre che crescono, come il volume di un telefono.
 * Sono veri pulsanti radio nascosti, quindi funzionano anche da tastiera (frecce) e con lo screen reader.
 */
export default function VolumePicker({ valore, onChange, nome = 'intensita' }) {
  const idBase = useId()
  const scelta = INTENSITA.find((voce) => voce.valore === valore)

  return (
    <fieldset>
      <legend className="form-label">Quanto è stato forte?</legend>
      <div className="pc-volume">
        {INTENSITA.map(({ valore: v, etichetta }) => (
          <div className="pc-volume-bar" key={v} style={{ '--h': `${2.2 + v * 0.85}rem` }}>
            <input
              className="pc-volume-input"
              type="radio"
              id={`${idBase}-${v}`}
              name={nome}
              value={v}
              checked={valore === v}
              onChange={() => onChange(v)}
              aria-label={`${v} su 5: ${etichetta}`}
            />
            <label
              htmlFor={`${idBase}-${v}`}
              className={`pc-volume-label pc-level-${v}${valore >= v ? ' is-filled' : ''}`}
              aria-hidden="true"
            >
              {v}
            </label>
          </div>
        ))}
      </div>
      <div className="pc-volume-caption" aria-live="polite">
        {scelta ? `${scelta.etichetta}, ${scelta.valore} su 5` : 'Tocca una barra per scegliere'}
      </div>
    </fieldset>
  )
}
