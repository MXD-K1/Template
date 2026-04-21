import { createEntity } from "./entity.js";
import { worldCamera } from "../systems/camera.js";
import { hitAttack } from "./attacks/hitAttack.js";
import { ATTACK_STATES } from "../utils/constants.js";
import { playAnimIfNotPlaying } from "../utils/utils.js";

export function createEnemy(k, pos, opts = {}) {
    let hp = 3;
    let damage = 1;
    let resistance = 0;
    let range = 300;

    if (opts.hp) hp = opts.hp;
    if (opts.damage) damage = opts.damage;
    if (opts.resistance) resistance = opts.resistance;
    if (opts.range) range = opts.range;

    return [
        ...createEntity(k, pos, { speed: 60 }),
        k.sprite("hero", { anim: "hero.down.idle" }),
        k.area({ shape: new k.Rect(k.vec2(8, 40), 16, 16) }),
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
            
            attacks: {
                basicAttack: hitAttack("basicAttack", { damage: 0.5, cooldown: 1 }),
            },
            currentAttack: "basicAttack",
            lastAttackTime: 0,
        },
    ];
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

    const anim = `hero.${enemy.direction}.move`;
    playAnimIfNotPlaying(enemy, anim);
}

export function isInAttackRange(enemy, hero) {
    return enemy.pos.dist(hero.pos) <= enemy.attackRange;
}

export function executeAttack(enemy, attack, hero, k) {
    if (attack.state !== ATTACK_STATES.READY) return false;


    const totalDamage = enemy.damage + attack.damage;


    if (hero.hurt) {
        hero.hurt(totalDamage);
    }


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
        const seesPlayer = hasLos(enemy, hero);
        enemy.playerSeen = seesPlayer;

        if (enemy.playerSeen) {
            const inAttackRange = isInAttackRange(enemy, hero);

            if (inAttackRange) {
                const anim = `hero.${enemy.direction}.idle`;
                playAnimIfNotPlaying(enemy, anim);
                const attack = enemy.attacks[enemy.currentAttack];
                if (attack) {
                    executeAttack(enemy, attack, hero, k);
                }
            } else {

                moveEnemy(k, enemy, hero);
            }
        }
        else{
            const anim = `hero.${enemy.direction}.idle`;
            playAnimIfNotPlaying(enemy, anim);
        }
    });
}

// TODO: implement state machine
