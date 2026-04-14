import k from "./kaplayContext.js";
import { SCENES } from "./utils/constants.js";

// TODO: Rename the project title and update `index.html` <title>.
// TODO: Decide on a fixed resolution vs responsive scaling strategy.
// TODO: Configure gravity once platforming or physics are added.

// TODO: Add a real asset loading pipeline (sprites, fonts, audio).

// TODO: Add global input bindings (pause, mute, screenshot, etc.).
// TODO: Add a global UI layer for FPS, version, or debug info.

function run(k) {
    console.log(SCENES);
    for (const scene in SCENES) {
        k.scene(scene, () => SCENES[scene](k));
    }

    k.go("world");
}

run(k);
