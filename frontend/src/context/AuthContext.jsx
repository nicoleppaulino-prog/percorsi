import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  api,
  cancellaSessione,
  impostaGestoreNonAutorizzato,
  leggiSessione,
  salvaSessione,
} from '../api/client.js'

const AuthContext = createContext(null)

/**
 * Tiene traccia di chi e' loggato in tutta l'app.
 * La sessione (token + dati utente) vive anche nel browser, cosi' sopravvive al ricaricamento della pagina.
 */
export function AuthProvider({ children }) {
  const [sessione, setSessione] = useState(() => leggiSessione())
  const [pronto, setPronto] = useState(() => !leggiSessione()) // se c'e' un token, prima lo verifichiamo
  const [messaggio, setMessaggio] = useState(null) // es. "La sessione e' scaduta"

  const esci = useCallback(() => {
    cancellaSessione()
    setSessione(null)
  }, [])

  // Se il server dice che il token non vale piu', si esce e si avvisa l'utente.
  useEffect(() => {
    impostaGestoreNonAutorizzato(() => {
      cancellaSessione()
      setSessione(null)
      setMessaggio('La sessione è scaduta. Accedi di nuovo per continuare.')
    })
  }, [])

  // All'apertura dell'app: se c'e' un token salvato, controlla che sia ancora valido.
  useEffect(() => {
    if (!leggiSessione()) return
    let attivo = true
    api
      .profilo()
      .then((utente) => {
        if (!attivo) return
        const aggiornata = { token: leggiSessione()?.token, utente }
        salvaSessione(aggiornata)
        setSessione(aggiornata)
      })
      .catch(() => {
        // Server irraggiungibile: teniamo la sessione com'e'. Se invece il token e' scaduto
        // (401) ci pensa gia' il gestore registrato sopra, che esce e avvisa l'utente.
      })
      .finally(() => {
        if (attivo) setPronto(true)
      })
    return () => {
      attivo = false
    }
  }, [])

  const iniziaSessione = useCallback((risposta) => {
    const nuova = { token: risposta.token, utente: risposta.utente }
    salvaSessione(nuova)
    setSessione(nuova)
    setMessaggio(null)
    return nuova.utente
  }, [])

  const accedi = useCallback(
    async (email, password) => iniziaSessione(await api.accedi({ email, password })),
    [iniziaSessione],
  )

  const registra = useCallback(
    async (dati) => iniziaSessione(await api.registra(dati)),
    [iniziaSessione],
  )

  const valore = useMemo(
    () => ({
      sessione,
      utente: sessione?.utente ?? null,
      pronto,
      messaggio,
      accedi,
      registra,
      esci,
    }),
    [sessione, pronto, messaggio, accedi, registra, esci],
  )

  return <AuthContext.Provider value={valore}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contesto = useContext(AuthContext)
  if (!contesto) throw new Error('useAuth va usato dentro AuthProvider')
  return contesto
}
