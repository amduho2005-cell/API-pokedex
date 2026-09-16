# Pruebas manuales — Pokédex API

Todas las pruebas se hicieron contra `http://localhost:3000`, con los 898
Pokémon reales cargados en memoria.

## 1. GET /pokemon — listar todos

**Request**
```
GET /pokemon
```

**Response — 200 OK** (extracto; son 898 objetos)
```json
[
  {
    "id": 1,
    "name": { "english": "Bulbasaur", "japanese": "フシギダネ" },
    "type": ["Grass", "Poison"],
    "base": { "HP": 45, "Attack": 49, "Defense": 49, "Sp. Attack": 65, "Sp. Defense": 65, "Speed": 45 },
    "species": "Seed Pokémon",
    "description": "Bulbasaur can be seen napping in bright sunlight...",
    "profile": { "height": "0.7 m", "weight": "6.9 kg" },
    "image": { "sprite": "...", "thumbnail": "...", "hires": "..." }
  }
]
```

## 2. GET /pokemon/:id — obtener uno

**Request**
```
GET /pokemon/25
```

**Response — 200 OK**
```json
{
  "id": 25,
  "name": { "english": "Pikachu" },
  "type": ["Electric"],
  "base": { "HP": 35, "Attack": 55, "Defense": 40, "Sp. Attack": 50, "Sp. Defense": 50, "Speed": 90 },
  "species": "Mouse Pokémon",
  "description": "While sleeping, it generates electricity in the sacs in its cheeks..."
}
```

**Request con id inexistente**
```
GET /pokemon/9999
```

**Response — 404 Not Found**
```json
{ "error": "No se encontró ningún Pokémon con id \"9999\"" }
```

## 3. POST /pokemon — crear

**Request**
```
POST /pokemon
Content-Type: application/json

{
  "name": { "english": "Testmon" },
  "type": ["Fire"],
  "base": { "HP": 50, "Attack": 50, "Defense": 50, "Sp. Attack": 50, "Sp. Defense": 50, "Speed": 50 },
  "species": "Test Pokémon",
  "description": "Un Pokémon de prueba para validar el POST.",
  "profile": { "height": "1 m", "weight": "10 kg" },
  "image": { "sprite": "x", "thumbnail": "x", "hires": "x" }
}
```

**Response — 201 Created**
```json
{
  "id": 899,
  "name": { "english": "Testmon" },
  "type": ["Fire"],
  "base": { "HP": 50, "Attack": 50, "Defense": 50, "Sp. Attack": 50, "Sp. Defense": 50, "Speed": 50 },
  "species": "Test Pokémon",
  "description": "Un Pokémon de prueba para validar el POST.",
  "profile": { "height": "1 m", "weight": "10 kg" },
  "image": { "sprite": "x", "thumbnail": "x", "hires": "x" }
}
```

**Request inválida (sin "name")**
```
POST /pokemon
Content-Type: application/json

{ "type": ["Fire"] }
```

**Response — 400 Bad Request**
```json
{ "error": "El campo \"name.english\" es obligatorio y debe ser un texto no vacío." }
```

**Request inválida (tipo no existe)**
```
POST /pokemon
Content-Type: application/json

{
  "name": { "english": "ErrorMon" },
  "type": ["Fuego"],
  "base": { "HP": 1, "Attack": 1, "Defense": 1, "Sp. Attack": 1, "Sp. Defense": 1, "Speed": 1 },
  "species": "x", "description": "x",
  "profile": {}, "image": { "thumbnail": "x" }
}
```

**Response — 400 Bad Request**
```json
{ "error": "Tipo elemental inválido: \"Fuego\". Tipos válidos: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy" }
```

## 4. PUT /pokemon/:id — actualizar

**Request**
```
PUT /pokemon/25
Content-Type: application/json

{
  "base": { "HP": 40, "Attack": 60, "Defense": 45, "Sp. Attack": 55, "Sp. Defense": 55, "Speed": 95 }
}
```

**Response — 200 OK**
```json
{
  "id": 25,
  "name": { "english": "Pikachu" },
  "type": ["Electric"],
  "base": { "HP": 40, "Attack": 60, "Defense": 45, "Sp. Attack": 55, "Sp. Defense": 55, "Speed": 95 }
}
```

## 5. DELETE /pokemon/:id — eliminar

**Request**
```
DELETE /pokemon/899
```

**Response — 204 No Content**
(sin cuerpo de respuesta)

**Request con id ya eliminado**
```
DELETE /pokemon/899
```

**Response — 404 Not Found**
```json
{ "error": "No se encontró ningún Pokémon con id \"899\"" }
```
