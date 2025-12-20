import Player from '../models/Player.js';

export const getPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

export const getPlayerById = async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(player);
};

export const createPlayer = async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.status(201).json(player);
};

export const updatePlayer = async (req, res) => {
  const player = await Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(player);
};

export const deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: 'Player deleted' });
};