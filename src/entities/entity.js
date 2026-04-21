import { speedFactor } from "../utils/constants.js";

export function createEntity(k, pos, opts={}) {
    return [
        k.pos(pos),
        k.area(),
        k.body(),
        k.opacity(),
        {
            speed: opts.speed || 10 * speedFactor,
        },
    ];
}
