import { Request, Response, NextFunction } from 'express';
import * as pokemonService from '../services/pokemonService';

export function getAll(req: Request, res: Response) {
  const pokemon = pokemonService.listarPokemon();
  res.status(200).json(pokemon);
}

export function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const pokemon = pokemonService.obtenerPokemonPorId(req.params.id);
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
}

export function create(req: Request, res: Response, next: NextFunction) {
  try {
    const nuevoPokemon = pokemonService.crearPokemon(req.body);
    res.status(201).json(nuevoPokemon);
  } catch (error) {
    next(error);
  }
}

export function update(req: Request, res: Response, next: NextFunction) {
  try {
    const pokemonActualizado = pokemonService.actualizarPokemon(req.params.id, req.body);
    res.status(200).json(pokemonActualizado);
  } catch (error) {
    next(error);
  }
}

export function remove(req: Request, res: Response, next: NextFunction) {
  try {
    pokemonService.eliminarPokemon(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
