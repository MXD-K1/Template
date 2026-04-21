import {
    screenWidth,
    screenHeight,
    tileWidth,
    tileHeight,
} from "./constants.js";
import { createHero, moveHero } from "../entities/hero.js";
import { worldCamera } from "../systems/camera.js";

export function colorizeBG(k, r, g, b) {
    k.add([k.rect(screenWidth, screenHeight), k.color(r, g, b), k.fixed()]);
}

export function playAnimIfNotPlaying(gameObj, animName) {
    if (gameObj.curAnim() !== animName) gameObj.play(animName);
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
        //k.offscreen(),
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
