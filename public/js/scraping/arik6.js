console.log("=== WHO ARE YA - ARIKETA 6 ===");


fetch('https://api.football-data.org/v4/competitions', {
    headers: {'X-Auth-Token': '934252c28aa541e8bd521ac9cd0c9501'}
})
    .then(r => r.json())
    .then(data => {
        // ARIKETA 6
    });