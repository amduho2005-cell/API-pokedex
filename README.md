# Pokédex API 📖

API REST de una Pokédex, construida con Node.js, Express y TypeScript.
Los 898 Pokémon viven en memoria (cargados desde `src/data/pokemon.json`
al arrancar el servidor), sin base de datos.

Este backend está pensado para usarse junto con el proyecto hermano
`pokedex-front` (un frontend estático que consume esta API). Ver la
sección "Frontend" más abajo.

## Estructura del proyecto

```
src/
  types/         -> interfaces y tipos del dominio (Pokemon, DTOs)
  data/          -> pokemon.json (dataset) + pokemonStore.ts (carga en memoria)
  services/      -> lógica de negocio y operaciones CRUD
  controllers/   -> reciben la request, llaman al servicio, arman la respuesta
  routes/        -> definición de endpoints REST
  middlewares/   -> logger, validación y manejo centralizado de errores
  app.ts         -> configuración de la app Express (incluye CORS)
  server.ts      -> arranque del servidor
```

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run dev     # modo desarrollo con recarga automática
npm run build   # compila TypeScript a JavaScript (carpeta dist/)
npm start       # corre la versión compilada
```

El servidor arranca en `http://localhost:3000` por defecto.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/pokemon` | Lista los 898 Pokémon |
| GET | `/pokemon/:id` | Obtiene un Pokémon por id (ej. `/pokemon/25` → Pikachu) |
| POST | `/pokemon` | Crea un nuevo Pokémon |
| PUT | `/pokemon/:id` | Actualiza un Pokémon existente |
| DELETE | `/pokemon/:id` | Elimina un Pokémon |

Ver `requests.md` para ejemplos completos de request/response de cada endpoint.

## Modelo de datos

```ts
interface Pokemon {
  id: number;
  name: { english: string; japanese?: string; chinese?: string; french?: string };
  type: TipoElemental[];        // 1 o 2 tipos, de una lista de 18 posibles
  base: {
    HP: number; Attack: number; Defense: number;
    'Sp. Attack': number; 'Sp. Defense': number; Speed: number;
  };
  species: string;
  description: string;
  evolution?: { prev?: [string, string]; next?: [string, string][] };
  profile: { height?: string; weight?: string; egg?: string[]; ability?: [string,string][]; gender?: string };
  image: { sprite: string; thumbnail: string; hires: string };
}
```

## Middlewares personalizados

- **logger**: registra en consola cada request que llega (método, ruta y timestamp).
- **validarPokemon**: valida el body en POST y PUT antes de llegar al controlador
  (nombre, tipos válidos, las 6 estadísticas base, etc.).
- **errorHandler**: middleware centralizado que captura errores de validación (400) y de recurso no encontrado (404), y responde en un formato consistente.

## Frontend

El proyecto `pokedex-front` es un sitio estático que hace `fetch()` a
`http://localhost:3000/pokemon`. Para verlo funcionando junto con esta API:

```bash
# terminal 1
cd pokedex-api && npm run dev

# terminal 2
cd pokedex-front && python3 -m http.server 5500
```

Luego abre `http://localhost:5500`.
