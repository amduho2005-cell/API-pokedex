import { Request, Response, NextFunction } from 'express';

// Middleware personalizado #1: loguea cada "escaneo" (request) que llega a la pokédex
export function logger(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();
  console.log(`📡 [Escaneo Pokédex] ${req.method} ${req.originalUrl} - ${timestamp}`);
  next();
}
