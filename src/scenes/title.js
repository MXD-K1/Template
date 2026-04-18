import { createButton } from "../ui/components/button.js";
import { colorizeBG } from "../utils/utils.js";

export default function titleScene(k) {
    colorizeBG(k, 121, 192, 234);

    k.add([
        k.text("Naturonics", { size: 48, font: "sinko" }),
        k.anchor("center"),
        k.pos(k.width() / 2, 40),
    ]);

    createButton(k, "Start Game", k.height() / 2, () => k.go("world"));
    createButton(k, "Options", k.height() / 2 + 80, () => k.go("option"));
}
