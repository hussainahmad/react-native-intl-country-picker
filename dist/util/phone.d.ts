/**
 * Normalizes Arabic-Indic and Eastern Arabic numerals to English (ASCII) digits.
 * Use when language is Arabic (or other RTL) so that numbers are handled consistently.
 */
export declare function normalizeToEnglishDigits(text: string): string;
/**
 * Extracts only digit characters from input, after normalizing Arabic numerals to English.
 */
export declare function digitsOnly(text: string): string;
