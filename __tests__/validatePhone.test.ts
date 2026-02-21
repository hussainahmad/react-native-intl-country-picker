import { isValidPhoneNumber, isPossiblePhoneNumber } from '../src/util/validatePhone';
import type { Country } from '../src/types';

const usCountry: Country = {
  cca2: 'US',
  name: 'United States',
  englishName: 'United States',
  callingCode: ['1'],
  currency: ['USD'],
};

const pkCountry: Country = {
  cca2: 'PK',
  name: 'Pakistan',
  englishName: 'Pakistan',
  callingCode: ['92'],
  currency: ['PKR'],
};

const gbCountry: Country = {
  cca2: 'GB',
  name: 'United Kingdom',
  englishName: 'United Kingdom',
  callingCode: ['44'],
  currency: ['GBP'],
};

describe('isValidPhoneNumber', () => {
  it('returns false for empty national number', () => {
    expect(isValidPhoneNumber('', usCountry)).toBe(false);
  });

  it('returns false for invalid US number', () => {
    expect(isValidPhoneNumber('123', usCountry)).toBe(false);
    expect(isValidPhoneNumber('12345', usCountry)).toBe(false);
  });

  it('returns true for valid US number', () => {
    expect(isValidPhoneNumber('3015551234', usCountry)).toBe(true);
    expect(isValidPhoneNumber('2025551234', usCountry)).toBe(true);
  });

  it('returns true for valid PK number', () => {
    expect(isValidPhoneNumber('3001234567', pkCountry)).toBe(true);
  });

  it('returns true for valid GB number', () => {
    expect(isValidPhoneNumber('7911123456', gbCountry)).toBe(true);
  });

  it('returns false when country has no calling code', () => {
    const noCode: Country = { ...usCountry, callingCode: [] };
    expect(isValidPhoneNumber('3015551234', noCode)).toBe(false);
  });
});

describe('isPossiblePhoneNumber', () => {
  it('returns false for empty national number', () => {
    expect(isPossiblePhoneNumber('', usCountry)).toBe(false);
  });

  it('returns true for valid-length US number', () => {
    expect(isPossiblePhoneNumber('3015551234', usCountry)).toBe(true);
  });

  it('returns false for too-short number', () => {
    expect(isPossiblePhoneNumber('12', usCountry)).toBe(false);
  });
});
