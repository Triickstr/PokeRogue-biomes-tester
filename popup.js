window.addEventListener('PokeRogueData', (e) => {
    const data = e.detail;
    document.getElementById('currentBiome').textContent = `Current Biome: ${data.biome}`;

    // Here you would load your Biomes.json and calculate next possible biomes
});
