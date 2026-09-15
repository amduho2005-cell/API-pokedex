# Pokédex API 📖

API REST de una Pokédex de criaturas inventadas, construida con Node.js, Express y TypeScript. Los datos viven en memoria (sin base de datos).

## Tema

Un registro de criaturas ficticias ("Pokémon" inventados por el autor) con su tipo elemental, nivel, movimientos, etapa evolutiva y descripción de pokédex.

## Estructura del proyecto

```
src/
  types/         -> interfaces y tipos del dominio (Pokemon, DTOs)
  data/          -> "base de datos" en memoria (arreglo inicial)
  services/      -> lógica de negocio y operaciones CRUD
  controllers/   -> reciben la request, llaman al servicio, arman la respuesta
  routes/        -> definición de endpoints REST
  middlewares/   -> logger, validación y manejo centralizado de errores
  app.ts         -> configuración de la app Express
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
| GET | `/pokemon` | Lista todos los Pokémon |
| GET | `/pokemon/:id` | Obtiene un Pokémon por id |
| POST | `/pokemon` | Crea un nuevo Pokémon |
| PUT | `/pokemon/:id` | Actualiza un Pokémon existente |
| DELETE | `/pokemon/:id` | Elimina un Pokémon |

Ver `requests.md` para ejemplos completos de request/response de cada endpoint.

## Modelo de datos

```ts
interface Pokemon {
  id: string;
  nombre: string;
  tipo: TipoElemental[];       // 1 o 2 tipos, de una lista de 18 posibles
  nivel: number;                // entre 1 y 100
  movimientos: string[];
  etapaEvolutiva: 'básico' | 'primera evolución' | 'segunda evolución';
  descripcionPokedex: string;
}
```

## Middlewares personalizados

- **logger**: registra en consola cada request que llega (método, ruta y timestamp).
- **validarPokemon**: valida el body en POST y PUT antes de llegar al controlador.
- **errorHandler**: middleware centralizado que captura errores de validación (400) y de recurso no encontrado (404), y responde en un formato consistente.
