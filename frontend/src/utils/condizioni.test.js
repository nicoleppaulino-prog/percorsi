import { describe, expect, it } from 'vitest'
import { CATEGORIE_CONDIZIONI, CONDIZIONI } from './condizioni.js'
import { FONTI } from './fonti.js'

describe('schede sulle condizioni', () => {
  it('hanno id unici e una categoria esistente', () => {
    const id = CONDIZIONI.map((c) => c.id)
    expect(new Set(id).size).toBe(id.length)
    for (const c of CONDIZIONI) {
      expect(CATEGORIE_CONDIZIONI.some((cat) => cat.id === c.categoria)).toBe(true)
    }
  })

  it('hanno tutte le sezioni compilate', () => {
    for (const c of CONDIZIONI) {
      for (const campo of ['cosaE', 'segnali', 'cosaNonE', 'valutazione', 'cosaAiuta', 'quando', 'fonti']) {
        expect(c[campo]?.length, `${c.id}.${campo}`).toBeGreaterThan(0)
      }
      for (const gruppo of c.segnali) {
        expect(gruppo.titolo).toBeTruthy()
        expect(gruppo.voci.length).toBeGreaterThan(0)
      }
    }
  })

  it('richiamano solo fonti che esistono e che hanno un link https', () => {
    for (const c of CONDIZIONI) {
      for (const chiave of c.fonti) {
        expect(FONTI[chiave], `${c.id} -> ${chiave}`).toBeDefined()
        expect(FONTI[chiave].url.startsWith('https://')).toBe(true)
      }
    }
  })
})
