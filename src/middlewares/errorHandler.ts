import { Request, Response, NextFunction } from 'express';
import { PokemonNotFoundError } from '../services/pokemonService';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Middleware centralizado de errores. Debe registrarse al final, después de las rutas.
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`❌ Error en ${req.method} ${req.originalUrl}:`, err.message);

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof PokemonNotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
}
