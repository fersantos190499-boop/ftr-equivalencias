import TarjetaAlimento from './TarjetaAlimento.jsx'
import categoriasVerduras from '../data/verdurasEjemplos.js'

const NOMBRE_GRUPO = {
  proteina: 'proteínas',
  hidrato: 'hidratos',
  grasa: 'grasas',
}

export default function ResultadoEquivalencias({ resultado, origen, onUsarComoOrigen }) {
  if (resultado.esVerdura) {
    return (
      <div className="tarjeta-panel">
        <div className="aviso-verdura">
          Las verduras se pueden combinar libremente: no es necesario pesarlas ni igualar calorías entre ellas.
        </div>
        <div className="categorias-verdura">
          {categoriasVerduras.map((cat) => (
            <p className="categoria-verdura" key={cat.titulo}>
              <span className="categoria-verdura__titulo">{cat.titulo}: </span>
              <span className="categoria-verdura__ejemplos">{cat.ejemplos.join(', ')}...</span>
            </p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="tarjeta-panel">
      <div className="resultado__origen">
        <h2>
          {origen.nombre} · {resultado.equivalencias.find((e) => e.esOrigen)?.pesoG} g
        </h2>
        <span className="resultado__kcal">{resultado.kcalTotales} kcal</span>
      </div>
      <p className="resultado__subtitulo">
        Alternativas equivalentes dentro de {NOMBRE_GRUPO[resultado.grupo]}. Toca una para ver sus propias equivalencias.
      </p>
      <div className="tarjetas">
        {resultado.equivalencias.map((e) => (
          <TarjetaAlimento
            key={e.alimento.nombre}
            alimento={e.alimento}
            pesoG={e.pesoG}
            esOrigen={e.esOrigen}
            onUsarComoOrigen={onUsarComoOrigen}
          />
        ))}
      </div>
    </div>
  )
}
