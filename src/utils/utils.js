import {
    screenWidth,
    screenHeight,
    tileWidth,
    tileHeight,
} from "./constants.js";

export function colorizeBG(k, r, g, b) {
    k.add([k.rect(screenWidth, screenHeight), k.color(r, g, b), k.fixed()]);
}

export function playAnimIfNotPlaying(gameObj, animName) {
    if (gameObj.curAnim() !== animName) gameObj.play(animName);
}

export async function fetchData(mapPath) {
    return await (await fetch(mapPath)).json();
} // also works for map data

export function drawTiles(k, map, layer, tileHeight, tileWidth) {
    // This function will be used in drawing maps
    let nbOfDrawnTiles = 0;
    const tilePos = k.vec2();
    for (const tile of layer.data) {
        if (nbOfDrawnTiles % layer.width === 0) {
            tilePos.x = 0;
            tilePos.y += tileHeight;
        } else {
            tilePos.x += tileWidth;
        }

        nbOfDrawnTiles++;
        if (tile === 0) continue;

        // Rendering happens here.
        map.add([
            k.sprite("assets", { frame: tile - 1 }), // kaplay starts from 0 while tiled start from 1
            k.pos(tilePos),
            k.offscreen(),
        ]);
    }
}


export function createButton(k, label, y, onPress) {
    const button = k.add([
        k.rect(220, 52),
        k.anchor("center"),
        k.pos(k.width() / 2, y),
        k.area(),
        k.outline(2),
        k.color(255, 255, 255),
    ]);

    button.add([
        k.text(label, { size: 24, font: "sinko" }),
        k.anchor("center"),
        k.pos(0, 0),
        k.color(0, 0, 0),
    ]);

    button.onClick(onPress);
    return button;
}