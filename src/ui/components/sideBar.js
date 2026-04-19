import { COLORS } from "../../utils/constants.js";
import { createUIComponent } from "../UIComponent.js";

export function createSideBar(k, opts = {}, parent) {
    const components = [
        k.rect(k.width * 0.2, k.height * 0.8),
        k.outline(2),
        k.color(COLORS.BLUE),
        k.pos(0, 0),
        // k.anchor("center"),
        {
            tabs: [],
        },
    ];

    const sideBar = createUIComponent(k, components, opts);

    if (parent) {
        sideBar.pos.x = 500;
        sideBar.pos.y = 500;
    }

    return sideBar;
}

export function addTab(k, sidebar, tab) {
    sidebar.tabs.push(tab);
}

export function updateSideBar(k, sidebar) {
    for (const [index, tab] of sidebar.tabs.entries()) {
        tab.pos.x = sidebar.pos.x;
        tab.pos.y = sidebar.pos.y + tab.width * index;
    }
}
