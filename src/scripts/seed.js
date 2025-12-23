import mongoose from 'mongoose';
import League from '../models/League.js';
import Team from '../models/Team.js';
import Player from '../models/Player.js';
import connectDB from '../config/database.js';
import fs from 'fs';
import path from 'path';

const seedDatabase = async () => {
    try {
        await connectDB(); // DB-ra konektatu

        // Lehengo datuak garbitu
        await League.deleteMany({});
        await Team.deleteMany({});
        await Player.deleteMany({});

        // JSON datuak irakurri
        const filePath = path.join(process.cwd(), 'public', 'json', 'fullplayers25.json');
        const rawData = fs.readFileSync(filePath);
        const playersData = JSON.parse(rawData);

        const leaguesMap = new Map();
        const teamsMap = new Map();

        // League eta Team sortu
        for (const player of playersData) {
            if (!leaguesMap.has(player.leagueId)) {
                const newLeague = await League.create({
                    id: player.leagueId.toString(),
                    name: `League ${player.leagueId}`,
                    country: player.nationality || 'Unknown',
                    flagUrl: `/images/flags/${player.nationality.replace(/ /g, '_')}.svg`
                });
                leaguesMap.set(player.leagueId, newLeague);
            }

            if (!teamsMap.has(player.teamId)) {
                const newTeam = await Team.create({
                    id: player.teamId.toString(),
                    name: `Team ${player.teamId}`,
                    leagueId: leaguesMap.get(player.leagueId)._id,
                    logoUrl: `/images/leagues/League_${player.leagueId}.png`,
                    country: player.nationality || 'Unknown',
                    stadium: 'Unknown'
                });
                teamsMap.set(player.teamId, newTeam);
            }
        }

        // Jokalarien datuak sortu
        for (const player of playersData) {
            const team = teamsMap.get(player.teamId);
            const league = leaguesMap.get(player.leagueId);

            await Player.create({
                id: player.id.toString(),
                name: player.name || '',
                birthDate: player.birthdate ? new Date(player.birthdate) : null,
                nationality: player.nationality || '',
                teamId: team._id,
                leagueId: league._id,
                position: ['GK','DF','MF','FW'].includes(player.position) ? player.position : null,
                number: player.number || null,
                imageUrl: `/images/players/${player.id}.png`
            });
        }

        console.log('Database seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Seeding error:', error);
        mongoose.connection.close();
    }
};

seedDatabase();
