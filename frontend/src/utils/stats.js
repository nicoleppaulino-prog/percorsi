/** "Rumore, Luci" -> ["Rumore", "Luci"] */
export function dividiStimoli(testo) {
  if (!testo) return []
  return testo
    .split(',')
    .map((voce) => voce.trim())
    .filter(Boolean)
}

/**
 * Riassume gli eventi sensoriali di un bambino:
 * quanti sono, intensita' media, quanti negli ultimi 30 giorni e quali stimoli tornano piu' spesso.
 */
export function calcolaStatistiche(eventi, adesso = new Date()) {
  if (!eventi || eventi.length === 0) {
    return { totale: 0, intensitaMedia: null, ultimi30Giorni: 0, stimoliFrequenti: [] }
  }

  const somma = eventi.reduce((tot, evento) => tot + evento.intensita, 0)
  const limite = adesso.getTime() - 30 * 24 * 60 * 60 * 1000
  const ultimi30Giorni = eventi.filter((evento) => new Date(evento.dataOra).getTime() >= limite).length

  const conteggi = new Map()
  for (const evento of eventi) {
    for (const stimolo of dividiStimoli(evento.stimolo)) {
      conteggi.set(stimolo, (conteggi.get(stimolo) ?? 0) + 1)
    }
  }

  const stimoliFrequenti = [...conteggi.entries()]
    .map(([nome, conteggio]) => ({ nome, conteggio }))
    .sort((a, b) => b.conteggio - a.conteggio || a.nome.localeCompare(b.nome, 'it'))

  return {
    totale: eventi.length,
    intensitaMedia: somma / eventi.length,
    ultimi30Giorni,
    stimoliFrequenti,
  }
}
