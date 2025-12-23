import express from 'express';
const router = express.Router();
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware.js';

// Todas las rutas de admin requieren autenticación y rol admin
router.use(isAuthenticated, isAdmin);

// Panel principal
router.get('/', (req, res) => {
  res.render('admin/dashboard', { user: req.session.user });
});

// Jugadores - Lista
router.get('/players', (req, res) => {
  res.render('admin/players/list');
});

// Jugadores - Formulario crear
router.get('/players/new', (req, res) => {
  res.render('admin/players/new');
});

// Jugadores - Formulario editar
router.get('/players/edit/:id', (req, res) => {
  res.render('admin/players/edit', { playerId: req.params.id });
});

export default router;