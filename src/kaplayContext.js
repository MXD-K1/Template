import kaplay from "kaplay";
import { screenWidth, screenHeight } from "./utils/constants.js";

const k = kaplay({
    canvas: document.getElementById("wavedash-target"),
    width: screenWidth,
    height: screenHeight,
    letterbox: true,
    global: false,
    debug: true,
    debugKey: "f2",
});

export default k;
