const formatoDataOra = new Intl.DateTimeFormat('it-IT', { dateStyle: 'medium', timeStyle: 'short' })
const formatoData = new Intl.DateTimeFormat('it-IT', { dateStyle: 'long' })

const due = (n) => String(n).padStart(2, '0')

/** "2026-10-20T14:30:00" -> "20 ott 2026, 14:30" (il server manda l'ora senza fuso: la leggiamo come locale). */
export function formatDataOra(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : formatoDataOra.format(d)
}

/** "2026-10-20" -> "20 ottobre 2026". Si costruisce la data a mano per evitare lo slittamento di fuso. */
export function formatData(iso) {
  if (!iso) return ''
  const [anno, mese, giorno] = iso.split('-').map(Number)
  if (!anno || !mese || !giorno) return ''
  return formatoData.format(new Date(anno, mese - 1, giorno))
}

/** Valore iniziale per <input type="datetime-local">, es. "2026-10-20T14:30". */
export function adessoPerInput(data = new Date()) {
  return `${data.getFullYear()}-${due(data.getMonth() + 1)}-${due(data.getDate())}T${due(data.getHours())}:${due(data.getMinutes())}`
}

/** Valore iniziale per <input type="date">, es. "2026-10-20". */
export function oggiPerInput(data = new Date()) {
  return `${data.getFullYear()}-${due(data.getMonth() + 1)}-${due(data.getDate())}`
}

export function iniziale(nome) {
  return (nome ?? '').trim().charAt(0).toUpperCase() || '?'
}

export function formatEta(eta) {
  if (eta === null || eta === undefined || eta === '') return ''
  return eta === 1 ? '1 anno' : `${eta} anni`
}

export function plurale(n, singolare, pluraleTesto) {
  return n === 1 ? `1 ${singolare}` : `${n} ${pluraleTesto}`
}

/** 3.25 -> "3,3" (virgola all'italiana, una cifra decimale). */
export function formatMedia(numero) {
  return numero.toFixed(1).replace('.', ',')
}

/** Taglia un testo lungo senza spezzare le parole a meta'. */
export function anteprima(testo, massimo = 160) {
  if (!testo || testo.length <= massimo) return testo ?? ''
  const tagliato = testo.slice(0, massimo)
  const ultimoSpazio = tagliato.lastIndexOf(' ')
  return `${(ultimoSpazio > 60 ? tagliato.slice(0, ultimoSpazio) : tagliato).trimEnd()}…`
}
