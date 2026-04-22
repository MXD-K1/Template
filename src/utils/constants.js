import pkg_metadata from "../../package.json";

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
export const version = pkg_metadata.version;

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
    LIGHT_BLUE: [121, 192, 234],
});

export const dialogData = {
    AR: null,
    EN: null,
    ES: null,
    ID: null,
    HI: null,
};

export const ATTACK_STATES = Object.freeze({
    READY: 0,
    COOLDOWN: 1,
    SEALED: 2,
    LOCKED: 3,

    // difference: locked when an attack is restricted by programmer/
    // or attack should not be used in this level (player is too weak,
    // secret attack, etc...) while sealed is used when a condition of
    // an attack is not met, e.g. if player is invisible,
    // environment is not suitable, etc...
});

export const ATTACK_TYPES = Object.freeze({
    MELEE: 0, // near-range (hands, body, swords, etc..)
    RANGED: 1, // bows, guns, ...
    AREA_EFFECT: 2,
    TARGET_EFFECT: 3, // unavoidable
    PROJECTILE: 4, // not sure about the difference between this and ranged.
    SPECIAL: 5,
});

export const ATTACK_TARGETS = Object.freeze({
    SINGLE: 0,
    MULTIPLE: 1,
    AREA: 2,
    AUTO_TARGET: 3,
    NULL: 4,
});
