const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Metodo bakarra deskargatzeko
async function fetchAndSave({filePath, writeDir, fileExt, urlFormatter, fileNameFormatter}) {
  try {
    await fsPromises.mkdir(writeDir, { recursive: true });

    const content = await fsPromises.readFile(filePath, 'utf8');
    const items = content.split('\n').map(line => line.trim()).filter(line => line);

    for (const [idx, item] of items.entries()) {
      const url = urlFormatter(item, idx);
      const fileName = fileNameFormatter ? fileNameFormatter(item) : item;
      const fileFullPath = path.join(writeDir, `${fileName}.${fileExt}`);

      try {
        const res = await fetch(url);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          await fsPromises.writeFile(fileFullPath, buffer);
          console.log(`✅ Deskargatuta: ${fileName}.${fileExt}`);
        } else {
          console.log(`⚠ Egoera: ${res.status} line: ${idx} item: ${item} not found`);
        }
      } catch (err) {
        console.log(`❌ Errorea deskargatzerakoan item ${item}:`, err.message);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// --- FLAGS ---
fetchAndSave({
  filePath: path.join(process.cwd(), 'src', 'utils', 'nationalities.txt'),
  writeDir: path.join(process.cwd(), 'public', 'images', 'flags'),
  fileExt: 'svg',
  urlFormatter: (country) => `https://playfootball.games/media/nations/${country.replace(/ /g, '%20')}.svg`,
  fileNameFormatter: (country) => country.replace(/ /g, '_').replace(/[^\w\-]/g, '')
});

// --- LEAGUES ---
fetchAndSave({
  filePath: path.join(process.cwd(), 'src', 'utils', 'leagues.txt'),
  writeDir: path.join(process.cwd(), 'public', 'images', 'leagues'),
  fileExt: 'png',
  urlFormatter: (league) => `https://playfootball.games/media/competitions/${league}.png`
});

// --- TEAM LOGOS ---
fetchAndSave({
  filePath: path.join(process.cwd(), 'src', 'utils', 'teamIDs.txt'),
  writeDir: path.join(process.cwd(), 'public', 'images', 'team_logos'),
  fileExt: 'png',
  urlFormatter: (teamId) => {
    const dir = parseInt(teamId, 10) % 32;
    return `https://cdn.sportmonks.com/images/soccer/teams/${dir}/${teamId}.png`;
  }
});
