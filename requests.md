# Pruebas manuales — Pokédex API

Todas las pruebas se hicieron contra `http://localhost:3000`.

## 1. GET /pokemon — listar todos

**Request**
```
GET /pokemon
```

**Response — 200 OK**
```json
[
  {
    "id": "1",
    "nombre": "Flamichu",
    "tipo": ["fuego", "volador"],
    "nivel": 12,
    "movimientos": ["Ascuas", "Placaje"],
    "etapaEvolutiva": "básico",
    "descripcionPokedex": "Una pequeña criatura con alas cálidas al tacto."
  },
  {
    "id": "2",
    "nombre": "Aquorbe",
    "tipo": ["agua"],
    "nivel": 18,
    "movimientos": ["Pistola Agua", "Burbuja", "Hidrobomba"],
    "etapaEvolutiva": "primera evolución",
    "descripcionPokedex": "Vive en charcas tranquilas."
  }
]
```

## 2. GET /pokemon/:id — obtener uno

**Request**
```
GET /pokemon/1
```

**Response — 200 OK**
```json
{
  "id": "1",
  "nombre": "Flamichu",
  "tipo": ["fuego", "volador"],
  "nivel": 12,
  "movimientos": ["Ascuas", "Placaje"],
  "etapaEvolutiva": "básico",
  "descripcionPokedex": "Una pequeña criatura con alas cálidas al tacto."
}
```

**Request con id inexistente**
```
GET /pokemon/999
```

**Response — 404 Not Found**
```json
{ "error": "No se encontró ningún Pokémon con id \"999\"" }
```

## 3. POST /pokemon — crear

**Request**
```
POST /pokemon
Content-Type: application/json

{
  "nombre": "Terrapup",
  "tipo": ["tierra"],
  "nivel": 5,
  "movimientos": ["Excavar"],
  "etapaEvolutiva": "básico",
  "descripcionPokedex": "Cava túneles bajo los jardines para esconder tesoros."
}
```

**Response — 201 Created**
```json
{
  "id": "a1b2c3d4-...",
  "nombre": "Terrapup",
  "tipo": ["tierra"],
  "nivel": 5,
  "movimientos": ["Excavar"],
  "etapaEvolutiva": "básico",
  "descripcionPokedex": "Cava túneles bajo los jardines para esconder tesoros."
}
```

**Request inválida (nivel fuera de rango)**
```
POST /pokemon
Content-Type: application/json

{
  "nombre": "ErrorMon",
  "tipo": ["normal"],
  "nivel": 150,
  "movimientos": [],
  "etapaEvolutiva": "básico",
  "descripcionPokedex": "..."
}
```

**Response — 400 Bad Request**
```json
{ "error": "El campo \"nivel\" debe ser un número entre 1 y 100." }
```

## 4. PUT /pokemon/:id — actualizar

**Request**
```
PUT /pokemon/1
Content-Type: application/json

{
  "nivel": 13,
  "etapaEvolutiva": "primera evolución"
}
```

**Response — 200 OK**
```json
{
  "id": "1",
  "nombre": "Flamichu",
  "tipo": ["fuego", "volador"],
  "nivel": 13,
  "movimientos": ["Ascuas", "Placaje"],
  "etapaEvolutiva": "primera evolución",
  "descripcionPokedex": "Una pequeña criatura con alas cálidas al tacto."
}
```

## 5. DELETE /pokemon/:id — eliminar

**Request**
```
DELETE /pokemon/2
```

**Response — 204 No Content**
(sin cuerpo de respuesta)

**Request con id ya eliminado**
```
DELETE /pokemon/2
```

**Response — 404 Not Found**
```json
{ "error": "No se encontró ningún Pokémon con id \"2\"" }
```
