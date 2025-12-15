const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const writepath = path.join(process.cwd(), 'public', 'images', 'leagues');

(async () => {
  try {
    // create directory
    await fsPromises.mkdir(writepath, { recursive: true });

    // read leagues file into an array of lines
    // "leagues.txt" => Change the location to your own convenience
    const content = await fsPromises.readFile(
      path.join(process.cwd(), 'src', 'utils', 'leagues.txt'),
      "utf8"
    );

    const data = content.split("\n").map(line => line.trim()).filter(line => line);


    for (const [idx, elem] of data.entries()) {
      const url = `https://playfootball.games/media/competitions/${elem}.png`;

      try {
        const res = await fetch(url);
        // check status
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          await fsPromises.writeFile(`${writepath}/${elem}.png`, buffer);
          console.log(`✅ Deskargatuta: ${elem}.png`);
        } else {
          console.log(`⚠ Egoera: ${res.status} line: ${idx} elem: ${elem} not found`);
        }
      } catch (err) {
        console.log(`❌ Errorea deskargatzerakoan ${elem}:`, err.message);
      }
    }

  } catch (err) {
    console.error(err);
  }
})();