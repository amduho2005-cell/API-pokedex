import express, { Application } from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemonRoutes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

export function crearApp(): Application {
  const app = express();

  // Habilita CORS para que el frontend (corriendo en otro puerto, ej. 5500)
  // pueda hacer fetch() a esta API sin ser bloqueado por el navegador.
  app.use(cors());
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
