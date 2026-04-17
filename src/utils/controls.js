import { isMobile } from "./utils.js";

const TOUCH_CONTROLS = {}; // when we add mobile support

const KEYBOARD_CONTROLS = {
    left: ["left", "a"],
    right: ["right", "d"],
    up: ["up", "w"],
    down: ["down", "s"],
    pause: ["p"],
};

const KEYBOARD_MOUSE_CONTROLS = {};

const GAMEPAD_CONTROLS = {
    left: ["left"],
    right: ["right"],
    up: ["up"],
    down: ["down"],
};
// TODO: add support for gamepads (I dont have one)

export function getKeybinding(k, command) {
    const controller = detectControllerType(k);
    switch (controller) {
        case "keyboard":
            return KEYBOARD_CONTROLS[command];
        case "keyboard+mouse":
            return KEYBOARD_MOUSE_CONTROLS[command];
        case "gamepad":
            return GAMEPAD_CONTROLS[command];
        case "touch":
            return TOUCH_CONTROLS[command];
    }
}

function detectControllerType(k) {
    if (k.getGamepads().length > 0) return "gamepad";
    if (isMobile()) return "touch";
    // TODO: complete the function
}
