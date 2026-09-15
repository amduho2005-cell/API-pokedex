export type TipoElemental =
  | 'normal' | 'fuego' | 'agua' | 'planta' | 'eléctrico'
  | 'hielo' | 'lucha' | 'veneno' | 'tierra' | 'volador'
  | 'psíquico' | 'bicho' | 'roca' | 'fantasma' | 'dragón'
  | 'siniestro' | 'acero' | 'hada';

export const TIPOS_VALIDOS: TipoElemental[] = [
  'normal', 'fuego', 'agua', 'planta', 'eléctrico',
  'hielo', 'lucha', 'veneno', 'tierra', 'volador',
  'psíquico', 'bicho', 'roca', 'fantasma', 'dragón',
  'siniestro', 'acero', 'hada'
];

export type EtapaEvolutiva = 'básico' | 'primera evolución' | 'segunda evolución';

export const ETAPAS_VALIDAS: EtapaEvolutiva[] = [
  'básico', 'primera evolución', 'segunda evolución'
];

export interface Pokemon {
  id: string;
  nombre: string;
  tipo: TipoElemental[];
  nivel: number;
  movimientos: string[];
  etapaEvolutiva: EtapaEvolutiva;
  descripcionPokedex: string;
}

// DTO para crear: todo menos el id (el id lo genera el servicio)
export type CrearPokemonDTO = Omit<Pokemon, 'id'>;

// DTO para actualizar: todos los campos opcionales
export type ActualizarPokemonDTO = Partial<CrearPokemonDTO>;
