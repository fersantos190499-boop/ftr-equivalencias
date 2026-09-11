import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { validarCodigo } from '../lib/acceso.js'

const CSV = `codigo,nombre,estado
FER01,Fer Santos,Activo
abc123, Ana López ,activo
OLD99,Cliente Baja,Inactivo
`

describe('validarCodigo', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_SHEET_CSV_URL', 'https://example.com/hoja.csv')
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, text: async () => CSV }))
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('acepta un código activo (case-insensitive)', async () => {
    const r = await validarCodigo('fer01')
    expect(r.valido).toBe(true)
    expect(r.nombre).toBe('Fer Santos')
  })

  it('acepta un código con espacios/mayúsculas distintas en la hoja', async () => {
    const r = await validarCodigo('ABC123')
    expect(r.valido).toBe(true)
    expect(r.nombre).toBe('Ana López')
  })

  it('rechaza un código inactivo', async () => {
    const r = await validarCodigo('OLD99')
    expect(r.valido).toBe(false)
    expect(r.motivo).toBe('inactivo')
  })

  it('rechaza un código que no existe', async () => {
    const r = await validarCodigo('NOPE')
    expect(r.valido).toBe(false)
    expect(r.motivo).toBe('no_encontrado')
  })

  it('lanza un error legible si la hoja no responde', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false }))
    )
    await expect(validarCodigo('FER01')).rejects.toThrow(/no se pudo comprobar/i)
  })
})
