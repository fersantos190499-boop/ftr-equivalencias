import BadgeMomento from './BadgeMomento.jsx'
import { clasificarMomento } from '../lib/equivalencias.js'

export default function TarjetaAlimento({ alimento, pesoG, esOrigen, onUsarComoOrigen }) {
  const clase = clasificarMomento(alimento)
  const claseExtra = esOrigen ? 'tarjeta-alimento--origen' : clase === 'recomendado' ? 'tarjeta-alimento--recomendado' : clase === 'evitar_cerca' ? 'tarjeta-alimento--evitar' : ''

  return (
    <button type="button" className={`tarjeta-alimento ${claseExtra}`} onClick={() => onUsarComoOrigen(alimento, pesoG)}>
      <div className="tarjeta-alimento__peso">
        <strong>{pesoG} g</strong>
        <span>peso</span>
      </div>
      <div className="tarjeta-alimento__info">
        <div className="tarjeta-alimento__nombre">
          {alimento.nombre}
          {esOrigen && <span className="tarjeta-alimento__origen-tag">Tu alimento</span>}
        </div>
        {alimento.recomendacion_momento && <div className="tarjeta-alimento__nota">{alimento.recomendacion_momento}</div>}
        <div className="tarjeta-alimento__badge-fila">
          <BadgeMomento alimento={alimento} />
        </div>
      </div>
    </button>
  )
}
