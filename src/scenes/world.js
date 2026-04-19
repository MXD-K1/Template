import { colorizeBG, drawMap, fetchData } from "../utils/utils.js";
import { createHero, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import { COLORS } from "../utils/constants.js";
import { worldCamera } from "../systems/camera.js";
//import { createPanel } from "../ui/components/panel.js";

export default async function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const map = await fetchData("assets/maps/map.json");

    drawMap(k, map);

    const hero = k.add(createHero(k, k.vec2(320, 170)));
    moveHero(k, hero);
    worldCamera(k, map, hero);

    //createPanel(k);
}
