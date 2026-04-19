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

export function drawMap(k, map) {
    k.onDraw(() => {
        for (const layer of map.layers) {
            drawTiles(k, layer, tileHeight, tileWidth);
        }
    });
}
