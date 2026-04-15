import { createEntity } from "./entity.js";
import { gameState } from "../managers/managers.js";
import { playAnimIfNotPlaying } from "../utils/utils.js";

export function createHero(k, pos) {
    return [
        ...createEntity(k, pos),
        k.sprite("player", { anim: "player.down.move" }),
        k.area({ shape: new k.Rect(k.vec2(8, 8), 9, 10) }),
        // k.health(),
        "player",
        {
            direction: "down",
        },
    ];
}

export function moveHero(k, hero) {
    hero.onKeyDown((key) => {
        if (gameState.getFreezePlayer()) return;

        const moveVec = k.vec2(0, 0);
        if (key === "left" || key === "a") {
            moveVec.x = -hero.speed;
            hero.direction = "left";
        }
        if (key === "right" || key === "d") {
            moveVec.x = hero.speed;
            hero.direction = "right";
        }
        if (key === "down" || key === "s") {
            moveVec.y = hero.speed;
            hero.direction = "down";
        }
        if (key === "up" || key === "w") {
            moveVec.y = -hero.speed;
            hero.direction = "up";
        }
        hero.move(moveVec.x * k.dt(), moveVec.y * k.dt());
        playAnimIfNotPlaying(hero, `player.${hero.direction}.move`);
    });
} // TODO: fix the doubled speed when using two keys at once
