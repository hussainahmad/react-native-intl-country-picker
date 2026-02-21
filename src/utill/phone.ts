/**
 * Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) and Eastern Arabic (۰۱۲۳۴۵۶۷۸۹)
 * mapped to ASCII 0-9 so input is always treated as English digits.
 */
const ARABIC_INDIC = /[٠-٩]/g;
const EASTERN_ARABIC = /[۰-۹]/g;

const ARABIC_INDIC_MAP: Record<string, string> = {
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

const EASTERN_ARABIC_MAP: Record<string, string> = {
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
export function normalizeToEnglishDigits(text: string): string {
  return text
    .replace(ARABIC_INDIC, (c) => ARABIC_INDIC_MAP[c] ?? c)
    .replace(EASTERN_ARABIC, (c) => EASTERN_ARABIC_MAP[c] ?? c);
}

/**
 * Extracts only digit characters from input, after normalizing Arabic numerals to English.
 */
export function digitsOnly(text: string): string {
  return normalizeToEnglishDigits(text).replace(/\D/g, '');
}
