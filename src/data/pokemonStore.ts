import rawData from './pokemon.json';
import { Pokemon } from '../types/pokemon';

// "Base de datos" en memoria. Se carga una vez desde pokemon.json
// (dataset real de 898 Pokémon) y se reinicia cada vez que se reinicia el servidor.
export const pokemonStore: Pokemon[] = rawData as unknown as Pokemon[];
