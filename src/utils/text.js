import arabic_reshaper from "arabic-persian-reshaper";
import bidiFactory from "bidi-js";

const ArabicShaper = arabic_reshaper.ArabicShaper;
const bidi = bidiFactory();

export function formatArabicText(text) {
    const embeddingLevel = bidi.getEmbeddingLevels(text, "rtl");
    return bidi.getReorderedString(
        ArabicShaper.convertArabic(text),
        embeddingLevel,
    );
}

export function formatText(text, lang) {
    if (lang === "ar") {
        return formatArabicText(text);
    } else {
        return text;
    }
}
