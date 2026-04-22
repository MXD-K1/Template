import { createButton } from "../ui/components/button.js";
import { colorizeBG } from "../utils/utils.js";
import { gameState, getText } from "../managers/stateManagers.js";
import { createSpinner } from "../ui/components/spinner.js";
import { COLORS } from "../utils/constants.js";
import { createLabel } from "../ui/components/label.js";
import { getFont } from "../utils/font.js";

export default function optionsScene(k) {
    colorizeBG(k, ...COLORS.LIGHT_BLUE);

    const settings = createLabel(k, getText("menu_settings"), {
        pos: k.vec2(k.width() / 2, 50),
        font: getFont("big_label"),
        color: COLORS.WHITE,
    });

    const btnBack = createButton(
        k,
        getText("menu_back"),
        () => gameState.backToPrevScene(k),
        {
            pos: k.vec2(k.width() / 2, k.height() - 100),
        },
    );

    createSpinner(
        k,
        "Language:",
        ["English", "Spanish", "Indonesian", "Hindi"],
        (locale) => {
            gameState.setLocale(locale);
            settings.text = getText("menu_settings");
            btnBack.text = getText("menu_back");
        },
        {
            pos: k.vec2(200, 120),
            aliases: ["EN", "ES", "ID", "HI"],
            startFrom: gameState.getLocale(),
        },
    );
}
