import { createUIComponent } from "../UIComponent.js";
import { createLabel } from "./label.js";
import { COLORS } from "../../utils/constants.js";

export function createButton(k, text, onPress, opts = {}, parent = null) {
    const components = [
        k.rect(220, 50),
        k.area(),
        k.outline(2),
        k.color(COLORS.WHITE),
        k.pos(0, 0),
        k.anchor("center"),
    ];

    if (opts.center) {
        components.push(k.pos(k.center()));
        components.push(k.anchor("center"));
    }

    if (opts.pos) {
        components.push(k.pos(opts.pos));
    }

    const button = createUIComponent(k, components, opts, parent);
    button.onClick(onPress);

    opts.centerText = opts.centerText ?? true;
    opts.alignText = opts.align ?? "center";
    createLabel(
        k,
        text,
        { align: opts.alignText, center: opts.centerText },
        button,
    );

    return button;
}
