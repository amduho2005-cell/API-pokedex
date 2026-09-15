import { Pokemon } from '../types/pokemon';

// "Base de datos" en memoria. Se reinicia cada vez que se reinicia el servidor.
export const pokemonStore: Pokemon[] = [
  {
    id: '1',
    nombre: 'Flamichu',
    tipo: ['fuego', 'volador'],
    nivel: 12,
    movimientos: ['Ascuas', 'Placaje'],
    etapaEvolutiva: 'básico',
    descripcionPokedex: 'Una pequeña criatura con alas cálidas al tacto. Le encanta planear sobre fogatas.'
  },
  {
    id: '2',
    nombre: 'Aquorbe',
    tipo: ['agua'],
    nivel: 18,
    movimientos: ['Pistola Agua', 'Burbuja', 'Hidrobomba'],
    etapaEvolutiva: 'primera evolución',
    descripcionPokedex: 'Vive en charcas tranquilas. Su caparazón brilla cuando está de buen humor.'
  }
];
