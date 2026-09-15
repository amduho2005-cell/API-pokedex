import { Request, Response, NextFunction } from 'express';
import { TIPOS_VALIDOS, ETAPAS_VALIDAS } from '../types/pokemon';
import { ValidationError } from './errorHandler';

// Middleware personalizado #2: valida el body antes de crear o actualizar un Pokémon
export function validarPokemon(req: Request, res: Response, next: NextFunction) {
  const esCreacion = req.method === 'POST';
  const { nombre, tipo, nivel, movimientos, etapaEvolutiva, descripcionPokedex } = req.body;

  // En creación, los campos son obligatorios. En actualización (PUT/PATCH), solo se validan si vienen.
  if (esCreacion || nombre !== undefined) {
    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
      return next(new ValidationError('El campo "nombre" es obligatorio y debe ser un texto no vacío.'));
    }
  }

  if (esCreacion || tipo !== undefined) {
    if (!Array.isArray(tipo) || tipo.length === 0) {
      return next(new ValidationError('El campo "tipo" debe ser un arreglo con al menos un tipo elemental.'));
    }
    const tipoInvalido = tipo.find((t: string) => !TIPOS_VALIDOS.includes(t as any));
    if (tipoInvalido) {
      return next(new ValidationError(`Tipo elemental inválido: "${tipoInvalido}". Tipos válidos: ${TIPOS_VALIDOS.join(', ')}`));
    }
  }

  if (esCreacion || nivel !== undefined) {
    if (typeof nivel !== 'number' || nivel < 1 || nivel > 100) {
      return next(new ValidationError('El campo "nivel" debe ser un número entre 1 y 100.'));
    }
  }

  if (esCreacion || movimientos !== undefined) {
    if (!Array.isArray(movimientos) || movimientos.some((m: unknown) => typeof m !== 'string')) {
      return next(new ValidationError('El campo "movimientos" debe ser un arreglo de textos.'));
    }
  }

  if (esCreacion || etapaEvolutiva !== undefined) {
    if (!ETAPAS_VALIDAS.includes(etapaEvolutiva)) {
      return next(new ValidationError(`El campo "etapaEvolutiva" debe ser una de: ${ETAPAS_VALIDAS.join(', ')}`));
    }
  }

  if (esCreacion || descripcionPokedex !== undefined) {
    if (typeof descripcionPokedex !== 'string' || descripcionPokedex.trim().length === 0) {
      return next(new ValidationError('El campo "descripcionPokedex" es obligatorio y debe ser un texto no vacío.'));
    }
  }

  next();
}
