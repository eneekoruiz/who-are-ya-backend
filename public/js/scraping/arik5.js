console.log("=== WHO ARE YA - ARIKETA 5 ===");


fetch('https://api.football-data.org/v4/competitions', {
    headers: {'X-Auth-Token': '934252c28aa541e8bd521ac9cd0c9501'}
})
    .then(r => r.json())
    .then(data => {
        // ARIKETA 5 - Big4 liga ID-ak lortu
        const big4IDak = big4Ligak.map(c => c.id);
        console.log('✅ ARIKETA 5 - Big4 ID-ak:', big4IDak);
    })
    .catch(error => {
        console.error('❌ Akatsa fetch egiterakoan:', error);
    });