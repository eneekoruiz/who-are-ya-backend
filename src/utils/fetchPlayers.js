const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// node-fetch CommonJS moduan
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const writePath = path.join(process.cwd(), 'public', 'images', 'players');
const readPath = path.join(process.cwd(), 'src', 'utils', 'playerIDs.txt');

// Throttling funtzioa
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  try {
    // Karpeta sortu
    await fsPromises.mkdir(writePath, { recursive: true });

    // IDak irakurri
    const content = await fsPromises.readFile(readPath, 'utf8');
    const playerIds = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line);

    for (const [idx, idStr] of playerIds.entries()) {
      const playerId = parseInt(idStr, 10);
      const dir = playerId % 32;

      const url = `https://playfootball.games/media/players/${dir}/${playerId}.png`;

      try {
        const res = await fetch(url);

        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          await fsPromises.writeFile(
            path.join(writePath, `${playerId}.png`),
            buffer
          );
          console.log(`✅ Deskargatuta: ${playerId}.png`);
        } else {
          console.log(`⚠ Egoera: ${res.status} playerId: ${playerId}`);
        }
      } catch (err) {
        console.log(`❌ Errorea playerId ${playerId}:`, err.message);
      }

      // THROTTLING: 100 ms itxaron eskaera bakoitzaren artean
      await sleep(100);
    }

  } catch (err) {
    console.error(err);
  }
})();
