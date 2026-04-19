import { COLORS } from "../../utils/constants.js";
import { createUIComponent } from "../UIComponent.js";

export function createSideBar(k, opts = {}, parent = null) {
    const components = [
        k.rect(k.width() * 0.2, k.height() * 0.8),
        k.outline(2),
        k.color(COLORS.WHITE),
        k.pos(0, 0),
        k.anchor("topleft"),
        {
            tabs: [],
        },
    ];

    return createUIComponent(k, components, opts, parent);
}

export function addTab(k, sidebar, tab) {
    sidebar.tabs.push(tab);
    updateSideBar(k, sidebar);
}

export function updateSideBar(k, sidebar) {
    for (const [index, tab] of sidebar.tabs.entries()) {
        tab.width = sidebar.width;
        tab.pos.x += tab.width / 2;
        tab.pos.y += tab.height / 2; //+ tab.width * index;
    }
}
