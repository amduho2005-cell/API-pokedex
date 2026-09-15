import { Router } from 'express';
import * as pokemonController from '../controllers/pokemonController';
import { validarPokemon } from '../middlewares/validator';

const router = Router();

router.get('/', pokemonController.getAll);
router.get('/:id', pokemonController.getById);
router.post('/', validarPokemon, pokemonController.create);
router.put('/:id', validarPokemon, pokemonController.update);
router.delete('/:id', pokemonController.remove);

export default router;
