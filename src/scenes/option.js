import { createButton } from "../ui/components/button.js";
import { colorizeBG } from "../utils/utils.js";

export default function optionsScene(k) {
    colorizeBG(k, 121, 192, 234);

    k.add([
        k.text("Options", { size: 44, font: "sinko" }),
        k.anchor("center"),
        k.pos(k.width() / 2, 50),
    ]);

    createButton(k, "Back", k.height() - 100, () => k.go("title"));
}
