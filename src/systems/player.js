const STORAGE_KEY = "old_game";

export function createNewPlayer(nickname) {
    // only for now all players will be named player
    return {
        id: crypto.randomUUID(),
        nickname: nickname,
        joinDateString: new Date(),
        joinDateNumber: Date.now(), // easier for calculation
        version: "0.1.0",

        playTime: 0, // ignore that for now

        settings: {
            language: "EN",
        },

        badges: ["Early Supporter"],

        saveSlot: {}, // "save_1"
    };
}

export function getPlayer() {
    let player = localStorage.getItem(STORAGE_KEY);
    if (!player) {
        player = createNewPlayer("player");
        savePlayer(player);
    }
    return player;
}

export function savePlayer(player) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
}
