import { useMemo, useState } from 'react'
import { normaliza } from '../lib/texto.js'

const ETIQUETA_GRUPO = {
  proteina: 'Proteína',
  hidrato: 'Hidrato',
  grasa: 'Grasa',
  verdura: 'Verdura',
}

export default function BuscadorAlimento({ alimentos, onSeleccionar }) {
  const [texto, setTexto] = useState('')
  const [abierto, setAbierto] = useState(false)

  const resultados = useMemo(() => {
    const q = normaliza(texto)
    if (!q) return []
    return alimentos.filter((a) => normaliza(a.nombre).includes(q)).slice(0, 20)
  }, [texto, alimentos])

  function elegir(alimento) {
    onSeleccionar(alimento)
    setTexto('')
    setAbierto(false)
  }

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Ej: pechuga de pollo, arroz, aguacate..."
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value)
          setAbierto(true)
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 120)}
        autoComplete="off"
      />
      {abierto && texto.trim() && (
        <ul className="buscador__lista">
          {resultados.length === 0 && <li className="buscador__vacio">Sin resultados para "{texto}"</li>}
          {resultados.map((a) => (
            <li key={a.nombre} className="buscador__opcion" onMouseDown={() => elegir(a)}>
              <span>{a.nombre}</span>
              <span className="buscador__opcion-grupo">{ETIQUETA_GRUPO[a.grupo]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
