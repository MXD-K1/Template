import { createEntity } from "./entity.js";
import { gameState } from "../managers/stateManagers.js";
import { playAnimIfNotPlaying } from "../utils/utils.js";

export function createHero(k, pos) {
    return [
        ...createEntity(k, pos),
        k.sprite("player", { anim: "player.down.move" }),
        k.area({ shape: new k.Rect(k.vec2(8, 40), 16, 16) }),
        // k.health(),
        "player",
        {
            direction: "down",
        },
    ];
}

export function moveHero(k, hero) {
    const margin = 32;
    const minX = margin;
    const minY = margin;
    const maxX = k.width() - margin - hero.width;
    const maxY = k.height() - margin - hero.height;

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
            hero.move(moveVec.x * k.dt(), moveVec.y * k.dt());

            playAnimIfNotPlaying(hero, `player.${hero.direction}.move`);
        } else {
            playAnimIfNotPlaying(hero, `player.${hero.direction}.idle`);
        }

        hero.pos.x = Math.max(minX, Math.min(hero.pos.x, maxX));
        hero.pos.y = Math.max(minY, Math.min(hero.pos.y, maxY));
    });
}
