import type { Country } from '../types';
import { PhoneNumberUtil } from 'google-libphonenumber';


const phoneUtil = PhoneNumberUtil.getInstance();
/**
 * Validates a phone number for the given country using Google libphonenumber.
 * @param nationalNumber - Digits only (national number, no country code).
 * @param country - Country with cca2 and callingCode.
 * @returns true if the number is valid for that region.
 */
export function isValidPhoneNumber(
  nationalNumber: string,
  country: Country,
): boolean {
  if (!nationalNumber || !country?.cca2 || !country?.callingCode) {
    return false;
  }
  try {
    const full = `+${country.callingCode}${nationalNumber}`;
    const parsed = phoneUtil.parse(full, country.cca2);
    return phoneUtil.isValidNumber(parsed);
  } catch {
    return false;
  }
}

/**
 * Checks if the number is possible (length/format could be valid) without full validation.
 */
export function isPossiblePhoneNumber(
  nationalNumber: string,
  country: Country,
): boolean {
  if (!nationalNumber || !country?.cca2 || !country?.callingCode) {
    return false;
  }
  try {
    const full = `+${country.callingCode}${nationalNumber}`;
    const parsed = phoneUtil.parse(full, country.cca2);
    return phoneUtil.isPossibleNumber(parsed);
  } catch {
    return false;
  }
}
