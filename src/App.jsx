import { useState } from 'react'
import './App.css'
import alimentos from './data/alimentos.js'
import { calcularEquivalencias } from './lib/equivalencias.js'
import BuscadorAlimento from './components/BuscadorAlimento.jsx'
import ResultadoEquivalencias from './components/ResultadoEquivalencias.jsx'
import AccesoGate from './components/AccesoGate.jsx'

function Cabecera({ onSalir }) {
  return (
    <header className="cabecera">
      <div className="cabecera__logo">⛽</div>
      <div className="cabecera__texto">
        <h1>Fuel to Run</h1>
        <p>Sustituciones equivalentes</p>
      </div>
      {onSalir && (
        <button type="button" className="cabecera__salir" onClick={onSalir}>
          Salir
        </button>
      )}
    </header>
  )
}

function SustitutosApp({ onSalir }) {
  const [origen, setOrigen] = useState(null)
  const [peso, setPeso] = useState('')
  const [resultado, setResultado] = useState(null)

  function seleccionarAlimento(alimento) {
    setOrigen(alimento)
    setResultado(null)
    setPeso('')
  }

  function verEquivalencias(e) {
    e.preventDefault()
    if (!origen) return
    const pesoNum = Number(peso)
    if (!pesoNum || pesoNum <= 0) return
    setResultado(calcularEquivalencias(origen, pesoNum, alimentos))
  }

  function verVerduras() {
    setResultado(calcularEquivalencias(origen, 0, alimentos))
  }

  function usarComoOrigen(alimento, pesoG) {
    setOrigen(alimento)
    setPeso(String(pesoG))
    setResultado(calcularEquivalencias(alimento, pesoG, alimentos))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const puedeCalcular = origen && Number(peso) > 0

  return (
    <div className="app">
      <Cabecera onSalir={onSalir} />
      <div className="contenido">
        <div className="tarjeta-panel">
          <form onSubmit={verEquivalencias}>
            <div className="campo">
              <label>Alimento de tu plan</label>
              {origen ? (
                <div className="seleccion-actual">
                  <span>{origen.nombre}</span>
                  <button type="button" onClick={() => seleccionarAlimento(null)}>
                    cambiar
                  </button>
                </div>
              ) : (
                <BuscadorAlimento alimentos={alimentos} onSeleccionar={seleccionarAlimento} />
              )}
            </div>

            {origen && origen.grupo !== 'verdura' && (
              <div className="campo">
                <label>Peso indicado en tu plan (g)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="1"
                  placeholder="Ej: 150"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </div>
            )}

            {origen && origen.grupo === 'verdura' ? (
              <button type="button" className="boton-primario" onClick={verVerduras}>
                Ver verduras permitidas
              </button>
            ) : (
              <button type="submit" className="boton-primario" disabled={!puedeCalcular}>
                Ver equivalencias
              </button>
            )}
          </form>
        </div>

        {resultado && (
          <ResultadoEquivalencias resultado={resultado} origen={origen} onUsarComoOrigen={usarComoOrigen} />
        )}
      </div>
    </div>
  )
}

export default function App() {
  return <AccesoGate>{({ salir }) => <SustitutosApp onSalir={salir} />}</AccesoGate>
}
