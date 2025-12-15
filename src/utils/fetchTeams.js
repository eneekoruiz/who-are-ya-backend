const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const writepath = path.join(process.cwd(), 'public', 'images', 'team_logos');

(async () => {
  try {
    await fsPromises.mkdir(writepath, { recursive: true });

    const content = await fsPromises.readFile(
      path.join(process.cwd(), 'src', 'utils', 'teamIDs.txt'),
      'utf8'
    );

    const teamIds = content.split('\n').map(line => line.trim()).filter(line => line);

    for (const teamIdStr of teamIds) {
      const teamId = parseInt(teamIdStr, 10);
      const dir = teamId % 32;
      const url = `https://cdn.sportmonks.com/images/soccer/teams/${dir}/${teamId}.png`;

      try {
        const res = await fetch(url);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          await fsPromises.writeFile(`${writepath}/${teamId}.png`, buffer);
          console.log(`✅ Deskargatuta: ${teamId}.png`);
        } else {
          console.log(`⚠ Egoera: ${res.status} teamId: ${teamId} not found`);
        }
      } catch (err) {
        console.log(`❌ Errorea deskargatzerakoan teamId ${teamId}:`, err.message);
      }
    }

  } catch (err) {
    console.error(err);
  }
})();
