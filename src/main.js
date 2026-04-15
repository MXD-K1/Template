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
    k.loadSprite("player", "./assets/sprites/player.png", {
        sliceX: 7,
        sliceY: 4,
        anims: {
            "player.left.move": { from: 0, to: 6, loop: true },
            "player.down.move": { from: 7, to: 13, loop: true },
            "player.right.move": { from: 14, to: 20, loop: true },
            "player.up.move": { from: 21, to: 27, loop: true },
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
