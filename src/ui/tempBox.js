import { COLORS } from "../utils/constants.js";

export function createBox(k, title, info, opts) {
    const scaleFactor = 3;
    const width = (opts.width ?? 800) / scaleFactor;
    const height = (opts.height ?? 150) / scaleFactor;
    const pos = opts.pos ?? k.vec2(0, 0);
    const duration = opts.duration ?? 3;

    let box;
    k.wait(1, () => {
        box = k.add([
            k.sprite("box"),
            k.pos(pos),
            k.fixed(),
            k.scale(scaleFactor),
        ]);

        box.width = width;
        box.height = height;

        const titleMargin = k.vec2(10, 10);
        const infoMargin = k.vec2(10, 20);
        box.add(
            [
                k.text(title, { size: 28 }),
                k.pos(titleMargin),
                k.scale(1 / scaleFactor),
            ],
            k.color(COLORS.BLACK),
        );

        box.add(
            [
                k.text(info, { size: 28, width: 780 }),
                k.pos(infoMargin),
                k.scale(1 / scaleFactor),
            ],
            k.color(COLORS.BLACK),
        );

        opts.centerx = opts.centerx ?? false;
        if (opts.centerx) {
            box.pos = k.vec2(220, 0);
            // box.pos.x = k.width() / 2 - box.width / 2;
        }
    });

    k.wait(duration, () => {
        box.destroy();
    });
}
