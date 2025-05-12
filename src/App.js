import React, { useEffect, useState } from 'react';

const biomeImagesPath = './biomeimages/';

const fetchGameInfo = () => {
    const pokerogueTabs = Array.from(window.open('', '_self').parent.frames).filter(f => f.window && f.window.gameInfo);
    if (pokerogueTabs.length > 0) {
        return pokerogueTabs[0].window.gameInfo;
    }
    return null;
};

const BiomeTracker = ({ biomes }) => {
    const [currentBiome, setCurrentBiome] = useState('');
    const [wave, setWave] = useState(0);
    const [nextBiomes, setNextBiomes] = useState([]);

    const updateBiomeInfo = () => {
        const gameInfo = fetchGameInfo();
        if (gameInfo) {
            const biome = gameInfo.biome;
            const waveNumber = gameInfo.wave;
            setCurrentBiome(biome);
            setWave(waveNumber);

            if (waveNumber % 100 >= 96 || (waveNumber % 100 >= 46 && waveNumber % 100 <= 50)) {
                setNextBiomes([{ name: 'Random', odds: 100 }]);
            } else {
                const possibleBiomes = biomes[biome] || [];
                setNextBiomes(possibleBiomes);
            }
        }
    };

    useEffect(() => {
        updateBiomeInfo();
        const interval = setInterval(updateBiomeInfo, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 flex">
            <div className="w-1/3 flex flex-col items-center">
                <img src={`${biomeImagesPath}en_${currentBiome.toLowerCase().replace(/\s/g, '_')}.png`} 
                     alt={currentBiome} className="w-32 h-32" />
                <h2 className="text-xl font-bold mt-2">{currentBiome}</h2>
            </div>
            <div className="w-2/3 grid grid-cols-3 gap-4">
                {nextBiomes.map((b, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <img src={`${biomeImagesPath}en_${b.name.toLowerCase().replace(/\s/g, '_')}.png`} 
                             alt={b.name} className="w-24 h-24" />
                        <span className="text-md mt-1">{b.name}</span>
                        <span className="text-sm text-gray-500">{b.odds}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BiomeTracker;
