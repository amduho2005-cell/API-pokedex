import { Request, Response, NextFunction } from 'express';
import { TIPOS_VALIDOS } from '../types/pokemon';
import { ValidationError } from './errorHandler';

const STATS_REQUERIDAS = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];

// Middleware personalizado #2: valida el body antes de crear o actualizar un Pokémon
export function validarPokemon(req: Request, res: Response, next: NextFunction) {
  const esCreacion = req.method === 'POST';
  const { name, type, base, species, description, profile, image } = req.body;

  if (esCreacion || name !== undefined) {
    if (!name || typeof name.english !== 'string' || name.english.trim().length === 0) {
      return next(new ValidationError('El campo "name.english" es obligatorio y debe ser un texto no vacío.'));
    }
  }

  if (esCreacion || type !== undefined) {
    if (!Array.isArray(type) || type.length === 0) {
      return next(new ValidationError('El campo "type" debe ser un arreglo con al menos un tipo elemental.'));
    }
    const tipoInvalido = type.find((t: string) => !TIPOS_VALIDOS.includes(t as any));
    if (tipoInvalido) {
      return next(new ValidationError(`Tipo elemental inválido: "${tipoInvalido}". Tipos válidos: ${TIPOS_VALIDOS.join(', ')}`));
    }
  }

  if (esCreacion || base !== undefined) {
    if (typeof base !== 'object' || base === null) {
      return next(new ValidationError('El campo "base" debe ser un objeto con las 6 estadísticas.'));
    }
    const statFaltante = STATS_REQUERIDAS.find((stat) => typeof base[stat] !== 'number');
    if (statFaltante) {
      return next(new ValidationError(`La estadística "${statFaltante}" es obligatoria y debe ser un número.`));
    }
  }

  if (esCreacion || species !== undefined) {
    if (typeof species !== 'string' || species.trim().length === 0) {
      return next(new ValidationError('El campo "species" es obligatorio y debe ser un texto no vacío.'));
    }
  }

  if (esCreacion || description !== undefined) {
    if (typeof description !== 'string' || description.trim().length === 0) {
      return next(new ValidationError('El campo "description" es obligatorio y debe ser un texto no vacío.'));
    }
  }

  if (esCreacion || profile !== undefined) {
    if (typeof profile !== 'object' || profile === null) {
      return next(new ValidationError('El campo "profile" debe ser un objeto (height, weight, ability, etc.).'));
    }
  }

  if (esCreacion || image !== undefined) {
    if (!image || typeof image.thumbnail !== 'string') {
      return next(new ValidationError('El campo "image.thumbnail" es obligatorio y debe ser un texto (URL).'));
    }
  }

  next();
}
