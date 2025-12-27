import express from 'express';
import Team from '../models/Team.js';
import League from '../models/League.js';
import Player from '../models/Player.js';
const router = express.Router();
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware.js';

router.use(isAuthenticated, isAdmin);

// Dashboard
router.get('/', (req, res) => {
  res.render('admin/dashboard', { user: req.session.user });
});

// Jokalariak - Lista
router.get('/players', (req, res) => {
  res.render('admin/players/list');
});

// Jokalariak sortu
router.get('/players/new', async (req, res) => {
  try {
    const teams = await Team.find();
    const leagues = await League.find();

    res.render('admin/players/new', { teams, leagues });
  } catch (error) {
    console.error(error);
    res.status(500).send('Errorea datuak kargatzean');
  }
});

// Jokalariak editatu
router.get('/players/edit/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate('teamId')
      .populate('leagueId');

    const teams = await Team.find();
    const leagues = await League.find();

    if (!player) {
      return res.status(404).send('Player not found');
    }

    res.render('admin/players/edit', { player, teams, leagues });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
export default router;