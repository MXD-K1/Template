import { COLORS } from "../utils/constants.js";
import { getFont } from "../utils/font.js";

export function createNotificationBar(k, text, icon = null, duration = 3) {
    // duration in seconds
    let bar = null;
    k.wait(1, () => {
        bar = k.add([
            k.rect(940, 50),
            k.color(COLORS.WHITE),
            k.anchor("center"),
            k.pos(k.width() / 2, k.height() - 40),
            k.fixed(),
        ]);

        const pos = k.vec2(-bar.width / 2 + 20, 0);
        if (icon) {
            bar.add([k.sprite(icon), k.pos(pos), k.anchor("left")]);
            pos.x += 40;
        }

        const textNotification = bar.add([
            k.text(text, getFont("notification")),
            k.pos(pos),
            k.anchor("left"),
            k.color(COLORS.BLACK),
        ]);

        bar.width = textNotification.width + 60;
        bar.pos = k.vec2(k.width() / 2, k.height() - 40);
        textNotification.pos = k.vec2(-bar.width / 2 + 20, -5);
    });

    k.wait(duration, () => {
        k.destroy(bar);
    });
}
