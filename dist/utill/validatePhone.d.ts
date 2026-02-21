import type { Country } from '../types';
/**
 * Validates a phone number for the given country using Google libphonenumber.
 * @param nationalNumber - Digits only (national number, no country code).
 * @param country - Country with cca2 and callingCode.
 * @returns true if the number is valid for that region.
 */
export declare function isValidPhoneNumber(nationalNumber: string, country: Country): boolean;
/**
 * Checks if the number is possible (length/format could be valid) without full validation.
 */
export declare function isPossiblePhoneNumber(nationalNumber: string, country: Country): boolean;
