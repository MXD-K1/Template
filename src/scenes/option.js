import { createButton } from "../ui/components/button.js";
import { colorizeBG } from "../utils/utils.js";
import { gameState, getText } from "../managers/stateManagers.js";
import { createSpinner } from "../ui/components/spinner.js";
import { COLORS } from "../utils/constants.js";

export default function optionsScene(k) {
    colorizeBG(k, ...COLORS.LIGHT_BLUE);

    k.add([
        k.text(getText("menu_settings"), { size: 44, font: "sinko" }),
        k.anchor("center"),
        k.pos(k.width() / 2, 50),
    ]);

    createButton(k, getText("menu_back"), () => gameState.backToPrevScene(k), {
        pos: k.vec2(k.width() / 2, k.height() - 100),
    });

    createSpinner(
        k,
        "Language:",
        ["English", "Spanish", "Indonesian", "Hindi"],
        (locale) => {
            gameState.setLocale(locale);
        },
        {
            pos: k.vec2(200, 120),
            aliases: ["EN", "ES", "ID", "HI"],
        },
    );
}
