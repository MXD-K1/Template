import {
    colorizeBG,
    drawMap,
    fetchData,
    interactWithObjs,
} from "../utils/utils.js";
import { attackHero, checkHeroHp, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import { COLORS } from "../utils/constants.js";
import { controlEnemies } from "../entities/enemy.js";
import { worldCamera } from "../systems/camera.js";
import { createHPBar } from "../ui/healthbar.js";
import { createNotificationBar } from "../ui/notification.js";
import { gameState } from "../managers/stateManagers.js";
import { createBox } from "../ui/tempBox.js";

export default async function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const map = await fetchData("assets/maps/maze.json");
    const tutorialData = await fetchData("data/tutorial.json");
    const tutorialByLocale =
        tutorialData[gameState.getLocale()] ?? tutorialData.EN ?? {};
    let hasShownAttackTutorial = { attack: false };
    const quests = await fetchData("data/quests.json");
    const questByLocale =
        quests[gameState.getLocale()] ?? tutorialData.EN ?? {};

    drawMap(k, map);

    const hero = k.get("hero")[0];
    const pos = gameState.getPlayer()?.saveSlot?.pos;
    if (pos) {
        hero.pos = k.vec2(pos.x, pos.y);
    }

    let enemiesKilled = gameState.getPlayer()?.saveSlot?.complete ?? false;

    createNotificationBar(k, tutorialByLocale.move, null, 5);
    moveHero(k, hero);
    k.onKeyPress("j", () => attackHero(k, hero));

    controlEnemies(k, hero, {
        tutOnAttack() {
            if (hasShownAttackTutorial.attack) return;

            hasShownAttackTutorial = {
                ...hasShownAttackTutorial,
                attack: true,
            };
            createNotificationBar(k, tutorialByLocale.attack, null, 5);
            createBox(
                k,
                questByLocale.Quest1.name,
                questByLocale.Quest1.info,
                {},
            );

            k.wait(5, () => {
                createNotificationBar(k, tutorialByLocale.pause, null, 5);
            });

            // k.wait(10, () => {
            //     createNotificationBar(k, tutorialByLocale.interact, null, 5);
            // });
        },
    });

    worldCamera(k, map, hero);
    createHPBar(k, hero);
    checkHeroHp(k, hero);

    const bg_music = k.play("bg_music", { loop: true });

    k.onKeyPress("e", () => {
        interactWithObjs(k, hero, (interactable) => {
            // The way this will work: check for obj entityName then add anything dialog, quest, etc...
        });
    });

    k.onUpdate(() => {
        if (k.get("enemy").length === 0 && !enemiesKilled) {
            createBox(
                k,
                questByLocale.Quest2.name,
                questByLocale.Quest2.info,
                {},
            );
            gameState.getPlayer().saveSlot.complete = true;
            enemiesKilled = true;
        }
    });

    k.onSceneLeave(() => {
        bg_music.stop();
        hero.state = "idle";
        gameState.getPlayer().saveSlot.pos = hero.pos;
    });
}
