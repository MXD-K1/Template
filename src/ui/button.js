export function createButton(k, label, y, onPress) {
    const button = k.add([
        k.rect(220, 52),
        k.anchor("center"),
        k.pos(k.width() / 2, y),
        k.area(),
        k.outline(2),
        k.color(255, 255, 255),
    ]);

    button.add([
        k.text(label, { size: 24, font: "sinko" }),
        k.anchor("center"),
        k.pos(0, 0),
        k.color(0, 0, 0),
    ]);

    button.onClick(onPress);
    return button;
}
