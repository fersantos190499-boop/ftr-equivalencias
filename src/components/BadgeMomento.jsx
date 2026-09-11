import { clasificarMomento } from '../lib/equivalencias.js'

const TEXTO = {
  recomendado: 'Buena opción cerca del entreno',
  evitar_cerca: 'Mejor lejos del entreno',
  neutral: 'Cualquier momento',
}

const ICONO = {
  recomendado: '⚡',
  evitar_cerca: '🐢',
  neutral: '⏱',
}

export default function BadgeMomento({ alimento }) {
  const clase = clasificarMomento(alimento)
  return (
    <span className={`badge-momento badge-momento--${clase === 'evitar_cerca' ? 'evitar' : clase}`}>
      {ICONO[clase]} {TEXTO[clase]}
    </span>
  )
}
