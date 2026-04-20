import createWorld from "../scenes/world.js";
import loadScene from "../scenes/load.js";
import titleScene from "../scenes/title.js";
import optionsScene from "../scenes/option.js";

export const SCENES = {
    title: titleScene,
    load: loadScene,
    world: createWorld,
    option: optionsScene,
};

export const GAME_NAME = "Naturonics";
export const version = "0.1.18";

export const screenWidth = 1280;
export const screenHeight = 720;
export const tileHeight = 32;
export const tileWidth = 32;

export const camScale = 1.5;

export const speedFactor = 35;

export const LOCALES = Object.freeze({
    AR: "AR",
    EN: "EN",
    ES: "ES",
    ID: "ID",
    HI: "HI",
});

export const COLORS = Object.freeze({
    WHITE: [255, 255, 255],
    BLACK: [0, 0, 0],
    BLUE: [41, 41, 255],
    BROWN: [165, 42, 42],
});

export const dialogData = {
    AR: null,
    EN: null,
    ES: null,
    ID: null,
    HI: null,
};

// TODO: Add other shared constants (colors, layers, z-index, speeds).
