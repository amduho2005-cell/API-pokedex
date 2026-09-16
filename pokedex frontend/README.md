# Pokédex — Frontend

Interfaz estática (HTML/CSS/JS puro, sin frameworks, sin dependencias)
que consume la API de `pokedex-api`.

## Cómo correrlo

**No necesita servidor ni Python.** Solo:

1. Asegúrate de que el backend esté corriendo:
   ```bash
   cd pokedex-api
   npm run dev
   ```
   (debe quedar escuchando en `http://localhost:3000`)

2. Abre `index.html` con doble clic (o arrástralo a una pestaña del navegador).

Funciona así porque el único dato externo que necesita —la lista de
Pokémon— la pide directo a tu API por `fetch()`, y esa API ya tiene CORS
habilitado. Los 18 tipos están escritos directo en `app.js`, no en un
archivo aparte, así que no hay ningún `fetch()` a un archivo local que el
navegador pueda bloquear.

Si por algún motivo tu navegador se queja al abrir el archivo directo
(pasa poco, pero puede pasar en algunas configuraciones), la alternativa
más simple es:
```bash
npx serve .
```

## Qué incluye

- **Buscador** por nombre o número de Pokédex.
- **Filtro por tipo** (chips), usando los 18 tipos reales.
- **Grilla paginada** (48 a la vez, botón "Cargar más").
- **Panel de detalle**: imagen en alta resolución, estadísticas base con
  barras coloreadas según el tipo, altura/peso, habilidades (marca las
  ocultas) y la línea evolutiva completa — con enlaces clicables entre
  evoluciones.

## Estructura

```
index.html
style.css
app.js
```
