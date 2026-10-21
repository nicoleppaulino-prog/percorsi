// Tutte le chiamate al backend passano da qui.
// L'indirizzo del server si imposta con la variabile VITE_API_URL (vedi .env.example).

const BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '')
const CHIAVE_SESSIONE = 'percorsi.sessione'

/** Errore restituito dal server (o dalla rete), con messaggio gia' leggibile per l'utente. */
export class ApiError extends Error {
  constructor(message, status, errori) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errori = errori ?? null // dettaglio per campo, es. { password: "..." }
  }
}

// ---- Sessione salvata nel browser (token + dati utente) ----------------------------------
export function leggiSessione() {
  try {
    return JSON.parse(localStorage.getItem(CHIAVE_SESSIONE))
  } catch {
    return null
  }
}

export function salvaSessione(sessione) {
  try {
    localStorage.setItem(CHIAVE_SESSIONE, JSON.stringify(sessione))
  } catch {
    // archiviazione non disponibile (es. navigazione privata): la sessione dura finche' la pagina e' aperta
  }
}

export function cancellaSessione() {
  try {
    localStorage.removeItem(CHIAVE_SESSIONE)
  } catch {
    // niente da fare
  }
}

// Funzione chiamata quando il server risponde 401 a una richiesta autenticata (token scaduto o non valido)
let alNonAutorizzato = () => {}
export function impostaGestoreNonAutorizzato(funzione) {
  alNonAutorizzato = funzione
}

function messaggioPerStato(stato) {
  if (stato === 401) return 'La sessione è scaduta. Accedi di nuovo.'
  if (stato === 403) return 'Non hai il permesso di fare questa operazione.'
  if (stato === 404) return 'Non abbiamo trovato quello che cercavi.'
  if (stato >= 500) return 'Il server ha avuto un problema. Riprova tra qualche istante.'
  return 'Qualcosa è andato storto. Riprova.'
}

async function richiesta(percorso, { metodo = 'GET', corpo, autenticata = true } = {}) {
  const intestazioni = { Accept: 'application/json' }
  if (corpo !== undefined) intestazioni['Content-Type'] = 'application/json'

  const sessione = leggiSessione()
  if (autenticata && sessione?.token) intestazioni.Authorization = `Bearer ${sessione.token}`

  let risposta
  try {
    risposta = await fetch(`${BASE_URL}${percorso}`, {
      method: metodo,
      headers: intestazioni,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    })
  } catch {
    throw new ApiError('Non riesco a raggiungere il server. Controlla la connessione e riprova.', 0)
  }

  if (risposta.status === 204) return null

  let dati = null
  const testo = await risposta.text()
  if (testo) {
    try {
      dati = JSON.parse(testo)
    } catch {
      dati = null
    }
  }

  if (!risposta.ok) {
    if (risposta.status === 401 && autenticata) alNonAutorizzato()
    throw new ApiError(dati?.message ?? messaggioPerStato(risposta.status), risposta.status, dati?.errors)
  }
  return dati
}

const post = (percorso, corpo) => richiesta(percorso, { metodo: 'POST', corpo })
const elimina = (percorso) => richiesta(percorso, { metodo: 'DELETE' })

export const api = {
  registra: (dati) => richiesta('/api/auth/register', { metodo: 'POST', corpo: dati, autenticata: false }),
  accedi: (dati) => richiesta('/api/auth/login', { metodo: 'POST', corpo: dati, autenticata: false }),
  profilo: () => richiesta('/api/auth/me'),

  bambini: {
    elenco: () => richiesta('/api/bambini'),
    dettaglio: (id) => richiesta(`/api/bambini/${id}`),
    crea: (dati) => post('/api/bambini', dati),
    elimina: (id) => elimina(`/api/bambini/${id}`),
  },

  eventi: {
    elenco: (bambinoId) => richiesta(`/api/bambini/${bambinoId}/eventi-sensoriali`),
    crea: (bambinoId, dati) => post(`/api/bambini/${bambinoId}/eventi-sensoriali`, dati),
    elimina: (bambinoId, id) => elimina(`/api/bambini/${bambinoId}/eventi-sensoriali/${id}`),
  },

  progressi: {
    elenco: (bambinoId) => richiesta(`/api/bambini/${bambinoId}/progressi`),
    crea: (bambinoId, dati) => post(`/api/bambini/${bambinoId}/progressi`, dati),
    elimina: (bambinoId, id) => elimina(`/api/bambini/${bambinoId}/progressi/${id}`),
  },

  post: {
    elenco: (categoria) =>
      richiesta(categoria ? `/api/post?categoria=${encodeURIComponent(categoria)}` : '/api/post'),
    dettaglio: (id) => richiesta(`/api/post/${id}`),
    crea: (dati) => post('/api/post', dati),
    elimina: (id) => elimina(`/api/post/${id}`),
  },

  commenti: {
    elenco: (postId) => richiesta(`/api/post/${postId}/commenti`),
    crea: (postId, dati) => post(`/api/post/${postId}/commenti`, dati),
    elimina: (postId, id) => elimina(`/api/post/${postId}/commenti/${id}`),
  },
}
