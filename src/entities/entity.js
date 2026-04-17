import { speedFactor } from "../utils/constants.js";

export function createEntity(k, pos) {
    return [
        k.pos(pos),
        k.area(),
        k.body(),
        k.opacity(),
        {
            speed: 10 * speedFactor,
            damage: 1,
        },
    ];
}
