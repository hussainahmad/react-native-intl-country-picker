import { Country } from '../types';
export declare function useCountryFilter(countries: Country[], search: string, isRTL: boolean, type?: 'ar' | 'en'): {
    title: string;
    data: Country[];
}[];
