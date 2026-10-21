/** Quando una lista e' vuota: spiega cosa manca e invita a fare il primo passo. */
export default function EmptyState({ titolo, testo, children }) {
  return (
    <div className="pc-empty">
      <h2>{titolo}</h2>
      {testo && <p>{testo}</p>}
      {children}
    </div>
  )
}
