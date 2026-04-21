import k from "./kaplayContext.js";
import { dialogData, SCENES } from "./utils/constants.js";
import { fetchData } from "./utils/utils.js";
import {
    getWavedash,
    initWavedash,
    updateLoadingProgress,
} from "./wavedash.js";
import { getPlayer } from "./systems/player.js";
import { gameState } from "./managers/stateManagers.js";

// TODO: Configure gravity once platforming or physics are added.

// TODO: Add global input bindings (pause, mute, screenshot, etc.).
// TODO: Add a global UI layer for FPS, version, or debug info.

async function loadAssets(k) {
    // Sprites
    k.loadSprite("assets", "assets/sprites/terrain/terrain.png", {
        sliceX: 32,
        sliceY: 32,
    });

    k.loadSprite("hero", "assets/sprites/player.png", {
        sliceX: 7,
        sliceY: 9,
        anims: {
            "hero.left.idle": 0,
            "hero.right.idle": 1,
            "hero.up.idle": 2,
            "hero.down.idle": 3,
            "hero.down.left.idle": 0,
            "hero.down.right.idle": 1,
            "hero.up.left.idle": 0,
            "hero.up.right.idle": 1,

            "hero.left.move": { from: 7, to: 13, loop: true },
            "hero.down.move": { from: 14, to: 20, loop: true },
            "hero.right.move": { from: 21, to: 27, loop: true },
            "hero.up.move": { from: 28, to: 34, loop: true },

            "hero.up.left.move": { from: 35, to: 41, loop: true },
            "hero.up.right.move": { from: 42, to: 48, loop: true },
            "hero.down.left.move": { from: 49, to: 55, loop: true },
            "hero.down.right.move": { from: 56, to: 62, loop: true },
        },
    });

    // Sounds (SFX)
    k.loadMusic("bg_music", "assets/sound/ambience_naturonics.mp3");
    // Fonts
    k.loadFont("lettern", "./assets/fonts/MessingLettern.ttf");
    k.loadFont("orbitron", "./assets/fonts/Orbitron.ttf");
    // k.loadFont("jungle", "assets/fonts/font.png", 10, 10);
    // Dialog Data
    [
        dialogData.AR,
        dialogData.EN,
        dialogData.ES,
        dialogData.ID,
        dialogData.HI,
    ] = await Promise.all([
        fetchData("data/locales/ar.json"),
        fetchData("data/locales/en.json"),
        fetchData("data/locales/es.json"),
        fetchData("data/locales/id.json"),
        fetchData("data/locales/hi.json"),
    ]);
}

export async function run(k) {
    await getWavedash();
    updateLoadingProgress(0.4);
    await loadAssets(k);
    updateLoadingProgress(1);
    initWavedash(k);

    gameState.setPlayer(getPlayer());

    for (const scene in SCENES) {
        k.scene(scene, () => SCENES[scene](k));
    }

    k.go("title");
}

await run(k);
