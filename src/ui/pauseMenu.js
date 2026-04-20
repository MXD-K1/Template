import { COLORS, screenHeight, screenWidth } from "../utils/constants.js";
import { createLabel } from "./components/label.js";
import { getFont } from "../utils/font.js";
import { createButton } from "./components/button.js";
import { getText } from "../managers/stateManagers.js";

let pauseMenu = null;

export function createPauseMenu(k) {
    pauseMenu = k.add([
        k.rect(screenWidth * 0.25, screenHeight * 0.6),
        k.color(COLORS.WHITE),
        k.anchor("center"),
        k.pos(k.center()),
        k.fixed(),
        "pauseMenu",
    ]);

    createLabel(
        k,
        getText("menu_paused"),
        {
            pos: k.vec2(0, -pauseMenu.height / 2 + 40),
            font: getFont("big_label"),
        },
        pauseMenu,
    );

    createButton(
        k,
        getText("menu_resume"),
        () => {
            togglePauseMenuState(k);
        },
        { pos: k.vec2(0, -30) },
        pauseMenu,
    );

    createButton(
        k,
        getText("menu_settings"),
        () => {
            // save
            k.go("option");
        },
        { pos: k.vec2(0, 0) },
        pauseMenu,
    );

    createButton(
        k,
        getText("menu_exit_to_menu"),
        () => {
            // save
            k.go("title");
        },
        { pos: k.vec2(0, 30) },
        pauseMenu,
    );

    createButton(
        k,
        getText("menu_quit"),
        () => {
            // save
            k.quit(); // not sure if this is a good
            // way to do it in a browser game
        },
        { pos: k.vec2(0, 60) },
        pauseMenu,
    );
}

export function togglePauseMenuState(k) {
    if (pauseMenu) {
        pauseMenu.destroy();
        pauseMenu = null;
    } else {
        createPauseMenu(k);
    }
}
