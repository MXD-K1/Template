import { createButton } from "../ui/components/button.js";
import { colorizeBG } from "../utils/utils.js";
import { gameState, getText } from "../managers/stateManagers.js";
import { COLORS, GAME_NAME, version } from "../utils/constants.js";
import { createLabel } from "../ui/components/label.js";

export default function titleScene(k) {
    colorizeBG(k, ...COLORS.LIGHT_BLUE);

    k.add([
        k.text(GAME_NAME, { size: 48, font: "sinko" }),
        k.anchor("center"),
        k.pos(k.width() / 2, 40),
    ]);

    createButton(
        k,
        getText("menu_start"),
        () => gameState.goToScene(k, "world"),
        {
            pos: k.vec2(k.width() / 2, k.height() / 2),
        },
    );
    createButton(
        k,
        getText("menu_settings"),
        () => gameState.goToScene(k, "option"),
        {
            pos: k.vec2(k.width() / 2, k.height() / 2 + 80),
        },
    );

    createLabel(k, version, {
        pos: k.vec2(k.width() - 50, k.height() - 30),
        color: COLORS.WHITE,
    });
}
