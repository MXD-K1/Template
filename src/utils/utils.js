import {
    camScale,
    screenHeight,
    screenWidth,
    tileHeight,
    tileWidth,
} from "./constants.js";
import { gameState } from "../managers/stateManagers.js";
import { createHero } from "../entities/hero.js";
import { createAcornRobot } from "../entities/enemies/AcornRobot.js";

const ENEMY_ATTACK_FX_OFFSET = 10;
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

function drawVisibleTiles(k, map, layer) {
    const cam = k.getCamPos();
    const viewWidth = k.width() / camScale;
    const viewHeight = k.height() / camScale;

    const startCol = Math.max(
        0,
        Math.floor((cam.x - viewWidth / 2) / tileWidth) - 1,
    );
    const endCol = Math.min(
        layer.width,
        Math.ceil((cam.x + viewWidth / 2) / tileWidth) + 1,
    );

    const startRow = Math.max(
        0,
        Math.floor((cam.y - viewHeight / 2) / tileHeight) - 1,
    );
    const endRow = Math.min(
        map.height,
        Math.ceil((cam.y + viewHeight / 2) / tileHeight) + 1,
    );

    for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
            const index = row * layer.width + col;
            const tile = layer.data[index];

            if (tile === 0) continue;

            k.drawSprite({
                sprite: "assets",
                frame: tile - 1,
                pos: k.vec2(col * tileWidth, row * tileHeight),
            });
        }
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
                k.vec2(object.x, object.y),
                object.rotation,
                object.name,
            ),
        );
    }
}

export function drawMap(k, map) {
    const mapColliders = k.add([k.pos(0, 0)]);
    const tileLayers = [];

    for (const layer of map.layers) {
        if (layer.name === "Collisions") {
            drawBoundaries(k, mapColliders, layer);
            continue;
        }

        if (layer.name === "SpawnPoints") {
            for (const object of layer.objects) {
                if (object.name === "hero") {
                    k.add(createHero(k, k.vec2(object.x, object.y)));
                    continue;
                }

                if (object.name === "AcronRobot") {
                    k.add(createAcornRobot(k, k.vec2(object.x, object.y)));
                    continue;
                }
            }
            continue;
        }

        if (layer.type === "tilelayer") {
            tileLayers.push(layer);
        }
    }

    k.onDraw(() => {
        for (const layer of tileLayers) {
            drawVisibleTiles(k, map, layer);
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

    const handOffset = k.vec2(5, 32);
    const spawnPos = person.pos
        .add(handOffset)
        .add(k.Vec2.fromAngle(angle).scale(ENEMY_ATTACK_FX_OFFSET));

    k.add([
        k.sprite("pipe_attack", { anim: "slash" }),
        k.pos(spawnPos),
        k.anchor("center"),
        k.rotate(angle),
        k.opacity(),
        k.lifespan(0.4),
    ]);
}
