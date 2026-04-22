import { gameState } from "../managers/stateManagers.js";
import { LOCALES } from "./constants.js";

const FONTS = {
    button: { font: "sinko", size: 24 }, // numbers might need changing
    dialog: { size: 16, width: 500 },
    notification: { font: "sinko", size: 20 },
    label: { font: "sinko", size: 20 },
    big_label: { font: "sinko", size: 48 },
    // fill in the rest when needed
};

const HI_FONTS = {
    button: { font: "sinko", size: 18 }, // numbers might need changing
    dialog: { size: 12, width: 500 },
    notification: { font: "sinko", size: 16 },
    label: { font: "sinko", size: 16 },
    big_label: { font: "sinko", size: 40 },
};

export function getFont(component) {
    // bad but will be removed later
    if (gameState.getLocale() === LOCALES.HI) {
        return HI_FONTS[component];
    }
    return FONTS[component];
}
