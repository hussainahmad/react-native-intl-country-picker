import { useMemo } from 'react';
import { NormalizedCountry } from '../types';
import { normalizeArabic } from '../utill/arabic';

export function useCountryFilter(countries: NormalizedCountry[], search: string, isRTL: boolean, type?: 'ar' | 'en') {
  return useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = countries.filter(c => {
      // When type is 'en', search should be done on englishName even in RTL.
      if (type === 'en') {
        return c.englishName.toLowerCase().includes(q);
      }

      if (isRTL) {
        return normalizeArabic(c.name).includes(normalizeArabic(q));
      }

      return c.name.toLowerCase().includes(q);
    });

    const map: Record<string, NormalizedCountry[]> = {};

    filtered.forEach(c => {
      // Use the same display logic as the UI
      const displayName = type === 'en' ? c.englishName : isRTL ? c.name : c.englishName;

      const key = displayName[0];

      if (!map[key]) map[key] = [];
      map[key].push(c);
    });

    return Object.keys(map)
      .sort()
      .map(key => ({
        title: key,
        data: map[key],
      }));
  }, [countries, search, isRTL, type]);
}
