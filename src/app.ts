import express, { Application } from 'express';
import pokemonRoutes from './routes/pokemonRoutes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

export function crearApp(): Application {
  const app = express();

  app.use(express.json());
  app.use(logger);

  app.get('/', (req, res) => {
    res.json({ mensaje: '📖 Bienvenido a la Pokédex API. Prueba GET /pokemon' });
  });

  app.use('/pokemon', pokemonRoutes);

  // El middleware de errores va SIEMPRE al final, después de las rutas
  app.use(errorHandler);

  return app;
}
