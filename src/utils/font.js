const FONTS = {
    button: { font: "sinko", size: 24 }, // numbers might need changing
    dialog: { size: 16, width: 500 },
    notification: { font: "sinko", size: 20 },
    label: { font: "sinko", size: 20 },
    // fill in the rest when needed
};

export function getFont(component) {
    return FONTS[component];
}
