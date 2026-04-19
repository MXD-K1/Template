import { gameState } from "../managers/stateManagers.js";
import { togglePauseMenuState } from "../ui/pauseMenu.js";

export function globalInput(k) {
    // TODO: Bind pause, and fullscreen keys.
    // TODO: Add gamepad mappings.
    let current = false;
    k.onKeyPress("p", () => {
        current = !current;
        gameState.setFreezePlayer(current);
        togglePauseMenuState(k);
    });
}
