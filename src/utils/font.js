import { gameState } from "../managers/stateManagers.js";
import { LOCALES } from "./constants.js";

const FONTS = {
    button: { font: "orbitron", size: 24 }, // numbers might need changing
    dialog: { font: "orbitron", size: 16, width: 500 },
    notification: { font: "orbitron", size: 20 },
    label: { font: "orbitron", size: 20 },
    big_label: { font: "orbitron", size: 48 },
    // fill in the rest when needed
};

const HI_FONTS = {
    button: { size: 18 }, // numbers might need changing
    dialog: { size: 12, width: 500 },
    notification: { size: 18 },
    label: { size: 16 },
    big_label: { size: 34 },
};

export function getFont(component) {
    // bad but will be removed later
    if (gameState.getLocale() === LOCALES.HI) {
        return HI_FONTS[component];
    }
    return FONTS[component];
}
