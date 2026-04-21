import { tileHeight, tileWidth, camScale } from "../utils/constants.js";

export function worldCamera(k, mapData, person) {
    k.setCamScale(camScale);

    const visibleWidth = k.width() / camScale;
    const visibleHeight = k.height() / camScale;

    const mapWidth = mapData.width * tileWidth;
    const mapHeight = mapData.height * tileHeight;

    k.onUpdate(() => {
        let camX = person.worldPos().x;
        let camY = person.worldPos().y;

        camX = Math.max(
            visibleWidth / 2,
            Math.min(camX, mapWidth - visibleWidth / 2),
        );
        camY = Math.max(
            visibleHeight / 2,
            Math.min(camY, mapHeight - visibleHeight / 2),
        );

        k.setCamPos(camX, camY);
        setCamBorder(k, [mapWidth, mapHeight], person);
    });
}

function setCamBorder(k, mapDimensions, person) {
    const margin = 32;
    const minX = margin;
    const minY = margin;
    const maxX = mapDimensions[0] - margin - person.width;
    const maxY = mapDimensions[1] - margin - person.height;

    person.pos.x = Math.max(minX, Math.min(person.pos.x, maxX));
    person.pos.y = Math.max(minY, Math.min(person.pos.y, maxY));
}
