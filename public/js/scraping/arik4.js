console.log("=== WHO ARE YA - ARIKETA 4 ===");


fetch('https://api.football-data.org/v4/competitions', {
    headers: {'X-Auth-Token': '934252c28aa541e8bd521ac9cd0c9501'}
})
    .then(r => r.json())
    .then(data => {
        // ARIKETA 4 - Big4 ligak (Championship kenduta)
        const big4Ligak = data.competitions.filter(c =>
            c.plan === "TIER_ONE" &&
            ["ESP", "ENG", "ITA", "FRA"].includes(c.area.code) &&
            c.name !== "Championship"
        );
        console.log('✅ ARIKETA 4 - Big4 ligak:', big4Ligak);
    })
    .catch(error => {
        console.error('❌ Akatsa fetch egiterakoan:', error);
    });