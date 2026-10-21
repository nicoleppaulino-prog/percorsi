import { useEffect } from 'react'

/** Imposta il titolo della scheda del browser, es. "Community · Percorsi". */
export function useTitoloPagina(titolo) {
  useEffect(() => {
    document.title = titolo ? `${titolo} · Percorsi` : 'Percorsi · diario e community per famiglie'
  }, [titolo])
}
