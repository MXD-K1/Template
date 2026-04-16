import { colorizeBG } from "../utils/utils.js";
import { createHero, moveHero } from "../entities/hero.js";
import { globalInput } from "../utils/input.js";
import { COLORS } from "../utils/constants.js";

export default function createWorld(k) {
    colorizeBG(k, ...COLORS.BLACK);
    globalInput(k);

    const hero = k.add(createHero(k, k.vec2(320, 170)));
    moveHero(k, hero);

    k.setCamPos(hero.worldPos());
    k.setCamScale(1.5);
}
