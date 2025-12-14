console.log("=== WHO ARE YA - ARIKETA 3 ===");


fetch('https://api.football-data.org/v4/competitions', {
    headers: {'X-Auth-Token': '934252c28aa541e8bd521ac9cd0c9501'}
})
    .then(r => r.json())
    .then(data => {
        console.log('✅ Datuak lortuta, ariketak egiten...');
        // ARIKETA 3 - Espainiako liga lortu
        const espainiakoLiga = data.competitions.find(c =>
            c.area.name === "Spain" && c.plan === "TIER_ONE"
        );
        console.log('✅ ARIKETA 3 - Espainiako liga:', espainiakoLiga);
    })
    .catch(error => {
        console.error('❌ Akatsa fetch egiterakoan:', error);
    });