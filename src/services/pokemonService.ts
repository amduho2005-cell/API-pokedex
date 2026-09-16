import { pokemonStore } from '../data/pokemonStore';
import { Pokemon, CrearPokemonDTO, ActualizarPokemonDTO } from '../types/pokemon';

export class PokemonNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontró ningún Pokémon con id "${id}"`);
    this.name = 'PokemonNotFoundError';
  }
}

export function listarPokemon(): Pokemon[] {
  return pokemonStore;
}

export function obtenerPokemonPorId(id: string): Pokemon {
  const pokemon = pokemonStore.find((p) => String(p.id) === id);
  if (!pokemon) {
    throw new PokemonNotFoundError(id);
  }
  return pokemon;
}

function siguienteId(): number {
  return pokemonStore.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

export function crearPokemon(datos: CrearPokemonDTO): Pokemon {
  const nuevoPokemon: Pokemon = {
    id: siguienteId(),
    ...datos
  };
  pokemonStore.push(nuevoPokemon);
  return nuevoPokemon;
}

export function actualizarPokemon(id: string, cambios: ActualizarPokemonDTO): Pokemon {
  const pokemon = obtenerPokemonPorId(id);
  Object.assign(pokemon, cambios);
  return pokemon;
}

export function eliminarPokemon(id: string): void {
  const index = pokemonStore.findIndex((p) => String(p.id) === id);
  if (index === -1) {
    throw new PokemonNotFoundError(id);
  }
  pokemonStore.splice(index, 1);
}
