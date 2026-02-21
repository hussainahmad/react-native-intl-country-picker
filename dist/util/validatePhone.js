import { PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();
/**
 * Validates a phone number for the given country using Google libphonenumber.
 * @param nationalNumber - Digits only (national number, no country code).
 * @param country - Country with cca2 and callingCode.
 * @returns true if the number is valid for that region.
 */
export function isValidPhoneNumber(nationalNumber, country) {
    var _a;
    const code = (_a = country === null || country === void 0 ? void 0 : country.callingCode) === null || _a === void 0 ? void 0 : _a[0];
    if (!nationalNumber || !(country === null || country === void 0 ? void 0 : country.cca2) || !code) {
        return false;
    }
    try {
        const full = `+${code}${nationalNumber}`;
        const parsed = phoneUtil.parse(full, country.cca2);
        return phoneUtil.isValidNumber(parsed);
    }
    catch (_b) {
        return false;
    }
}
/**
 * Checks if the number is possible (length/format could be valid) without full validation.
 */
export function isPossiblePhoneNumber(nationalNumber, country) {
    var _a;
    const code = (_a = country === null || country === void 0 ? void 0 : country.callingCode) === null || _a === void 0 ? void 0 : _a[0];
    if (!nationalNumber || !(country === null || country === void 0 ? void 0 : country.cca2) || !code) {
        return false;
    }
    try {
        const full = `+${code}${nationalNumber}`;
        const parsed = phoneUtil.parse(full, country.cca2);
        return phoneUtil.isPossibleNumber(parsed);
    }
    catch (_b) {
        return false;
    }
}
