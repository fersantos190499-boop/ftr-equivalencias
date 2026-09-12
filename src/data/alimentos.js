// Base de datos de alimentos de Fuel to Run.
//
// Puedes editar este array libremente: la lógica de la app
// (src/lib/equivalencias.js) no cambia, solo lee este archivo.
//
// Campos de cada alimento:
//   nombre                 -> texto que ve el cliente en el buscador
//   grupo                  -> "proteina" | "hidrato" | "grasa" | "verdura"
//   kcal_100g               -> kcal por 100 g (para verduras no se usa en el cálculo)
//   momento                 -> array con una o varias de:
//                              "pre_entreno" | "post_entreno" | "lejos_entreno" | "cualquier_momento"
//   recomendacion_momento   -> texto corto opcional que se muestra en la tarjeta
//
// Peso de referencia: todo en CRUDO salvo las legumbres (garbanzos, lentejas,
// alubias, guisantes), que están en COCIDO — se indica en el propio nombre.
// Los valores de kcal/100g son de tablas de composición estándar (BEDCA/USDA),
// aproximados: revísalos y ajústalos si tienes tus propias referencias.

const alimentos = [
  // ---------- HIDRATO ----------
  { nombre: 'Arroz blanco (crudo)', grupo: 'hidrato', kcal_100g: 365, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, ideal pre/post-entreno' },
  { nombre: 'Pasta blanca (cruda)', grupo: 'hidrato', kcal_100g: 371, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, ideal pre/post-entreno' },
  { nombre: 'Arroz integral (crudo)', grupo: 'hidrato', kcal_100g: 370, momento: ['lejos_entreno'], recomendacion_momento: 'Más fibra, mejor lejos del entreno' },
  { nombre: 'Pasta integral (cruda)', grupo: 'hidrato', kcal_100g: 348, momento: ['lejos_entreno'], recomendacion_momento: 'Más fibra, mejor lejos del entreno' },
  { nombre: 'Noodles de arroz (crudos)', grupo: 'hidrato', kcal_100g: 364, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, sin gluten' },
  { nombre: 'Cuscús (crudo)', grupo: 'hidrato', kcal_100g: 376, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, muy digestivo' },
  { nombre: 'Quinoa (cruda)', grupo: 'hidrato', kcal_100g: 368, momento: ['lejos_entreno'], recomendacion_momento: 'Más fibra y grasa vegetal, mejor lejos del entreno' },
  { nombre: 'Patata (cruda)', grupo: 'hidrato', kcal_100g: 77, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, buena antes o después de correr' },
  { nombre: 'Boniato (crudo)', grupo: 'hidrato', kcal_100g: 86, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida-media, buena cerca del entreno' },
  { nombre: 'Ñoquis (crudos)', grupo: 'hidrato', kcal_100g: 156, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Garbanzos (cocidos)', grupo: 'hidrato', kcal_100g: 164, momento: ['lejos_entreno'], recomendacion_momento: 'Legumbre con fibra, mejor lejos del entreno' },
  { nombre: 'Lentejas (cocidas)', grupo: 'hidrato', kcal_100g: 116, momento: ['lejos_entreno'], recomendacion_momento: 'Legumbre con fibra, mejor lejos del entreno' },
  { nombre: 'Alubias (cocidas)', grupo: 'hidrato', kcal_100g: 127, momento: ['lejos_entreno'], recomendacion_momento: 'Legumbre con fibra, mejor lejos del entreno' },
  { nombre: 'Guisantes (cocidos)', grupo: 'hidrato', kcal_100g: 84, momento: ['lejos_entreno'], recomendacion_momento: 'Legumbre con fibra, mejor lejos del entreno' },
  { nombre: 'Pasta de lentejas (cruda)', grupo: 'hidrato', kcal_100g: 340, momento: ['lejos_entreno'], recomendacion_momento: 'Alta en fibra y proteína vegetal, mejor lejos del entreno' },
  { nombre: 'Maíz dulce (cocido)', grupo: 'hidrato', kcal_100g: 96, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Pan blanco', grupo: 'hidrato', kcal_100g: 265, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida' },
  { nombre: 'Pan integral', grupo: 'hidrato', kcal_100g: 247, momento: ['lejos_entreno'], recomendacion_momento: 'Más fibra, mejor lejos del entreno' },
  { nombre: 'Tortitas de arroz', grupo: 'hidrato', kcal_100g: 387, momento: ['pre_entreno'], recomendacion_momento: 'Muy digestivas justo antes de entrenar' },
  { nombre: 'Tortitas de maíz', grupo: 'hidrato', kcal_100g: 377, momento: ['pre_entreno'], recomendacion_momento: 'Muy digestivas justo antes de entrenar' },
  { nombre: 'Tortillas de trigo', grupo: 'hidrato', kcal_100g: 310, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Avena (copos, crudos)', grupo: 'hidrato', kcal_100g: 389, momento: ['lejos_entreno'], recomendacion_momento: 'Digestión más lenta, mejor lejos del entreno' },
  { nombre: 'Copos de maíz', grupo: 'hidrato', kcal_100g: 357, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida' },

  // ---------- PROTEÍNA ----------
  { nombre: 'Pollo (pechuga, cruda)', grupo: 'proteina', kcal_100g: 110, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Muy magro, digestión rápida' },
  { nombre: 'Pavo (pechuga, cruda)', grupo: 'proteina', kcal_100g: 104, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Muy magro, digestión rápida' },
  { nombre: 'Lomo de cerdo (crudo)', grupo: 'proteina', kcal_100g: 139, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión algo más lenta' },
  { nombre: 'Solomillo de cerdo (crudo)', grupo: 'proteina', kcal_100g: 110, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión algo más lenta' },
  { nombre: 'Hamburguesa de pollo (cruda)', grupo: 'proteina', kcal_100g: 180, momento: ['lejos_entreno'], recomendacion_momento: 'Procesada, con más grasa añadida; mejor lejos del entreno' },
  { nombre: 'Hamburguesa de ternera (cruda)', grupo: 'proteina', kcal_100g: 220, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión más lenta' },
  { nombre: 'Ternera (cruda)', grupo: 'proteina', kcal_100g: 110, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión algo más lenta' },
  { nombre: 'Carne picada de pollo (cruda)', grupo: 'proteina', kcal_100g: 120, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Carne picada de ternera (cruda)', grupo: 'proteina', kcal_100g: 145, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión algo más lenta' },
  { nombre: 'Huevo (crudo)', grupo: 'proteina', kcal_100g: 148, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Atún al natural (lata)', grupo: 'proteina', kcal_100g: 116, momento: ['post_entreno', 'cualquier_momento'], recomendacion_momento: 'Práctico post-entreno' },
  { nombre: 'Merluza (cruda)', grupo: 'proteina', kcal_100g: 71, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Digestión rápida y ligera, ideal cerca del entreno' },
  { nombre: 'Lubina (cruda)', grupo: 'proteina', kcal_100g: 97, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Dorada (cruda)', grupo: 'proteina', kcal_100g: 95, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Salmón (crudo)', grupo: 'proteina', kcal_100g: 200, momento: ['lejos_entreno'], recomendacion_momento: 'Alto en grasa, mejor lejos del entreno' },
  { nombre: 'Emperador (crudo)', grupo: 'proteina', kcal_100g: 114, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Gambas (crudas)', grupo: 'proteina', kcal_100g: 71, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Muy magras, digestión rápida' },
  { nombre: 'Tofu (crudo)', grupo: 'proteina', kcal_100g: 76, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Soja texturizada (seca)', grupo: 'proteina', kcal_100g: 335, momento: ['cualquier_momento'], recomendacion_momento: '' },

  // ---------- GRASA ----------
  { nombre: 'Aguacate', grupo: 'grasa', kcal_100g: 160, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Frutos secos (mix)', grupo: 'grasa', kcal_100g: 600, momento: ['lejos_entreno'], recomendacion_momento: 'Valor medio; ajusta según el fruto seco exacto' },
  { nombre: 'Aceite de oliva virgen extra', grupo: 'grasa', kcal_100g: 884, momento: ['lejos_entreno'], recomendacion_momento: 'Grasa pura, mejor lejos del entreno' },
  { nombre: 'Aceitunas', grupo: 'grasa', kcal_100g: 145, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Coco rallado', grupo: 'grasa', kcal_100g: 660, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Crema de cacahuete', grupo: 'grasa', kcal_100g: 588, momento: ['lejos_entreno'], recomendacion_momento: 'Muy calórica y de digestión lenta, evitar justo antes/después' },
  { nombre: 'Queso (semicurado)', grupo: 'grasa', kcal_100g: 370, momento: ['lejos_entreno'], recomendacion_momento: 'Valor medio; ajusta según el tipo de queso' },
  { nombre: 'Chocolate negro (70-85%)', grupo: 'grasa', kcal_100g: 590, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Semillas de chía', grupo: 'grasa', kcal_100g: 486, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Semillas de lino', grupo: 'grasa', kcal_100g: 534, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },

  // ---------- VERDURA ----------
  // kcal_100g se mantiene por si en el futuro activas equivalencias también aquí,
  // pero la app no lo usa: las verduras se listan sin peso ni cálculo.
  { nombre: 'Lechuga', grupo: 'verdura', kcal_100g: 15, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Tomate', grupo: 'verdura', kcal_100g: 18, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Pepino', grupo: 'verdura', kcal_100g: 15, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Calabacín', grupo: 'verdura', kcal_100g: 17, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Pimiento', grupo: 'verdura', kcal_100g: 31, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Brócoli', grupo: 'verdura', kcal_100g: 34, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Espinacas', grupo: 'verdura', kcal_100g: 23, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Champiñones', grupo: 'verdura', kcal_100g: 22, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Cebolla', grupo: 'verdura', kcal_100g: 40, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Zanahoria', grupo: 'verdura', kcal_100g: 41, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Judía verde', grupo: 'verdura', kcal_100g: 31, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Calabaza', grupo: 'verdura', kcal_100g: 26, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Berenjena', grupo: 'verdura', kcal_100g: 25, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Espárragos', grupo: 'verdura', kcal_100g: 20, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Coliflor', grupo: 'verdura', kcal_100g: 25, momento: ['cualquier_momento'], recomendacion_momento: '' },
]

export default alimentos
