import { useEffect, useState } from 'react'
import { validarCodigo, guardarSesion, leerSesion, borrarSesion } from '../lib/acceso.js'

export default function AccesoGate({ children }) {
  const [comprobandoSesion, setComprobandoSesion] = useState(true)
  const [autorizado, setAutorizado] = useState(false)
  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const sesion = leerSesion()
    if (!sesion) {
      setComprobandoSesion(false)
      return
    }
    validarCodigo(sesion.codigo)
      .then((r) => {
        if (r.valido) {
          setAutorizado(true)
          setNombre(r.nombre || sesion.nombre)
        } else {
          borrarSesion()
        }
      })
      .catch(() => {
        setAutorizado(true)
        setNombre(sesion.nombre)
      })
      .finally(() => setComprobandoSesion(false))
  }, [])

  async function comprobar(e) {
    e.preventDefault()
    if (!codigo.trim()) return
    setCargando(true)
    setError('')
    try {
      const r = await validarCodigo(codigo)
      if (r.valido) {
        guardarSesion(codigo.trim(), r.nombre)
        setAutorizado(true)
        setNombre(r.nombre)
      } else {
        setError('Código no válido o inactivo, contacta con Fer.')
      }
    } catch (err) {
      setError(err.message || 'No se pudo comprobar el acceso, inténtalo de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  function salir() {
    borrarSesion()
    setAutorizado(false)
    setCodigo('')
  }

  if (comprobandoSesion) {
    return <div className="estado-carga">Comprobando acceso...</div>
  }

  if (autorizado) {
    return children({ nombre, salir })
  }

  return (
    <div className="acceso">
      <div className="acceso__tarjeta">
        <div className="acceso__logo">⛽</div>
        <h1>Fuel to Run</h1>
        <p>Introduce tu código de acceso para ver tus sustituciones</p>
        <form onSubmit={comprobar}>
          <input
            type="text"
            placeholder="Código de acceso"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            autoComplete="off"
            autoCapitalize="characters"
          />
          {error && <div className="acceso__error">{error}</div>}
          <button type="submit" className="boton-primario" disabled={cargando || !codigo.trim()}>
            {cargando ? 'Comprobando...' : 'Entrar'}
          </button>
        </form>
        <p className="acceso__pie">¿No tienes código o no funciona? Contacta con Fer.</p>
      </div>
    </div>
  )
}
