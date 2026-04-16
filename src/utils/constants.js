import createWorld from "../scenes/world.js";
import loadScene from "../scenes/load.js";

export const SCENES = {
    load: loadScene,
    world: createWorld,
};

export const screenWidth = 1280;
export const screenHeight = 720;
export const tileHeight = 32;
export const tileWidth = 32;

export const speedFactor = 1000;

export const LOCALES = Object.freeze({
    AR: "AR",
    EN: "EN",
    ES: "ES",
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
};

// TODO: Add other shared constants (colors, layers, z-index, speeds).
