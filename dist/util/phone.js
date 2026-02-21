/**
 * Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) and Eastern Arabic (۰۱۲۳۴۵۶۷۸۹)
 * mapped to ASCII 0-9 so input is always treated as English digits.
 */
const ARABIC_INDIC = /[٠-٩]/g;
const EASTERN_ARABIC = /[۰-۹]/g;
const ARABIC_INDIC_MAP = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
};
const EASTERN_ARABIC_MAP = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
};
/**
 * Normalizes Arabic-Indic and Eastern Arabic numerals to English (ASCII) digits.
 * Use when language is Arabic (or other RTL) so that numbers are handled consistently.
 */
export function normalizeToEnglishDigits(text) {
    return text
        .replace(ARABIC_INDIC, (c) => { var _a; return (_a = ARABIC_INDIC_MAP[c]) !== null && _a !== void 0 ? _a : c; })
        .replace(EASTERN_ARABIC, (c) => { var _a; return (_a = EASTERN_ARABIC_MAP[c]) !== null && _a !== void 0 ? _a : c; });
}
/**
 * Extracts only digit characters from input, after normalizing Arabic numerals to English.
 */
export function digitsOnly(text) {
    return normalizeToEnglishDigits(text).replace(/\D/g, '');
}
