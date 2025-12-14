// WHO ARE YA - ARIKETA GUZTIAK
console.log("=== WHO ARE YA - ARIKETA 1 ===");

// Petición BAKARRA egiten dugu
fetch('https://api.football-data.org/v4/competitions', {
    headers: {'X-Auth-Token': '934252c28aa541e8bd521ac9cd0c9501'}
})
.then(r => r.json())
.then(data => {
    console.log('✅ Datuak lortuta, ariketak egiten...');
    
    // ARIKETA 1 - ID 2014 duen lehiaketa lortu
    const lehiaketa = data.competitions.find(c => c.id === 2014);
    console.log('✅ ARIKETA 1 - ID 2014:', lehiaketa);
})
.catch(error => {
    console.error('❌ Akatsa fetch egiterakoan:', error);
});