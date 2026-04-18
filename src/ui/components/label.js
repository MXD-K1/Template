import { COLORS } from "../../utils/constants.js";
import { createUIComponent } from "../UIComponent.js";

export function createLabel(k, text, opts = {}, parent = null) {
    const components = [
        k.text(text, { font: getFont(opts.font ?? "label") }),
        k.color(opts.color ?? COLORS.BLACK),
        k.fixed(),
    ];

    return createUIComponent(k, components, opts, parent);
}
