// This file will be used as the entry point for wave dash

import k from "./src/kaplayContext.js";
import { run } from "./src/main.js";

if (typeof WaveDashJS !== "undefined") {
    WaveDashJS.load();
}

await run(k);
