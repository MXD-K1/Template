import { createButton } from "../ui/button.js";

export default function titleScene(k) {
    k.add([
        k.text("Naturonics", { size: 48, font: "sinko" }),
        k.anchor("center"),
        k.pos(k.width() / 2, 40),
    ]);

    createButton(k, "Start Game", k.height() / 2, () => k.go("world"));
    createButton(k, "Options", k.height() / 2 + 80, () => k.go("load"));
}
