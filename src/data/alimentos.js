// Base de datos de alimentos de ejemplo.
//
// Sustituye este array por tu tabla real cuando quieras: la lógica de la app
// (src/lib/equivalencias.js) no cambia, solo lee este archivo.
//
// Campos de cada alimento:
//   nombre                 -> texto que ve el cliente en el buscador
//   grupo                  -> "proteina" | "hidrato" | "grasa" | "verdura"
//   kcal_100g               -> kcal por 100 g (para verduras no se usa en el cálculo)
//   momento                 -> array con una o varias de:
//                              "pre_entreno" | "post_entreno" | "lejos_entreno" | "cualquier_momento"
//   recomendacion_momento   -> texto corto opcional que se muestra en la tarjeta

const alimentos = [
  // ---------- PROTEÍNA ----------
  { nombre: 'Pechuga de pollo', grupo: 'proteina', kcal_100g: 165, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Pechuga de pavo', grupo: 'proteina', kcal_100g: 135, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Solomillo de cerdo', grupo: 'proteina', kcal_100g: 143, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión algo más lenta' },
  { nombre: 'Ternera magra', grupo: 'proteina', kcal_100g: 172, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión algo más lenta' },
  { nombre: 'Salmón', grupo: 'proteina', kcal_100g: 208, momento: ['lejos_entreno'], recomendacion_momento: 'Alto en grasa, mejor lejos del entreno' },
  { nombre: 'Merluza / pescado blanco', grupo: 'proteina', kcal_100g: 86, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Digestión rápida y ligera, ideal cerca del entreno' },
  { nombre: 'Atún al natural (lata)', grupo: 'proteina', kcal_100g: 116, momento: ['post_entreno', 'cualquier_momento'], recomendacion_momento: 'Práctico post-entreno' },
  { nombre: 'Gambas / langostinos', grupo: 'proteina', kcal_100g: 99, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Muy magro, digestión rápida' },
  { nombre: 'Huevo entero (cocido)', grupo: 'proteina', kcal_100g: 155, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Claras de huevo', grupo: 'proteina', kcal_100g: 52, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Proteína pura, digestión rápida' },
  { nombre: 'Tofu firme', grupo: 'proteina', kcal_100g: 76, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Yogur griego natural', grupo: 'proteina', kcal_100g: 97, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Queso fresco batido 0%', grupo: 'proteina', kcal_100g: 45, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Muy ligero, buena opción cerca del entreno' },
  { nombre: 'Jamón cocido / pavo (fiambre)', grupo: 'proteina', kcal_100g: 105, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Queso curado', grupo: 'proteina', kcal_100g: 350, momento: ['lejos_entreno'], recomendacion_momento: 'Alto en grasa, mejor lejos del entreno' },

  // ---------- HIDRATO ----------
  { nombre: 'Arroz blanco (cocido)', grupo: 'hidrato', kcal_100g: 130, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, ideal pre/post-entreno' },
  { nombre: 'Pasta blanca (cocida)', grupo: 'hidrato', kcal_100g: 131, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, ideal pre/post-entreno' },
  { nombre: 'Patata (cocida)', grupo: 'hidrato', kcal_100g: 87, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida, buena antes o después de correr' },
  { nombre: 'Pan blanco', grupo: 'hidrato', kcal_100g: 265, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida' },
  { nombre: 'Tortitas de arroz / maíz', grupo: 'hidrato', kcal_100g: 387, momento: ['pre_entreno'], recomendacion_momento: 'Muy digestivas justo antes de entrenar' },
  { nombre: 'Plátano', grupo: 'hidrato', kcal_100g: 89, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Clásico pre-entreno, rápido y bien tolerado' },
  { nombre: 'Maíz dulce (cocido)', grupo: 'hidrato', kcal_100g: 96, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Arroz integral (cocido)', grupo: 'hidrato', kcal_100g: 111, momento: ['lejos_entreno'], recomendacion_momento: 'Más fibra, mejor lejos del entreno' },
  { nombre: 'Pan integral', grupo: 'hidrato', kcal_100g: 247, momento: ['lejos_entreno'], recomendacion_momento: 'Más fibra, mejor lejos del entreno' },
  { nombre: 'Avena (copos)', grupo: 'hidrato', kcal_100g: 389, momento: ['lejos_entreno'], recomendacion_momento: 'Digestión más lenta, mejor lejos del entreno' },
  { nombre: 'Quinoa (cocida)', grupo: 'hidrato', kcal_100g: 120, momento: ['lejos_entreno'], recomendacion_momento: 'Más fibra, mejor lejos del entreno' },
  { nombre: 'Cuscús (cocido)', grupo: 'hidrato', kcal_100g: 112, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Garbanzos (cocidos)', grupo: 'hidrato', kcal_100g: 164, momento: ['lejos_entreno'], recomendacion_momento: 'Legumbre con fibra, mejor lejos del entreno' },
  { nombre: 'Lentejas (cocidas)', grupo: 'hidrato', kcal_100g: 116, momento: ['lejos_entreno'], recomendacion_momento: 'Legumbre con fibra, mejor lejos del entreno' },
  { nombre: 'Boniato (cocido)', grupo: 'hidrato', kcal_100g: 90, momento: ['pre_entreno', 'post_entreno'], recomendacion_momento: 'Absorción rápida-media, buena cerca del entreno' },

  // ---------- GRASA ----------
  { nombre: 'Aceite de oliva virgen extra', grupo: 'grasa', kcal_100g: 884, momento: ['lejos_entreno'], recomendacion_momento: 'Grasa pura, mejor lejos del entreno' },
  { nombre: 'Aguacate', grupo: 'grasa', kcal_100g: 160, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Almendras', grupo: 'grasa', kcal_100g: 579, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Nueces', grupo: 'grasa', kcal_100g: 654, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Anacardos', grupo: 'grasa', kcal_100g: 553, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Crema de cacahuete', grupo: 'grasa', kcal_100g: 588, momento: ['lejos_entreno'], recomendacion_momento: 'Muy calórica y de digestión lenta, evitar justo antes/después' },
  { nombre: 'Semillas de chía', grupo: 'grasa', kcal_100g: 486, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Semillas de lino', grupo: 'grasa', kcal_100g: 534, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Aceitunas', grupo: 'grasa', kcal_100g: 145, momento: ['cualquier_momento'], recomendacion_momento: '' },
  { nombre: 'Coco rallado', grupo: 'grasa', kcal_100g: 660, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Mantequilla', grupo: 'grasa', kcal_100g: 717, momento: ['lejos_entreno'], recomendacion_momento: 'Grasa saturada, mejor lejos del entreno' },
  { nombre: 'Pipas de girasol', grupo: 'grasa', kcal_100g: 584, momento: ['lejos_entreno'], recomendacion_momento: 'Mejor lejos del entreno, digestión lenta' },
  { nombre: 'Queso curado (aporte graso)', grupo: 'grasa', kcal_100g: 402, momento: ['lejos_entreno'], recomendacion_momento: 'Alto en grasa, mejor lejos del entreno' },

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
