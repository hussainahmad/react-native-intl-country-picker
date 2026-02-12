import { NormalizedCountry } from '../types';
export declare function useCountryFilter(countries: NormalizedCountry[], search: string, isRTL: boolean, type?: 'ar' | 'en'): {
    title: string;
    data: NormalizedCountry[];
}[];
