import { colorizeBG, drawMap, fetchData } from "../utils/utils.js";
import { createHero, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import {
    COLORS,
    screenWidth,
    screenHeight,
    tileHeight,
    tileWidth,
} from "../utils/constants.js";
import { createEnemy, controlEnemies } from "../entities/enemy.js";
import { worldCamera } from "../systems/camera.js";

export default async function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const map = await fetchData("assets/maps/map.json");

    drawMap(k, map);

    const hero = k.add(createHero(k, k.vec2(320, 470)));
    k.add(createEnemy(k, k.vec2(400, 170), {}));
    moveHero(k, hero);

    controlEnemies(k, hero);

    worldCamera(k, map, hero);

    k.play("bg_music");
}
