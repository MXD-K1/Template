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
        sliceY: 33,
    });

    k.loadSprite("player", "assets/sprites/player.png", {
        sliceX: 7,
        sliceY: 9,
        anims: {
            "player.left.idle": 0,
            "player.up.idle": 1,
            "player.down.idle": 2,
            "player.right.idle": 3,
            "player.down.left.idle": 0,
            "player.down.right.idle": 3,

            "player.left.move": { from: 7, to: 13, loop: true },
            "player.down.move": { from: 14, to: 20, loop: true },
            "player.right.move": { from: 21, to: 27, loop: true },
            "player.up.move": { from: 28, to: 34, loop: true },

            "player.left.jump": { from: 35, to: 41, loop: false },
            "player.right.jump": { from: 42, to: 48, loop: false },

            "player.down.left.move": { from: 49, to: 55, loop: true },
            "player.down.right.move": { from: 56, to: 62, loop: true },
        },
    });

    // Sounds (SFX)
    // Fonts
    // Dialog Data
    [dialogData.AR, dialogData.EN, dialogData.ES] = await Promise.all([
        fetchData("data/dialogs-ar.json"),
        fetchData("data/dialogs-en.json"),
        fetchData("data/dialogs-es.json"),
    ]);
}

export async function run(k) {
    await loadAssets(k);
    for (const scene in SCENES) {
        k.scene(scene, () => SCENES[scene](k));
    }

    k.go("world");
}

await run(k);
