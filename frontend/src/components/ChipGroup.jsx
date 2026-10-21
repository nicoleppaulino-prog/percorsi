/** Gruppo di "chip" tra cui si possono scegliere piu' voci (es. gli stimoli che hanno scatenato la reazione). */
export default function ChipGroup({ opzioni, selezionate, onChange, etichetta }) {
  function alterna(opzione) {
    onChange(
      selezionate.includes(opzione)
        ? selezionate.filter((voce) => voce !== opzione)
        : [...selezionate, opzione],
    )
  }

  return (
    <div className="pc-chips" role="group" aria-label={etichetta}>
      {opzioni.map((opzione) => (
        <label className="pc-chip" key={opzione}>
          <input
            type="checkbox"
            checked={selezionate.includes(opzione)}
            onChange={() => alterna(opzione)}
          />
          <span>{opzione}</span>
        </label>
      ))}
    </div>
  )
}
