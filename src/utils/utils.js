import {
    screenHeight,
    screenWidth,
    tileHeight,
    tileWidth,
} from "./constants.js";
import { gameState } from "../managers/stateManagers.js";

const ENEMY_ATTACK_FX_OFFSET = 24;
const DIR_ANGLES = {
    right: 0,
    "down.right": 45,
    down: 90,
    "down.left": 135,
    left: 180,
    "up.left": 225,
    up: 270,
    "up.right": 315,
};

export function colorizeBG(k, r, g, b) {
    k.add([k.rect(screenWidth, screenHeight), k.color(r, g, b), k.fixed()]);
}

export function playAnimIfNotPlaying(gameObj, animName, speed = 1) {
    if (gameObj.curAnim() !== animName) gameObj.play(animName, speed);
}

export async function fetchData(mapPath) {
    return await (await fetch(mapPath)).json();
} // also works for map data

function drawTiles(k, layer, tileHeight, tileWidth) {
    for (let i = 0; i < layer.data.length; i++) {
        const tile = layer.data[i];
        if (tile === 0) continue;

        const x = (i % layer.width) * tileWidth;
        const y = Math.floor(i / layer.width) * tileHeight;

        k.drawSprite({
            sprite: "assets",
            frame: tile - 1,
            pos: k.vec2(x, y),
        });
    }
}

function generateColliderBoxComponents(k, width, height, pos, rotation, tag) {
    return [
        k.area({ shape: new k.Rect(k.vec2(0, 0), width, height) }), // vec2(0) same as vec2(0, 0)
        k.pos(pos),
        k.body({ isStatic: true }),
        k.rotate(rotation),
        tag,
    ];
}

function drawBoundaries(k, mapColliders, layer) {
    for (const object of layer.objects) {
        mapColliders.add(
            generateColliderBoxComponents(
                k,
                object.width,
                object.height,
                k.vec2(object.x, object.y + 16),
                object.rotation,
                object.name,
            ),
        );
    }
}

export function drawMap(k, map) {
    const mapColliders = k.add([k.pos(0, 0)]);

    for (const layer of map.layers) {
        if (layer.name === "Collisions") {
            drawBoundaries(k, mapColliders, layer);
        }
    }

    k.onDraw(() => {
        for (const layer of map.layers) {
            if (layer.name === "Collisions") continue;
            drawTiles(k, layer, tileHeight, tileWidth);
        }
    });
}

export function isObject(obj) {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

export function getClosestEntityInRange(k, origin, tag, range) {
    // works for enemies and interactable objects as well
    let target = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const entity of k.get(tag)) {
        const distance = origin.pos.dist(entity.pos);

        if (distance > range || distance >= closestDistance) continue;

        target = entity;
        closestDistance = distance;
    }

    return target;
}

export function interactWithObjs(k, origin, execute) {
    // args is an obj, execute must have one arg at least
    const target = getClosestEntityInRange(k, origin, "interactable", 50);
    if (target === null) return;

    gameState.setFreezePlayer(true);
    execute(target);
    gameState.setFreezePlayer(false);
}

export function spawnAttackEffect(k, person) {
    const angle = DIR_ANGLES[person.direction] ?? 90;

    k.add([
        k.sprite("pipe_attack", { anim: "slash" }),
        k.pos(
            person.pos.add(
                k.Vec2.fromAngle(angle).scale(ENEMY_ATTACK_FX_OFFSET),
            ),
        ),
        k.anchor("center"),
        k.rotate(angle),
        k.opacity(),
        k.lifespan(0.4),
    ]);
}
