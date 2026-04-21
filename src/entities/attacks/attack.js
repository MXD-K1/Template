import { ATTACK_STATES } from "../../utils/constants.js";

export function attack(attackName, opts) {
    const name = attackName; // immutable

    const attackInfo = {
        name,
        type: null, // See ATTACK_TYPES
        state: null, // See ATTACK_STATES
        target: null, // See ATTACK_TARGETS

        damage: 1, // added to the base enemy damage. Also, can be (heal)
        missChance: 0, // between 0 and 1

        // Decision: should attacks need cost to be used?
        // TODO: find a way to implement damage type
        //  (if elemental it should stay for some time)
        //  possible types: "elemental", "Physical", "mental"

        cooldownTime: null,
        // start time should not be called never outside this file
        startTime: null,

        effects: null, // TODO: to be added in later stage
    };

    if (opts.type) attackInfo.type = opts.type;
    if (opts.locked) attackInfo.state = ATTACK_STATES.LOCKED;
    if (opts.target) attackInfo.target = opts.target;
    if (opts.damage) attackInfo.damage = opts.damage;
    if (opts.missChance) attackInfo.missChance = opts.missChance;
    // noinspection JSUnresolvedReference
    if (opts.cooldown) attackInfo.cooldownTime = opts.cooldown;

    return attackInfo;
}

export function updateAttack(k, attack) {
    k.onUpdate(() => {
        if (attack.state !== ATTACK_STATES.COOLDOWN) return;
        if (k.currentTime - attack.startTime >= attack.cooldownTime)
            attack.state = ATTACK_STATES.READY;
    });
}
