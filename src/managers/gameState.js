export default function globalGameState() {
    let instance = null;

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        },
    };
}

function createInstance() {
    let locale = "EN"; // choices: "EN", "AR", "ES", "ID", "HI"
    let freezePlayer = false;
    let prevScene = null;
    let player = null;

    let volume = 1; // max 1, always divide by 10

    return {
        setPlayer(newPlayer) {
            player = newPlayer;
        },
        getPlayer: () => player,
        setFreezePlayer(value) {
            freezePlayer = value;
        },
        getFreezePlayer: () => freezePlayer,
        setLocale(value) {
            locale = value;
        },
        getLocale: () => locale,
        setVolume(newVolume) {
            if (newVolume === 0) return;
            volume = newVolume / 10;
        },
        getVolume: () => volume * 10,
        getVolumeUint: () => volume,
        goToScene: (k, scene) => {
            prevScene = k.getSceneName();
            k.go(scene);
        },
        backToPrevScene(k) {
            if (prevScene) {
                k.go(prevScene);
            }
        },
    };
}
