import { COLORS } from "../../utils/constants.js";
import { createUIComponent } from "../UIComponent.js";

let panel = null;

export function createPanel(k) {
    const components = [
        k.rect(k.width() * 0.8, k.height() * 0.8),
        k.pos(k.center()),
        k.anchor("center"),
        k.outline(2, COLORS.BLACK),
        k.fixed(),
        {
            sideBar: null,
            selectedTab: null,
            footer: null,
        },
    ];

    panel = createUIComponent(k, components);
}

export function addSideBar() {}
