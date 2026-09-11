/** Normaliza texto para comparar sin tildes ni mayúsculas (buscador tolerante). */
export function normaliza(texto) {
  return (texto || '')
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}
