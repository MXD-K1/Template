import { COLORS } from "../../utils/constants.js";
import { createUIComponent } from "../UIComponent.js";

let panel = null;

export function createPanel(k, opts) {
    const components = [
        k.rect(k.width() * 0.8, k.height() * 0.8),
        k.pos(0, 0),
        k.outline(2, COLORS.BLACK),
        k.fixed(),
        {
            sideBar: null,
            selectedTab: null,
            footer: null,
        },
    ];

    if (opts.center) {
        components.push(k.pos(k.center()));
        components.push(k.anchor("center"));
    }

    panel = createUIComponent(k, components, opts);
}

export function getPanel() {
    return panel;
}

export function addSideBar() {}
