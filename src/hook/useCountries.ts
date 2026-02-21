import { useMemo } from 'react';
import { CountriesMap, RawCountryData, Country, CountryCode } from '../types';

export function useNormalizedCountries(
  countries: CountriesMap,
  isRTL: boolean,
  type?: 'ar' | 'en',
): Country[] {
  return useMemo(() => {
    return Object.entries(countries ?? {}).map(([cca2, country]) => {
      const c = country as RawCountryData;

      let displayName: string;

      if (type === 'en') {
        // Always use English common name
        displayName = c.name?.common ?? '';
      } else if (isRTL) {
        // RTL and not forced to English: prefer Arabic name when available
        displayName = c.name?.ara ?? c.name?.common ?? '';
      } else {
        // LTR default: English common name
        displayName = c.name?.common ?? '';
      }

      return {
        cca2: cca2 as CountryCode,
        callingCode: c.callingCode,
        name: displayName,
        englishName: c.name?.common ?? '',
        currency: c.currency,
      };
    });
  }, [countries, isRTL, type]);
}
