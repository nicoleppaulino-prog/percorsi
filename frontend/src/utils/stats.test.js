import { describe, expect, it } from 'vitest'
import { calcolaStatistiche, dividiStimoli } from './stats.js'

const adesso = new Date('2026-10-20T12:00:00')

describe('dividiStimoli', () => {
  it('separa gli stimoli e toglie spazi e voci vuote', () => {
    expect(dividiStimoli('Rumore,  Luci , ,Folla')).toEqual(['Rumore', 'Luci', 'Folla'])
  })

  it('restituisce una lista vuota se non c\'e\' nulla', () => {
    expect(dividiStimoli('')).toEqual([])
    expect(dividiStimoli(null)).toEqual([])
    expect(dividiStimoli(undefined)).toEqual([])
  })
})

describe('calcolaStatistiche', () => {
  it('senza eventi restituisce valori vuoti', () => {
    expect(calcolaStatistiche([], adesso)).toEqual({
      totale: 0,
      intensitaMedia: null,
      ultimi30Giorni: 0,
      stimoliFrequenti: [],
    })
  })

  it('calcola totale, media e ultimi 30 giorni', () => {
    const eventi = [
      { dataOra: '2026-10-19T10:00:00', intensita: 4, stimolo: 'Rumore' },
      { dataOra: '2026-10-01T10:00:00', intensita: 2, stimolo: 'Luci' },
      { dataOra: '2026-08-01T10:00:00', intensita: 3, stimolo: null },
    ]
    const stat = calcolaStatistiche(eventi, adesso)
    expect(stat.totale).toBe(3)
    expect(stat.intensitaMedia).toBe(3)
    expect(stat.ultimi30Giorni).toBe(2)
  })

  it('ordina gli stimoli dal piu\' frequente e, a parita\', in ordine alfabetico', () => {
    const eventi = [
      { dataOra: '2026-10-19T10:00:00', intensita: 4, stimolo: 'Rumore, Luci' },
      { dataOra: '2026-10-18T10:00:00', intensita: 3, stimolo: 'Rumore' },
      { dataOra: '2026-10-17T10:00:00', intensita: 5, stimolo: 'Folla, Rumore' },
    ]
    expect(calcolaStatistiche(eventi, adesso).stimoliFrequenti).toEqual([
      { nome: 'Rumore', conteggio: 3 },
      { nome: 'Folla', conteggio: 1 },
      { nome: 'Luci', conteggio: 1 },
    ])
  })
})
