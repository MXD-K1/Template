import { createEnemy } from "../enemy.js";

export function createAcornRobot(k, pos, opts) {
    const components = [
        ...createEnemy(
            k,
            "AcronRobot",
            pos,
            Object.assign(opts ?? {}, {
                rect: new k.Rect(k.vec2(8, 10), 16, 16),
                nosprite: true,
                speed: 8,
            }),
        ),
        k.sprite("AcronRobot", { anim: "down.idle" }),
        k.scale(2),
    ];

    return components;
}
