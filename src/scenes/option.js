import { createButton } from "../ui/components/button.js";
import { colorizeBG } from "../utils/utils.js";
import { gameState, getText } from "../managers/stateManagers.js";
import { createSpinner } from "../ui/components/spinner.js";
import { COLORS } from "../utils/constants.js";
import { createLabel } from "../ui/components/label.js";
import { getFont } from "../utils/font.js";
import { savePlayerData } from "../ui/pauseMenu.js";

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
        () => {
            savePlayerData();
            gameState.setFreezePlayer(false);
            gameState.backToPrevScene(k);
        },
        {
            pos: k.vec2(k.width() / 2, k.height() - 100),
            font: getFont("button"),
        },
    );

    const nums = [];
    for (let i = 0; i <= 10; i++) {
        nums.push(i);
    }

    const volumeSpinner = createSpinner(
        k,
        getText("menu_volume"),
        nums,
        (volume) => {
            gameState.setVolume(volume);
            k.setVolume(gameState.getVolumeUint());
        },
        {
            pos: k.vec2(200, 120),
            font: getFont("button"),
            startFrom: gameState.getVolume(),
        },
    );

    const localeSpinner = createSpinner(
        k,
        getText("language"),
        ["English (EN)", "Español (ES)", "Indonesia (ID)", "हिन्दी (HI)"],
        (locale) => {
            gameState.setLocale(locale);
            settings.text = getText("menu_settings");
            btnBack.text = getText("menu_back");
            localeSpinner.text = getText("language");
            volumeSpinner.text = getText("menu_volume");
        },
        {
            pos: k.vec2(200, 180),
            font: getFont("button"),
            aliases: ["EN", "ES", "ID", "HI"],
            startFrom: gameState.getLocale(),
        },
    );
}
