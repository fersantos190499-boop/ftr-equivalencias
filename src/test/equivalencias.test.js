import { describe, it, expect } from 'vitest'
import {
  kcalTotales,
  redondearGramos,
  pesoEquivalente,
  calcularEquivalencias,
  clasificarMomento,
} from '../lib/equivalencias.js'

const alimentos = [
  { nombre: 'Pechuga de pollo', grupo: 'proteina', kcal_100g: 165, momento: ['cualquier_momento'] },
  { nombre: 'Merluza', grupo: 'proteina', kcal_100g: 86, momento: ['pre_entreno', 'post_entreno'] },
  { nombre: 'Salmón', grupo: 'proteina', kcal_100g: 208, momento: ['lejos_entreno'] },
  { nombre: 'Arroz blanco', grupo: 'hidrato', kcal_100g: 130, momento: ['pre_entreno'] },
  { nombre: 'Aceite de oliva', grupo: 'grasa', kcal_100g: 884, momento: ['lejos_entreno'] },
  { nombre: 'Lechuga', grupo: 'verdura', kcal_100g: 15, momento: ['cualquier_momento'] },
  { nombre: 'Tomate', grupo: 'verdura', kcal_100g: 18, momento: ['cualquier_momento'] },
]

describe('kcalTotales', () => {
  it('calcula las kcal para un peso dado', () => {
    expect(kcalTotales(150, 165)).toBeCloseTo(247.5)
  })
  it('con 0 g da 0 kcal', () => {
    expect(kcalTotales(0, 165)).toBe(0)
  })
})

describe('redondearGramos', () => {
  it('redondea al múltiplo de 5 más cercano', () => {
    expect(redondearGramos(123)).toBe(125)
    expect(redondearGramos(122)).toBe(120)
  })
  it('nunca da 0 ni negativo', () => {
    expect(redondearGramos(0)).toBe(0)
    expect(redondearGramos(1)).toBe(5)
    expect(redondearGramos(-10)).toBe(0)
  })
})

describe('pesoEquivalente', () => {
  it('da el peso que iguala unas kcal objetivo', () => {
    // 247.5 kcal a 86 kcal/100g -> 287.79 -> redondeado a 290
    expect(pesoEquivalente(247.5, 86)).toBe(290)
  })
})

describe('calcularEquivalencias', () => {
  it('incluye el propio alimento origen con su peso exacto', () => {
    const r = calcularEquivalencias(alimentos[0], 150, alimentos)
    const origen = r.equivalencias.find((e) => e.esOrigen)
    expect(origen.pesoG).toBe(150)
    expect(origen.alimento.nombre).toBe('Pechuga de pollo')
  })

  it('solo compara dentro del mismo grupo', () => {
    const r = calcularEquivalencias(alimentos[0], 150, alimentos)
    const nombres = r.equivalencias.map((e) => e.alimento.nombre)
    expect(nombres).toContain('Merluza')
    expect(nombres).toContain('Salmón')
    expect(nombres).not.toContain('Arroz blanco')
    expect(nombres).not.toContain('Aceite de oliva')
  })

  it('el peso equivalente reproduce las mismas kcal totales (dentro del redondeo)', () => {
    const r = calcularEquivalencias(alimentos[0], 150, alimentos) // 150g pollo = 247.5 kcal
    const salmon = r.equivalencias.find((e) => e.alimento.nombre === 'Salmón')
    const kcalSalmon = (salmon.pesoG / 100) * 208
    expect(kcalSalmon).toBeCloseTo(247.5, -1)
  })

  it('las verduras no llevan cálculo de peso, solo la lista del grupo', () => {
    const verdura = { nombre: 'Lechuga', grupo: 'verdura', kcal_100g: 15 }
    const r = calcularEquivalencias(verdura, 100, alimentos)
    expect(r.esVerdura).toBe(true)
    expect(r.verdurasDisponibles.map((v) => v.nombre)).toEqual(['Lechuga', 'Tomate'])
  })
})

describe('clasificarMomento', () => {
  it('pre o post entreno se marca como recomendado', () => {
    expect(clasificarMomento({ momento: ['pre_entreno'] })).toBe('recomendado')
    expect(clasificarMomento({ momento: ['post_entreno'] })).toBe('recomendado')
  })
  it('solo lejos_entreno se marca a evitar cerca del entreno', () => {
    expect(clasificarMomento({ momento: ['lejos_entreno'] })).toBe('evitar_cerca')
  })
  it('cualquier_momento es neutral', () => {
    expect(clasificarMomento({ momento: ['cualquier_momento'] })).toBe('neutral')
  })
})
