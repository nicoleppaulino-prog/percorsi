import { describe, expect, it } from 'vitest'
import {
  adessoPerInput,
  anteprima,
  formatEta,
  formatMedia,
  iniziale,
  oggiPerInput,
  plurale,
} from './format.js'

describe('formattazione', () => {
  it('scrive le date per i campi del modulo con zeri iniziali', () => {
    const data = new Date(2026, 0, 5, 9, 7)
    expect(oggiPerInput(data)).toBe('2026-01-05')
    expect(adessoPerInput(data)).toBe('2026-01-05T09:07')
  })

  it('gestisce singolare e plurale', () => {
    expect(plurale(1, 'evento', 'eventi')).toBe('1 evento')
    expect(plurale(0, 'evento', 'eventi')).toBe('0 eventi')
    expect(plurale(5, 'evento', 'eventi')).toBe('5 eventi')
    expect(formatEta(1)).toBe('1 anno')
    expect(formatEta(7)).toBe('7 anni')
    expect(formatEta(null)).toBe('')
  })

  it('usa la virgola per i decimali', () => {
    expect(formatMedia(3.25)).toBe('3,3')
    expect(formatMedia(4)).toBe('4,0')
  })

  it('ricava l\'iniziale del nome', () => {
    expect(iniziale('marco')).toBe('M')
    expect(iniziale('  Giulia')).toBe('G')
    expect(iniziale('')).toBe('?')
    expect(iniziale(undefined)).toBe('?')
  })

  it('accorcia i testi lunghi senza spezzare le parole', () => {
    expect(anteprima('Testo breve', 50)).toBe('Testo breve')
    const lungo = 'parola '.repeat(40)
    const corto = anteprima(lungo, 100)
    expect(corto.endsWith('…')).toBe(true)
    expect(corto.length).toBeLessThanOrEqual(101)
    expect(corto.endsWith('parola…')).toBe(true)
  })
})
