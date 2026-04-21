import {
    COLORS,
    LOCALES,
    screenHeight,
    screenWidth,
} from "../utils/constants.js";
import { formatText } from "../utils/text.js";
import { gameState } from "../managers/stateManagers.js";

let curQuestNb = 1;
const quests = [];

export function createQuestsPanel(k) {
    return k.add([
        k.rect(screenWidth * 0.8, screenHeight * 0.8),
        k.color(COLORS.WHITE),
        k.anchor("center"),
        k.pos(k.center()),
        k.fixed(),
    ]);
}

export function addQuest(k, questPanel, questName, questDetails) {
    const locale = gameState.getLocale();

    questName = formatText(questName, locale);
    questDetails = formatText(questDetails, locale);

    const offset = k.vec2(20, 20);
    // TODO: wrap quest that exceeds the panel height
    const questBar = questPanel.add([
        k.rect(questPanel.width - 40, 100),
        k.pos(
            -questPanel.width * 0.5 + offset.x,
            -questPanel.height * 0.5 +
                offset.y * curQuestNb +
                100 * (curQuestNb - 1),
        ),
        // we need this because parent used `k.anchor('center')`
        k.color(COLORS.BLUE),
        k.outline(2),
        "quest",
        {
            qName: questName, // name is already in use
            qDetails: questDetails,
            qParent: questPanel, // parent return null outside, so I made this
        },
    ]);

    curQuestNb++;

    const namePos = k.vec2(5, 5);
    const detailsPos = k.vec2(10, 40);
    const nameTextWidth = k.text(questName).width;
    const detailsTextWidth = k.text(questDetails).width;
    if (locale === LOCALES.AR) {
        // Not Fixed yet
        // TODO: fix positioning
        namePos.x +=
            questBar.width - questBar.worldPos().x - nameTextWidth + 60;
        // namePos.x = questBar.width - nameTextWidth - 5;
        detailsPos.x = questBar.width - detailsTextWidth + 65;
    }
    questBar.add([k.text(questName, { size: 30 }), k.pos(namePos)]);
    questBar.add([k.text(questDetails, { size: 22 }), k.pos(detailsPos)]);
    //questPanel.add([k.area({ shape: new k.Rect(questBar.pos, 3, 3) })]);
    quests.push(questBar);
}

export function removeQuest(k, questName) {
    const locale = gameState.getLocale();

    questName = formatText(questName, locale);
    for (const quest of quests) {
        if (quest.qName === questName) {
            quest.destroy();
            quest.splice(quest.indexOf(quest), 1);
        }
    }
    updateQuests(k);
}

export function updateQuests(k) {
    // Needs to be called each time removeQuest is called
    const offset = k.vec2(20, 20);
    curQuestNb = 1;
    for (const quest of quests) {
        quest.pos.x = -quest.qParent.width * 0.5 + offset.x;
        quest.pos.y =
            -quest.qParent.height * 0.5 +
            +offset.y * curQuestNb +
            100 * (curQuestNb - 1);
        curQuestNb++;
    }
}
