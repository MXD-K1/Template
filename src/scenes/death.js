import { colorizeBG } from "../utils/utils.js";
import { COLORS } from "../utils/constants.js";
import { createLabel } from "../ui/components/label.js";
import { getFont } from "../utils/font.js";
import { gameState } from "../managers/stateManagers.js";

export function deathScene(k) {
    colorizeBG(k, ...COLORS.BLACK);
    createLabel(k, "You died", {
        pos: k.center(),
        color: COLORS.WHITE,
        font: getFont("big_label"),
    });

    k.wait(3, () => {
        gameState.goToScene(k, "world");
    });
}
