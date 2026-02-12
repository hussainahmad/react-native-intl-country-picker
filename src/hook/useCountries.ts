import { useMemo } from 'react';
import { CountriesMap, Country, NormalizedCountry } from '../types';

export function useNormalizedCountries(
  countries: CountriesMap,
  isRTL: boolean,
  type?: 'ar' | 'en',
): NormalizedCountry[] {
  return useMemo(() => {
    return Object.entries(countries ?? {}).map(([cca2, country]) => {
      const c = country as Country;

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
        cca2,
        callingCode: Array.isArray(c.callingCode) ? c.callingCode[0] ?? '' : '',
        name: displayName,
        englishName: c.name?.common ?? '',
        rawName: c.name ?? {},
      };
    });
  }, [countries, isRTL, type]);
}
