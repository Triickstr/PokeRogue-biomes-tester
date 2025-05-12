setInterval(() => {
    if (window.gameInfo) {
        const event = new CustomEvent('PokeRogueData', { detail: window.gameInfo });
        window.dispatchEvent(event);
    }
}, 5000); // Pull gameInfo every 5 seconds
