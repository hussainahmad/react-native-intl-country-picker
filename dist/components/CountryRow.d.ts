import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NormalizedCountry } from '../types';
type CountryRowProps = {
    country: NormalizedCountry;
    onClose: () => void;
    onSelect: (item: NormalizedCountry) => void;
    contentContainerStyle?: StyleProp<ViewStyle>;
    /**
     * Controls which label to show for the country name.
     * - 'en'  -> always show englishName (even when app is RTL)
     * - 'ar' or undefined -> default: show Arabic when RTL, otherwise englishName
     */
    type?: 'ar' | 'en';
};
export declare const CountryRow: React.MemoExoticComponent<({ country, contentContainerStyle, onClose, onSelect, type }: CountryRowProps) => React.JSX.Element | null>;
export {};
