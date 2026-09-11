# Fuel to Run — Sustituciones

App web para clientes activos de Fuel to Run: introducen un alimento de su plan con su peso y
la app devuelve todas las alternativas equivalentes en calorías dentro del mismo grupo
(proteína / hidrato / grasa), con el peso exacto de cada una. Las verduras se muestran como
lista libre, sin pesar.

Mobile-first, sin backend propio: los alimentos viven en un archivo local y el acceso se valida
contra una Google Sheet publicada como CSV.

## Estructura del proyecto

```
src/
  data/alimentos.js          ← tu base de datos de alimentos (sustitúyela por la tuya)
  lib/
    equivalencias.js         ← cálculo de kcal y pesos equivalentes (lógica pura, con tests)
    acceso.js                ← validación del código contra la Google Sheet (CSV)
    texto.js                 ← normalización de texto para el buscador
  components/
    BuscadorAlimento.jsx     ← buscador con autocompletado
    TarjetaAlimento.jsx      ← tarjeta de cada alternativa (peso + momento de entreno)
    BadgeMomento.jsx         ← etiqueta visual pre/post/lejos del entreno
    ResultadoEquivalencias.jsx
    AccesoGate.jsx           ← pantalla de código de acceso
  App.jsx                    ← flujo principal
  App.css / index.css        ← estilos de marca (azul + acento naranja)
  test/                      ← tests (vitest)
```

## 1. Sustituir la base de datos de alimentos

Edita `src/data/alimentos.js`. Es un array plano, un objeto por alimento:

```js
{
  nombre: 'Pechuga de pollo',
  grupo: 'proteina', // 'proteina' | 'hidrato' | 'grasa' | 'verdura'
  kcal_100g: 165,
  momento: ['cualquier_momento'], // combina: 'pre_entreno' | 'post_entreno' | 'lejos_entreno' | 'cualquier_momento'
  recomendacion_momento: '', // texto corto opcional, se muestra en la tarjeta
}
```

No hace falta tocar ningún otro archivo: toda la lógica (buscador, cálculo, agrupación) lee
siempre de este array.

**Reglas del campo `momento`** (afectan al color/icono de la tarjeta):
- Si incluye `pre_entreno` o `post_entreno` → se destaca en verde como buena opción cerca del entreno.
- Si solo incluye `lejos_entreno` → se destaca en ámbar como "mejor lejos del entreno".
- `cualquier_momento` → neutro.

Para verduras, `kcal_100g` no se usa en ningún cálculo (se listan sin peso), pero consérvalo
por si en el futuro activas equivalencias también ahí.

## 2. Desarrollo local

Necesitas [Node.js](https://nodejs.org) instalado (versión 18 o superior).

```bash
npm install
npm run dev
```

Abre la URL que te indique la terminal (normalmente `http://localhost:5173`).

```bash
npm test        # ejecuta los tests (lógica de cálculo y de acceso)
npm run build   # genera la versión de producción en dist/
```

## 3. Sistema de acceso (Google Sheet)

La app pide un código de acceso antes de dejar entrar. Ese código se valida contra una Google
Sheet tuya, publicada como CSV, con estas tres columnas (en la primera fila, como cabecera):

```
codigo,nombre,estado
FER01,Fer Santos,Activo
ABC123,Nombre del cliente,Activo
XYZ999,Cliente de baja,Inactivo
```

`estado` debe ser `Activo` para que el código funcione (no distingue mayúsculas/minúsculas).

**Cómo publicar tu Google Sheet como CSV:**
1. Abre tu Google Sheet con las columnas `codigo`, `nombre`, `estado`.
2. Archivo → Compartir → **Publicar en la Web**.
3. En "Enlace", elige la hoja concreta (no "Todo el documento" si tienes varias hojas) y como
   formato elige **Valores separados por comas (.csv)**.
4. Pulsa **Publicar** y copia la URL que te da (termina en `output=csv`).
5. Pega esa URL como variable de entorno `VITE_SHEET_CSV_URL`:
   - En local: crea un archivo `.env.local` en la raíz del proyecto (copia `.env.example`) con
     `VITE_SHEET_CSV_URL=https://docs.google.com/.../pub?output=csv`.
   - En Netlify: Site settings → Environment variables (ver paso 4 más abajo).

Cada vez que edites la Google Sheet (dar de alta o dar de baja a un cliente), los cambios se
aplican al momento — la app la consulta cada vez que alguien entra un código, sin necesidad de
volver a desplegar nada.

La sesión de un cliente que ya entró se recuerda en el navegador mientras esa pestaña/sesión
siga abierta (no hace falta volver a escribir el código cada vez que usa la app en la misma
sesión); el botón "Salir" de la cabecera cierra la sesión manualmente.

## 4. Desplegar en Netlify (paso a paso, primera vez)

### A. Sube el proyecto a GitHub
1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo (público o privado, da igual), sin README ni .gitignore (ya los
   tenemos).
3. Desde este proyecto, conecta y sube el código (dímelo y lo hago yo por ti, o hazlo tú con):
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git branch -M main
   git push -u origin main
   ```

### B. Crea el sitio en Netlify
1. Crea una cuenta en [netlify.com](https://netlify.com) (puedes entrar directamente con tu
   cuenta de GitHub).
2. En el panel, **Add new site → Import an existing project**.
3. Elige **GitHub** y autoriza el acceso; selecciona el repositorio que acabas de crear.
4. Netlify detectará la configuración automáticamente (usa el archivo `netlify.toml` incluido:
   build command `npm run build`, carpeta a publicar `dist`). Pulsa **Deploy**.

### C. Configura el código de acceso (variable de entorno)
1. En el sitio ya creado en Netlify: **Site configuration → Environment variables → Add a
   variable**.
2. Nombre: `VITE_SHEET_CSV_URL`. Valor: la URL de tu Google Sheet publicada (paso 3 de arriba).
3. Guarda y ve a **Deploys → Trigger deploy → Deploy site** para que se aplique.

### D. Ya está
Netlify te da una URL gratuita tipo `nombre-al-azar.netlify.app`. Puedes cambiarla por una más
fácil de recordar en **Site configuration → Domain management → Options → Edit site name**
(sigue siendo gratuita, solo cambia el subdominio).

A partir de ahora, cada vez que subas cambios a `main` en GitHub, Netlify vuelve a desplegar la
app automáticamente en 1-2 minutos.

## Marca

Azul principal `#124b8c` / `#0b3563`, acento naranja `#ff6a2f` (surtidor). Tipografía Poppins.
