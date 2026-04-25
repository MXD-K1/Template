import {
    COLORS,
    LOCALES,
    screenHeight,
    screenWidth,
} from "../utils/constants.js";
import { createLabel } from "./components/label.js";
import { getFont } from "../utils/font.js";
import { createButton } from "./components/button.js";
import { gameState, getText } from "../managers/stateManagers.js";
import { savePlayer } from "../systems/player.js";

let pauseMenu = null;

export function createPauseMenu(k) {
    pauseMenu = k.add([
        k.rect(screenWidth * 0.25, screenHeight * 0.6),
        k.color(COLORS.WHITE),
        k.anchor("center"),
        k.pos(k.center()),
        k.z(Number.POSITIVE_INFINITY),
        k.fixed(),
        "pauseMenu",
    ]);

    createLabel(
        k,
        getText("menu_pause"),
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
            gameState.setFreezePlayer(false);
            togglePauseMenuState(k);
        },
        { pos: k.vec2(0, -30) },
        pauseMenu,
    );

    createButton(
        k,
        getText("menu_settings"),
        () => {
            savePlayerData();
            gameState.goToScene(k, "option");
        },
        { pos: k.vec2(0, 0) },
        pauseMenu,
    );

    createButton(
        k,
        getText("menu_exit_menu"),
        () => {
            savePlayerData();
            gameState.goToScene(k, "title");
        },
        { pos: k.vec2(0, 30) },
        pauseMenu,
    );

    createButton(
        k,
        getText("menu_quit"),
        () => {
            savePlayerData();
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

// will be moved later
export function savePlayerData() {
    // save
    const player = gameState.getPlayer();
    if (!player.settings) {
        console.log(player);
        player.settings = {};
        player.settings.language = LOCALES.EN;
        player.settings.volume = 10;
    }
    player.settings.language = gameState.getLocale();
    gameState.setLocale(player.settings.language);
    player.settings.volume = gameState.getVolume();
    player.saveSlot.pos = player.pos;
    savePlayer(player);
    gameState.setPlayer(player);
}
