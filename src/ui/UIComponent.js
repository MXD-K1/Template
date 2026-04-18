export function createUIComponent(k, components, opts = {}, parent = null) {
    let element;
    if (parent) {
        element = parent.add(components);
        if (parent.anchor === "center") {
            element.pos.x = -parent.width * 0.5;
            element.pos.y = -parent.height * 0.5;
            if (opts.pos) {
                element.pos.x += opts.pos.x ?? 0;
                element.pos.y += opts.pos.y ?? 0;
            }
        }
    } else {
        element = k.add(components);
        element.pos = opts.pos ?? k.vec2(0, 0);
    }

    return element;
}
