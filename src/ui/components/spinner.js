import { getFont } from "../../utils/font.js";

export function createSpinner(
    k,
    text,
    choices,
    onClick,
    opts = {},
    parent = null,
) {
    let index = 0;
    let pos = opts.pos ?? k.vec2(0, 0);

    if (opts.startFrom) {
        if (opts.aliases) {
            index = opts.aliases.indexOf(opts.startFrom);
        } else {
            index = choices.indexOf(opts.startFrom);
        }
    }

    const spinner = k.add([]);
    spinner.text = spinner.text ?? text;
    const label = spinner.add([
        k.text(text, { ...(opts.font ?? getFont("label")) }),
        k.pos(pos),
    ]);
    const containerPos = k.vec2(pos);
    const mainContainer = spinner.add([k.pos(containerPos)]);

    const componentsPos = k.vec2(k.width() - mainContainer.pos.x - 370, 0);
    const container = mainContainer.add([
        k.pos(componentsPos),
        k.area({ shape: new k.Rect(k.vec2(0, 0), 300, 37) }),
    ]);

    const btnLeft = container.add([k.text("<"), k.area(), k.pos(0, 0)]);
    const btnRight = container.add([
        k.text(">"),
        k.area(),
        k.pos(k.vec2(280, 0)),
    ]);

    const choicePos = k.vec2(40, 0);
    const choice = container.add([
        k.text(choices[index], {
            size: 32,
            ...(opts.font ?? getFont("label")),
        }),
        k.pos(choicePos),
    ]);
    // TODO: [...] triggered an error about styles, so disable them

    btnLeft.onClick(() => {
        index = (index - 1 + choices.length) % choices.length;
    });
    btnRight.onClick(() => {
        index = (index + 1) % choices.length;
    });

    k.onUpdate(() => {
        choice.text = choices[index];
        choice.pos.x = pos.x - choice.width / 2 - 50;
    });

    container.onClick(() => {
        opts.ignoreAliases = opts.ignoreAliases ?? false;
        if (opts.aliases && !opts.ignoreAliases) {
            onClick(opts.aliases[index]);
        } else {
            onClick(choices[index]); // because of the delay in onUpdate
        }
    });

    k.onUpdate(() => {
        label.text = spinner.text;
    });

    return spinner;
}
