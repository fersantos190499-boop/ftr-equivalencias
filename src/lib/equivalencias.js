// Lógica pura de cálculo de equivalencias. No depende de React ni del
// origen de los datos: recibe siempre un array de alimentos y trabaja con él.

export const GRUPOS_CON_PESO = ['proteina', 'hidrato', 'grasa']

/** kcal totales que aporta un alimento a un peso dado. */
export function kcalTotales(pesoG, kcal100g) {
  return (pesoG / 100) * kcal100g
}

/** Redondea un peso al múltiplo más cercano (por defecto 5 g), mínimo 5 g. */
export function redondearGramos(pesoG, multiplo = 5) {
  if (!Number.isFinite(pesoG) || pesoG <= 0) return 0
  const redondeado = Math.round(pesoG / multiplo) * multiplo
  return redondeado <= 0 ? multiplo : redondeado
}

/** Peso de un alimento destino que iguala unas kcal totales dadas. */
export function pesoEquivalente(kcalObjetivo, kcal100gDestino, multiplo = 5) {
  if (!kcal100gDestino) return 0
  return redondearGramos((kcalObjetivo / kcal100gDestino) * 100, multiplo)
}

/**
 * Calcula las equivalencias de un alimento origen dentro de su propio grupo.
 *
 * - Si el alimento es una verdura, no hay cálculo: se devuelve la lista de
 *   verduras disponibles para mostrar el aviso "combinar libremente".
 * - Si no, se calculan las kcal totales al peso indicado y, para cada
 *   alimento del mismo grupo (origen incluido), el peso que iguala esas kcal.
 *
 * @param {object} origen - alimento origen (de la lista de alimentos)
 * @param {number} pesoOrigenG - peso en gramos indicado por el cliente
 * @param {object[]} alimentos - lista completa de alimentos
 */
export function calcularEquivalencias(origen, pesoOrigenG, alimentos) {
  if (origen.grupo === 'verdura') {
    return {
      esVerdura: true,
      grupo: 'verdura',
      verdurasDisponibles: alimentos.filter((a) => a.grupo === 'verdura'),
    }
  }

  const kcal = kcalTotales(pesoOrigenG, origen.kcal_100g)
  const mismoGrupo = alimentos.filter((a) => a.grupo === origen.grupo)

  const equivalencias = mismoGrupo
    .map((alimento) => ({
      alimento,
      pesoG: alimento.nombre === origen.nombre ? pesoOrigenG : pesoEquivalente(kcal, alimento.kcal_100g),
      esOrigen: alimento.nombre === origen.nombre,
    }))
    .sort((a, b) => {
      if (a.esOrigen) return -1
      if (b.esOrigen) return 1
      return a.alimento.nombre.localeCompare(b.alimento.nombre, 'es')
    })

  return {
    esVerdura: false,
    grupo: origen.grupo,
    kcalTotales: Math.round(kcal),
    equivalencias,
  }
}

/**
 * Clasifica un alimento según sus etiquetas de momento, para destacar
 * visualmente las mejores/peores opciones cerca del entreno.
 * Devuelve "recomendado" | "neutral" | "evitar_cerca".
 */
export function clasificarMomento(alimento) {
  const momentos = alimento.momento || []
  if (momentos.includes('pre_entreno') || momentos.includes('post_entreno')) {
    return 'recomendado'
  }
  if (momentos.includes('lejos_entreno') && !momentos.includes('cualquier_momento')) {
    return 'evitar_cerca'
  }
  return 'neutral'
}
