import { createButton } from "../ui/components/button.js";
import { colorizeBG } from "../utils/utils.js";
import { getText } from "../managers/stateManagers.js";

export default function titleScene(k) {
    colorizeBG(k, 121, 192, 234);

    k.add([
        k.text("Naturonics", { size: 48, font: "sinko" }),
        k.anchor("center"),
        k.pos(k.width() / 2, 40),
    ]);

    createButton(k, getText("menu_start"), () => k.go("world"), {
        pos: k.vec2(k.width() / 2, k.height() / 2),
    });
    createButton(k, getText("menu_settings"), () => k.go("option"), {
        pos: k.vec2(k.width() / 2, k.height() / 2 + 80),
    });
}
