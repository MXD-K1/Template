import { createEntity } from "./entity.js";
import { gameState } from "../managers/stateManagers.js";
import { playAnimIfNotPlaying } from "../utils/utils.js";

export function createHero(k, pos) {
    return [
        ...createEntity(k, pos),
        k.sprite("hero", { anim: "hero.down.move" }),
        k.area({ shape: new k.Rect(k.vec2(8, 40), 16, 16) }),
        k.health(10),
        "hero",
        {
            damage: 2,
            direction: "down",
        },
    ];
}

export function moveHero(k, hero) {
    hero.onUpdate(() => {
        if (gameState.getFreezePlayer()) return;

        const moveVec = k.vec2(0, 0);

        const left = k.isKeyDown("left") || k.isKeyDown("a");
        const right = k.isKeyDown("right") || k.isKeyDown("d");
        const down = k.isKeyDown("down") || k.isKeyDown("s");
        const up = k.isKeyDown("up") || k.isKeyDown("w");

        let dir = hero.direction;

        if (left) {
            moveVec.x -= 1;
            dir = "left";
        }
        if (right) {
            moveVec.x += 1;
            dir = "right";
        }
        if (down) {
            moveVec.y += 1;
            dir = "down";
        }
        if (up) {
            moveVec.y -= 1;
            dir = "up";
        }

        if (down && left) dir = "down.left";
        if (down && right) dir = "down.right";
        if (up && left) dir = "up.left";
        if (up && right) dir = "up.right";

        hero.direction = dir;

        const len = moveVec.len();
        if (len > 0) {
            // Normalize vector so that diagonal movement isn't faster
            moveVec.x = (moveVec.x / len) * hero.speed;
            moveVec.y = (moveVec.y / len) * hero.speed;
            hero.move(moveVec.x, moveVec.y);

            playAnimIfNotPlaying(hero, `hero.${hero.direction}.move`);
        } else {
            playAnimIfNotPlaying(hero, `hero.${hero.direction}.idle`);
        }
    });
}
