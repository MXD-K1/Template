import { attack } from "./attack.js";
import {
    ATTACK_STATES,
    ATTACK_TARGETS,
    ATTACK_TYPES,
} from "../../utils/constants.js";

export function hitAttack(name, opts) {
    return {
        ...attack(name, opts),
        type: ATTACK_TYPES.MELEE,
        state: ATTACK_STATES.READY,
        target: ATTACK_TARGETS.SINGLE,

        damage: 0.5,

        cooldownTime: 3,
    };
}
