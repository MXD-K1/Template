import k from "./kaplayContext.js";
import { SCENES } from "./utils/constants.js";

// TODO: Rename the project title and update `index.html` <title>.
// TODO: Decide on a fixed resolution vs responsive scaling strategy.
// TODO: Configure gravity once platforming or physics are added.

// TODO: Add a real asset loading pipeline (sprites, fonts, audio).

// TODO: Add global input bindings (pause, mute, screenshot, etc.).
// TODO: Add a global UI layer for FPS, version, or debug info.

async function loadAssets(k) {
    // Sprites
    k.loadSprite("player", "./assets/sprites/playerV2.png", {
        sliceX: 7,
        sliceY: 9,
        anims: {
            "player.left.idle": { from: 0, to: 0, loop: false },
            "player.up.idle": { from: 1, to: 1, loop: false },
            "player.down.idle": { from: 2, to: 2, loop: false },
            "player.right.idle": { from: 3, to: 3, loop: false },
            "player.down.left.idle": { from: 0, to: 0, loop: false },
            "player.down.right.idle": { from: 3, to: 3, loop: false },

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
}

async function run(k) {
    await loadAssets(k);
    for (const scene in SCENES) {
        k.scene(scene, () => SCENES[scene](k));
    }

    k.go("world");
}

await run(k);
