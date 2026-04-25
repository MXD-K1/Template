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
            "left.idle": 0,
            "right.idle": 1,
            "up.idle": 2,
            "down.idle": 3,
            "down.left.idle": 0,
            "down.right.idle": 1,
            "up.left.idle": 0,
            "up.right.idle": 1,

            "left.move": { from: 7, to: 13, loop: true },
            "down.move": { from: 14, to: 20, loop: true },
            "right.move": { from: 21, to: 27, loop: true },
            "up.move": { from: 28, to: 34, loop: true },

            "up.left.move": { from: 35, to: 41, loop: true },
            "up.right.move": { from: 42, to: 48, loop: true },
            "down.left.move": { from: 49, to: 55, loop: true },
            "down.right.move": { from: 56, to: 62, loop: true },
        },
    });
    k.loadSprite("box", "assets/sprites/dialog.png", {
        slice9: {
            left: 16,
            right: 16,
            top: 16,
            bottom: 16,
        },
    });
    k.loadSprite("pipe_attack", "assets/sprites/pipeAttack.png", {
        sliceX: 6,
        sliceY: 1,
        anims: {
            slash: { from: 0, to: 5, loop: false, speed: 18 },
        },
    });
    k.loadSprite("AcronRobot", "assets/sprites/enemies/AcornRobot.png", {
        sliceX: 9,
        sliceY: 12,
        anims: {
            "left.idle": 27,
            "right.idle": 18,
            "up.idle": 9,
            "down.idle": 0,
            "down.left.idle": 27,
            "down.right.idle": 18,
            "up.left.idle": 27,
            "up.right.idle": 18,

            "left.move": { from: 63, to: 68, loop: true },
            "down.move": { from: 36, to: 41, loop: true },
            "right.move": { from: 54, to: 59, loop: true },
            "up.move": { from: 45, to: 50, loop: true },

            "up.left.move": { from: 63, to: 68, loop: true },
            "up.right.move": { from: 54, to: 59, loop: true },
            "down.left.move": { from: 63, to: 68, loop: true },
            "down.right.move": { from: 54, to: 59, loop: true },

            // "left.attack"
            // "right.attack"
            // "up.attack"
            // "down.attack"
        },
    });

    // Sounds (SFX)
    k.loadMusic("bg_music", "assets/sound/ambience.mp3");
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
    gameState.setLocale(gameState.getPlayer()?.settings?.language ?? "EN");
    gameState.setVolume(gameState.getPlayer()?.settings?.volume ?? 10);

    for (const scene in SCENES) {
        k.scene(scene, () => SCENES[scene](k));
    }

    k.go("title");
}

await run(k);
