export let useWavedash = false;
export let WavedashJS = null;

export async function getWavedash() {
    const WavedashJSPlatform = await window.WavedashJS;
    if (WavedashJSPlatform) {
        useWavedash = true;
        WavedashJS = WavedashJSPlatform;
    }
}

export function updateLoadingProgress(progress) {
    if (useWavedash) {
        WavedashJS.updateLoadProgressZeroToOne(progress);
    }
}

export function initWavedash(k) {
    WavedashJS.init({ debug: k.debug });
}
