import globalGameState from "./gameState.js";
import { dialogData } from "../utils/constants.js";

export const gameState = globalGameState().getInstance();

// wrong place will be moved later
export function getText(element) {
    return dialogData[gameState.getLocale()][element]; //?? dialogData["EN"][element]
    // if the word is missing
}
