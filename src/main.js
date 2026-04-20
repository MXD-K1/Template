import k from "./kaplayContext.js";
import { dialogData, SCENES } from "./utils/constants.js";
import { fetchData } from "./utils/utils.js";

// TODO: Decide on a responsive scaling strategy.
// TODO: Configure gravity once platforming or physics are added.

// TODO: Add a real asset loading pipeline (sprites, fonts, audio).

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
    // k.loadFont("jungle", "assets/fonts/font.png", 10, 10);
    // Dialog Data
    [
        dialogData.AR,
        dialogData.EN,
        dialogData.ES,
        dialogData.ID,
        dialogData.HI,
    ] = await Promise.all([
        fetchData("data/dialogs-ar.json"),
        fetchData("data/dialogs-en.json"),
        fetchData("data/dialogs-es.json"),
        fetchData("data/dialogs-id.json"),
        fetchData("data/dialogs-hi.json"),
    ]);
}

export async function run(k) {
    await loadAssets(k);
    for (const scene in SCENES) {
        k.scene(scene, () => SCENES[scene](k));
    }

    k.go("title");
}

await run(k);
