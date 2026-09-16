export type TipoElemental =
  | 'Normal' | 'Fire' | 'Water' | 'Grass' | 'Electric'
  | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying'
  | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon'
  | 'Dark' | 'Steel' | 'Fairy';

export const TIPOS_VALIDOS: TipoElemental[] = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric',
  'Ice', 'Fighting', 'Poison', 'Ground', 'Flying',
  'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon',
  'Dark', 'Steel', 'Fairy'
];

export interface PokemonName {
  english: string;
  japanese?: string;
  chinese?: string;
  french?: string;
}

export interface PokemonBaseStats {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
  Speed: number;
}

export interface PokemonImage {
  sprite: string;
  thumbnail: string;
  hires: string;
}

export interface PokemonProfile {
  height?: string;
  weight?: string;
  egg?: string[];
  ability?: [string, string][];
  gender?: string;
}

export interface PokemonEvolution {
  prev?: [string, string];
  next?: [string, string][];
}

export interface Pokemon {
  id: number;
  name: PokemonName;
  type: TipoElemental[];
  base: PokemonBaseStats;
  species: string;
  description: string;
  evolution?: PokemonEvolution;
  profile: PokemonProfile;
  image: PokemonImage;
}

// DTO para crear: todo menos el id (el id lo genera el servicio)
export type CrearPokemonDTO = Omit<Pokemon, 'id'>;

// DTO para actualizar: todos los campos opcionales
export type ActualizarPokemonDTO = Partial<CrearPokemonDTO>;
