import Player from '../models/Player.js';
import Team from '../models/Team.js';

export const getPlayers = async (req, res) => {
  try {
    const { name, team, position, number, nationality } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (nationality) {
      filter.nationality = { $regex: nationality, $options: 'i' };
    }

    if (team) {
      const teamDoc = await Team.findOne({ name: { $regex: team, $options: 'i' } });
      if (teamDoc) filter.teamId = teamDoc._id;
      else return res.json([]); 
    }

    if (position) {
      filter.position = position;
    }

    if (number) {
      filter.number = Number(number);
    }

    const players = await Player.find(filter)
      .populate('teamId', 'name')
      .populate('leagueId', 'name');

    res.json(players);

    console.log('Fetched players with filters:', players);

  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ message: 'Error fetching players' });
  }
};

export const getPlayerById = async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(player);
};

export const createPlayer = async (req, res) => {
  try {
    const lastPlayer = await Player.findOne().sort({ id: -1 });
    req.body.id = lastPlayer ? lastPlayer.id + 1 : 1;

    console.log('CREATE PLAYER BODY:', req.body);

    const player = new Player(req.body);
    await player.save();

    res.status(201).json(player);
  } catch (error) {
    console.error('CREATE PLAYER ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
};


export const updatePlayer = async (req, res) => {
  const player = await Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(player);
};

export const deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: 'Player deleted' });
};