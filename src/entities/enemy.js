import { createEntity } from "./entity.js";

export function createEnemy(k, pos) {
    return [
        ...createEntity(k, pos),
        // k.health(),
        {
            attackPower: 1,
            speed: 50,
        },
    ];
}
