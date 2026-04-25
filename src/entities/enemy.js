import { createEntity } from "./entity.js";
import { hitAttack } from "./attacks/hitAttack.js";
import { ATTACK_STATES } from "../utils/constants.js";
import { playAnimIfNotPlaying, spawnAttackEffect } from "../utils/utils.js";

export function createEnemy(k, name, pos, opts = {}) {
    let hp = 3;
    let damage = 1;
    let resistance = 0;
    let range = 300;
    let attacks = null;

    if (opts.hp) hp = opts.hp;
    if (opts.damage) damage = opts.damage;
    if (opts.resistance) resistance = opts.resistance;
    if (opts.range) range = opts.range;
    if (opts.attacks) attacks = opts.attacks;

    const components = [
        ...createEntity(k, name ?? "enemy", pos, opts),
        k.health(hp),
        k.sentry({ raycastExclude: ["enemy"] }, { lineOfSight: true }),
        "enemy",
        {
            playerSeen: false,
            damage: damage,
            resistance: resistance,
            range: range,
            attackRange: 50,
            direction: "down",
            state: "idle",

            attacks: attacks ?? {
                basicAttack: hitAttack("basicAttack", {
                    damage: 0.5,
                    cooldown: 1,
                }),
            },
            currentAttack: "basicAttack",
            lastAttackTime: 0,
        },
    ];

    if (!opts.nosprite) {
        components.push(k.sprite("hero", { anim: "down.idle" }));
    }

    return components;
}

export function takeDamage(enemy, damage) {
    if (damage - enemy.resistance <= 0) return;

    enemy.hurt(damage - enemy.resistance);
}

export function hasLos(enemy, player) {
    return enemy.pos.dist(player.pos) <= enemy.range;
}

export function equipAttack(enemy, attack) {
    enemy.attacks[attack.name] = attack;
}

export function moveEnemy(k, enemy, hero) {
    const dir = hero.pos.sub(enemy.pos).unit();
    enemy.move(dir.x * enemy.speed, dir.y * enemy.speed);

    let xDir = "";
    let yDir = "";

    if (dir.x > 0.1) xDir = "right";
    else if (dir.x < -0.1) xDir = "left";

    if (dir.y > 0.1) yDir = "down";
    else if (dir.y < -0.1) yDir = "up";

    if (xDir && yDir) enemy.direction = `${yDir}.${xDir}`;
    else if (xDir) enemy.direction = xDir;
    else if (yDir) enemy.direction = yDir;

    if (dir) enemy.state = "move";
    else enemy.state = "idle";

    const anim = `${enemy.direction}.${enemy.state}`;
    playAnimIfNotPlaying(enemy, anim);
}

export function isInAttackRange(enemy, hero) {
    return enemy.pos.dist(hero.pos) <= enemy.attackRange;
}

export function executeAttack(k, enemy, attack, hero, effect = false) {
    if (attack.state !== ATTACK_STATES.READY) return false;

    const totalDamage = enemy.damage + attack.damage;
    if (effect) {
        spawnAttackEffect(k, enemy);
    }

    enemy.state = "attack";
    playAnimIfNotPlaying(enemy, `${enemy.direction}.${enemy.state}`);

    if (hero.hurt) {
        hero.hurt(totalDamage);
    }

    enemy.state = "idle";

    attack.state = ATTACK_STATES.COOLDOWN;
    attack.startTime = k.currentTime;

    if (attack.cooldownTime) {
        k.wait(attack.cooldownTime, () => {
            if (attack.state === ATTACK_STATES.COOLDOWN) {
                attack.state = ATTACK_STATES.READY;
            }
        });
    }

    return true;
}

export function controlEnemies(k, hero) {
    k.onUpdate("enemy", (enemy) => {
        enemy.playerSeen = hasLos(enemy, hero);

        if (enemy.playerSeen) {
            const inAttackRange = isInAttackRange(enemy, hero);

            if (inAttackRange) {
                enemy.state = "idle";
                const anim = `${enemy.direction}.${enemy.state}`;
                playAnimIfNotPlaying(enemy, anim);
                const attack = enemy.attacks[enemy.currentAttack];
                if (attack) {
                    executeAttack(k, enemy, attack, hero);
                }
            } else {
                moveEnemy(k, enemy, hero);
            }
        } else {
            enemy.state = "idle";
            const anim = `${enemy.direction}.${enemy.state}`;
            playAnimIfNotPlaying(enemy, anim);
        }
    });
}

// TODO: implement state machine
