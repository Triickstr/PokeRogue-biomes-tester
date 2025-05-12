const BIOME_IMAGE_PATH = 'biomeimages/';
const REFRESH_INTERVAL = 5000; // 5 seconds
let biomesData = {};

async function loadBiomesData() {
    const response = await fetch('Biomes.json');
    biomesData = await response.json();
}

function createBiomeCard(biome, odds) {
    const card = document.createElement('div');
    card.className = 'biome-card';

    const img = document.createElement('img');
    img.src = `${BIOME_IMAGE_PATH}en_${biome.toLowerCase().replace(/ /g, '_')}.png`;
    img.alt = biome;

    const name = document.createElement('div');
    name.className = 'biome-name';
    name.textContent = biome;

    const chance = document.createElement('div');
    chance.className = 'biome-odds';
    chance.textContent = `${odds}%`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(chance);

    return card;
}

function updateBiomeDisplay() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const gameInfo = window.gameInfo;
    if (!gameInfo) {
        app.textContent = 'Waiting for game data...';
        return;
    }

    const currentBiome = gameInfo.biome;
    const currentWave = gameInfo.wave;
    const isRandomWave = (currentWave % 100 >= 46 && currentWave % 100 <= 50) || (currentWave % 100 >= 96 || currentWave % 100 === 0);

    const currentBiomeContainer = document.createElement('div');
    currentBiomeContainer.className = 'current-biome';

    const biomeImg = document.createElement('img');
    biomeImg.src = `${BIOME_IMAGE_PATH}en_${currentBiome.toLowerCase().replace(/ /g, '_')}.png`;
    biomeImg.alt = currentBiome;

    const biomeName = document.createElement('div');
    biomeName.textContent = `Current Biome: ${currentBiome}`;

    currentBiomeContainer.appendChild(biomeImg);
    currentBiomeContainer.appendChild(biomeName);

    const possibleBiomesContainer = document.createElement('div');
    possibleBiomesContainer.className = 'possible-biomes';

    if (isRandomWave) {
        possibleBiomesContainer.appendChild(createBiomeCard('Random', 100));
    } else {
        const nextBiomes = biomesData[currentBiome];
        if (nextBiomes) {
            for (const [nextBiome, odds] of Object.entries(nextBiomes)) {
                possibleBiomesContainer.appendChild(createBiomeCard(nextBiome, odds));
            }
        } else {
            possibleBiomesContainer.textContent = 'No biome data available.';
        }
    }

    app.appendChild(currentBiomeContainer);
    app.appendChild(possibleBiomesContainer);
}

async function initApp() {
    await loadBiomesData();
    updateBiomeDisplay();
    setInterval(updateBiomeDisplay, REFRESH_INTERVAL);
}

document.addEventListener('DOMContentLoaded', initApp);