import { normaliza } from './texto.js'

const CSV_URL = import.meta.env.VITE_SHEET_CSV_URL
export const CLAVE_SESION = 'ftr_sustituciones_acceso'

/** Parser CSV mínimo (soporta campos entre comillas con comas). */
function parseCSV(texto) {
  const filas = []
  let fila = []
  let campo = ''
  let entreComillas = false

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i]
    if (entreComillas) {
      if (c === '"') {
        if (texto[i + 1] === '"') {
          campo += '"'
          i++
        } else {
          entreComillas = false
        }
      } else {
        campo += c
      }
    } else if (c === '"') {
      entreComillas = true
    } else if (c === ',') {
      fila.push(campo)
      campo = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++
      fila.push(campo)
      campo = ''
      if (fila.some((v) => v !== '')) filas.push(fila)
      fila = []
    } else {
      campo += c
    }
  }
  if (campo !== '' || fila.length) {
    fila.push(campo)
    filas.push(fila)
  }
  return filas
}

function filasAObjetos(filas) {
  if (!filas.length) return []
  const cabecera = filas[0].map((h) => normaliza(h))
  return filas.slice(1).map((fila) => {
    const obj = {}
    cabecera.forEach((clave, idx) => {
      obj[clave] = (fila[idx] || '').trim()
    })
    return obj
  })
}

/**
 * Comprueba un código de acceso contra la Google Sheet publicada como CSV
 * (columnas: codigo, nombre, estado). Devuelve { valido, nombre?, motivo? }.
 */
export async function validarCodigo(codigo) {
  if (!CSV_URL) {
    throw new Error(
      'Falta configurar la URL de la hoja de acceso (VITE_SHEET_CSV_URL). Revisa el README.'
    )
  }

  const separador = CSV_URL.includes('?') ? '&' : '?'
  const res = await fetch(`${CSV_URL}${separador}t=${Date.now()}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('No se pudo comprobar el acceso. Revisa tu conexión e inténtalo de nuevo.')
  }
  const texto = await res.text()
  const clientes = filasAObjetos(parseCSV(texto))

  const codigoBuscado = normaliza(codigo)
  const cliente = clientes.find((c) => normaliza(c.codigo) === codigoBuscado)

  if (!cliente) return { valido: false, motivo: 'no_encontrado' }
  if (normaliza(cliente.estado) !== 'activo') return { valido: false, motivo: 'inactivo' }
  return { valido: true, nombre: cliente.nombre || '' }
}

export function guardarSesion(codigo, nombre) {
  sessionStorage.setItem(CLAVE_SESION, JSON.stringify({ codigo, nombre, ts: Date.now() }))
}

export function leerSesion() {
  try {
    const raw = sessionStorage.getItem(CLAVE_SESION)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function borrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION)
}
