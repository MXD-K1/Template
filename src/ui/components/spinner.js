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
    let clicked = false;

    const spinner = k.add([]);
    spinner.add([k.text(text), k.pos(pos)]);
    const containerPos = k.vec2(pos);
    const mainContainer = spinner.add([k.pos(containerPos)]);

    const componentsPos = k.vec2(k.width() - mainContainer.pos.x - 280, 0);
    const container = mainContainer.add([
        k.pos(componentsPos),
        k.area({ shape: new k.Rect(k.vec2(0, 0), 320, 37) }),
    ]);

    const btnLeft = container.add([k.text("<"), k.area(), k.pos(0, 0)]);
    const btnRight = container.add([
        k.text(">"),
        k.area(),
        k.pos(k.vec2(260, 0)),
    ]);

    const choicePos = k.vec2(40, 0);
    const choice = container.add([k.text(choices[index]), k.pos(choicePos)]);
    // TODO: center text

    btnLeft.onClick(() => {
        index = (index - 1 + choices.length) % choices.length;
        clicked = true;
    });
    btnRight.onClick(() => {
        index = (index + 1) % choices.length;
        clicked = true;
    });

    k.onUpdate(() => {
        choice.text = choices[index];
    });

    container.onClick(() => {
        if (opts.aliases) {
            onClick(opts.aliases[index]);
        } else {
            onClick(choice.text);
        }
    });

    return spinner;
}
