import { COLORS } from "../../utils/constants.js";
import { createUIComponent } from "../UIComponent.js";
import { getFont } from "../../utils/font.js";

export function createLabel(k, text, opts = {}, parent = null) {
    const components = [
        k.text(text, { ...(opts.font ?? getFont("label")) }),
        k.pos(0, 0),
        k.color(opts.color ?? COLORS.BLACK),
        k.anchor("center"),
        k.fixed(),
    ];

    if (opts.center) {
        if (!parent) {
            components.push(k.pos(k.center()));
        }
    }

    const label = createUIComponent(k, components, opts, parent);

    if (opts.pos) {
        label.pos = opts.pos;
    }

    return label;
}
