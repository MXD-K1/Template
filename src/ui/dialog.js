import {
    screenWidth,
    screenHeight,
    LOCALES,
    COLORS,
    dialogData,
} from "../utils/constants.js";
import { formatText } from "../utils/text.js";
import { gameState } from "../managers/managers.js";

export function createDialogBox(k) {
    return k.add([
        k.rect(screenWidth - 200, 150),
        k.color(...COLORS.WHITE),
        k.pos(100, screenHeight - 170),
        k.fixed(),
    ]);
}

export function addText(k, text, dialogBox) {
    const locale = gameState.getLocale();
    console.log(locale);
    const pos = k.vec2(20, 20);
    const textObj = k.text(formatText(text, locale));
    if (locale === LOCALES.AR) {
        pos.x += dialogBox.width - dialogBox.pos.x - textObj.width + 50;
    }
    dialogBox.add([
        k.text(formatText(text, locale)),
        k.color(...COLORS.BLACK),
        k.pos(pos),
        k.fixed(),
    ]);
}

export function getDialogText(npc, event) {
    const locale = gameState.getLocale();
    const data = dialogData[locale];
    return data[npc][event];
}
