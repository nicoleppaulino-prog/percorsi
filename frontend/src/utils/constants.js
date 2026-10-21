/** Scala dell'intensita' di un evento sensoriale, da 1 a 5. */
export const INTENSITA = [
  { valore: 1, etichetta: 'Lieve' },
  { valore: 2, etichetta: 'Moderata' },
  { valore: 3, etichetta: 'Marcata' },
  { valore: 4, etichetta: 'Forte' },
  { valore: 5, etichetta: 'Molto forte' },
]

/** Cosa puo' aver scatenato la reazione (si possono scegliere piu' voci). */
export const STIMOLI = [
  'Rumore',
  'Luci',
  'Folla',
  'Odori',
  'Contatto e tessuti',
  'Cambio di programma',
  'Altro',
]

export const AREE_PROGRESSO = [
  'Comunicazione',
  'Autonomia',
  'Socialità',
  'Motricità',
  'Emozioni',
  'Apprendimento',
  'Altro',
]

export const CATEGORIE_POST = ['Scuola', 'Terapie', 'Vita quotidiana', 'Sfoghi', 'Domande', 'Risorse']

export const RUOLO_GENITORE = 'GENITORE'
export const RUOLO_COMMUNITY = 'UTENTE_COMMUNITY'

export const NOME_RUOLO = {
  [RUOLO_GENITORE]: 'genitore',
  [RUOLO_COMMUNITY]: 'community',
}
