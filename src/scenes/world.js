import { colorizeBG, drawMap, fetchData } from "../utils/utils.js";
import { createHero, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import { COLORS } from "../utils/constants.js";
import { controlEnemies, createEnemy } from "../entities/enemy.js";
import { worldCamera } from "../systems/camera.js";
import { createBox } from "../ui/tempBox.js";
import { gameState } from "../managers/stateManagers.js";

export default async function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const map = await fetchData("assets/maps/map.json");

    drawMap(k, map);

    const hero = k.add(createHero(k, k.vec2(320, 470)));
    k.add(createEnemy(k, k.vec2(320, 520), {}));
    gameState.setFreezePlayer(false);
    moveHero(k, hero);

    controlEnemies(k, hero);

    worldCamera(k, map, hero);
    createBox(
        k,
        "Q1: Kill Enemies",
        "There are three enemies to the west, kill them! To kill them you must have a sword first.",
        { pos: k.vec2(100, 100), centerx: true },
    );

    const bg_music = k.play("bg_music", { loop: true });

    k.onSceneLeave(() => {
        bg_music.stop();
        hero.state = "idle";
    });
}
