console.log("=== WHO ARE YA - ARIKETA 2 ===");


fetch('https://api.football-data.org/v4/competitions', {
    headers: {'X-Auth-Token': '934252c28aa541e8bd521ac9cd0c9501'}
})
    .then(r => r.json())
    .then(data => {
        console.log('✅ Datuak lortuta, ariketak egiten...');
        // ARIKETA 2 - TIER_ONE ligak lortu
        const tierOneLigak = data.competitions.filter(c => c.plan === "TIER_ONE");
        console.log('✅ ARIKETA 2 - TIER_ONE ligak:', tierOneLigak);
        console.log('✅ ARIKETA 2 - Zenbat:', tierOneLigak.length);
    })
    .catch(error => {
        console.error('❌ Akatsa fetch egiterakoan:', error);
    });