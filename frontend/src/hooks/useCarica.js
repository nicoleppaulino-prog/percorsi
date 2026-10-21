import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Carica dei dati all'apertura di una pagina e li tiene insieme a "caricamento" ed "errore".
 * `ricarica()` rifa' la chiamata (si usa dopo aver aggiunto o eliminato qualcosa).
 */
export function useCarica(caricatore, dipendenze) {
  const [stato, setStato] = useState({ dati: null, caricamento: true, errore: null })
  const ultima = useRef(0)

  const ricarica = useCallback(
    async () => {
      const numero = ++ultima.current
      setStato((precedente) => ({ ...precedente, caricamento: true, errore: null }))
      try {
        const dati = await caricatore()
        // Se nel frattempo e' partita un'altra richiesta, questa risposta e' vecchia: si ignora.
        if (numero === ultima.current) setStato({ dati, caricamento: false, errore: null })
      } catch (errore) {
        if (numero === ultima.current) {
          setStato({ dati: null, caricamento: false, errore: errore.message })
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dipendenze,
  )

  useEffect(() => {
    ricarica()
  }, [ricarica])

  return { ...stato, ricarica }
}
