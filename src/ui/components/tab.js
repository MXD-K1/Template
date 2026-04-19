import { createButton } from "./button.js";

export function createTab(k, text, onPress, opts, parent = null) {
    const button = createButton(k, text, onPress, opts, parent);
    button.add([
        {
            components: [],
        },
    ]);
    return button;
}
