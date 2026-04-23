import { colorizeBG, drawMap, fetchData } from "../utils/utils.js";
import { createHero, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import { COLORS } from "../utils/constants.js";
import { controlEnemies, createEnemy } from "../entities/enemy.js";
import { worldCamera } from "../systems/camera.js";
import { gameState } from "../managers/stateManagers.js";

export default async function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const map = await fetchData("assets/maps/map.json");

    drawMap(k, map);

    const hero = k.add(createHero(k, k.vec2(320, 470)));
    k.add(createEnemy(k, k.vec2(320, 520), {}));
    moveHero(k, hero);

    controlEnemies(k, hero);

    worldCamera(k, map, hero);

    k.play("bg_music", {
        volume: gameState.getVolumeUint() / 10,
    });
}
