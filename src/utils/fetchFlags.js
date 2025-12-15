const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// Node.js CommonJS moduan node-fetch async import
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const writepath = path.join(process.cwd(), 'public', 'images', 'flags');

(async () => {
  try {
    // Sortu direktorioa
    await fsPromises.mkdir(writepath, { recursive: true });

    // nationalities.txt irakurri
    const content = await fsPromises.readFile(
      path.join(process.cwd(), 'src', 'utils', 'nationalities.txt'),
      'utf8'
    );

    const countries = content.split('\n').map(line => line.trim()).filter(line => line);

    for (const [idx, country] of countries.entries()) {
      // Espazioak soilik %20 bihurtu URL-an
      const encodedCountry = country.replace(/ /g, '%20');
      const url = `https://playfootball.games/media/nations/${encodedCountry}.svg`;

      try {
        const res = await fetch(url);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          // Fitxategi izen segurua: espazioak _ bihurtu eta karaktere bereziak ezabatu
          const safeFileName = country.replace(/ /g, '_').replace(/[^\w\-]/g, '');
          await fsPromises.writeFile(`${writepath}/${safeFileName}.svg`, buffer);
          console.log(`✅ Deskargatuta: ${country}.svg`);
        } else {
          console.log(`⚠ Egoera: ${res.status} line: ${idx} country: ${country} not found`);
        }
      } catch (err) {
        console.log(`❌ Errorea deskargatzerakoan ${country}:`, err.message);
      }
    }

  } catch (err) {
    console.error(err);
  }
})();
