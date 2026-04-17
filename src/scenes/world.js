import { colorizeBG, drawTiles, fetchData } from "../utils/utils.js";
import { createHero, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import { COLORS, tileHeight, tileWidth } from "../utils/constants.js";

export default async function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const map = k.add([k.pos(0, 0)]);
    const mapData = await fetchData("assets/maps/map.json"); // will be moved later

    for (const layer of mapData.layers) {
        drawTiles(k, map, layer, tileHeight, tileWidth);
    }

    const hero = k.add(createHero(k, k.vec2(320, 170)));
    moveHero(k, hero);

    k.setCamPos(hero.worldPos());
    k.setCamScale(1.5);
}
