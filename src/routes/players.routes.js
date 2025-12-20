import { Router } from 'express';
import {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} from '../controllers/players.controller.js';

import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = Router();

// get
router.get('/', getPlayers);
router.get('/:id', getPlayerById);

// 
router.post('/', isAuthenticated, isAdmin, createPlayer);
router.put('/:id', isAuthenticated, isAdmin, updatePlayer);
router.delete('/:id', isAuthenticated, isAdmin, deletePlayer);


export default router;