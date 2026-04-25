import { colorizeBG, drawMap, fetchData, interactWithObjs } from "../utils/utils.js";
import { attackHero, checkHeroHp, createHero, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import { COLORS } from "../utils/constants.js";
import { controlEnemies } from "../entities/enemy.js";
import { worldCamera } from "../systems/camera.js";
import { createHPBar } from "../ui/healthbar.js";
import { createAcornRobot } from "../entities/enemies/AcornRobot.js";

export default async function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const map = await fetchData("assets/maps/maze.json");

    drawMap(k, map);

    const hero = k.add(createHero(k, k.vec2(320, 470)));
    k.add(createAcornRobot(k, k.vec2(820, 520)));
    moveHero(k, hero);
    k.onKeyPress("j", () => attackHero(k, hero));

    controlEnemies(k, hero);

    worldCamera(k, map, hero);
    createHPBar(k, hero);
    checkHeroHp(k, hero);

    const bg_music = k.play("bg_music", { loop: true });

    k.onKeyPress("e", () => {
        interactWithObjs(k, hero, (interactable) => {
            // The way this will work: check for obj entityName then add anything dialog, quest, etc...
        });
    });

    k.onSceneLeave(() => {
        bg_music.stop();
        hero.state = "idle";
    });
}
