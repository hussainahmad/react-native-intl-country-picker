import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Country } from '../types';
type Props = {
    visible: boolean;
    onClose: () => void;
    onSelect: (item: Country) => void;
    /**
     * Controls which label to show for the country name.
     * - 'en'  -> always show englishName (even when app is RTL)
     * - 'ar' or undefined -> default: show Arabic when RTL, otherwise englishName
     */
    type?: 'ar' | 'en';
    /**
     * Custom placeholder for the search input.
     * Defaults to Arabic/English based on RTL if not provided.
     */
    searchPlaceholder?: string;
    /**
     * Optional title text shown at the top of the modal.
     */
    title?: string;
    /**
     * Style override for the default title text.
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * Fully custom header component rendered above the search bar.
     * If provided, it replaces the default title.
     */
    headerComponent?: React.ReactNode;
    /**
     * Style override for each country row container.
     */
    rowStyle?: StyleProp<ViewStyle>;
    /**
     * Optional controlled search value. If provided together with onSearchChange,
     * the searchbar becomes a controlled input.
     */
    searchValue?: string;
    /**
     * Change handler for controlled search mode.
     */
    onSearchChange?: (value: string) => void;
    /**
     * Custom row renderer. When provided, it completely replaces the default row.
     */
    renderRow?: (params: {
        item: Country;
        onSelect: (item: Country) => void;
        onClose: () => void;
    }) => React.ReactElement | null;
    /**
     * Custom section header renderer. When provided, it replaces the default title text.
     */
    renderSectionHeader?: (title: string) => React.ReactElement | null;
    /**
     * Whether to enable sticky section headers.
     */
    stickySectionHeadersEnabled?: boolean;
    /**
     * Whether to show the close (cross) button in the header.
     * When true, user can dismiss the picker without selecting a country.
     * Default: true.
     */
    showCloseButton?: boolean;
    /**
     * Style override for the close button container.
     */
    closeButtonStyle?: StyleProp<ViewStyle>;
    /**
     * Style override for the close button text (the "×" icon).
     */
    closeButtonTextStyle?: StyleProp<TextStyle>;
};
export declare const CountryPickerModal: ({ visible, onClose, onSelect, type, searchPlaceholder, title, titleStyle, headerComponent, rowStyle, searchValue, stickySectionHeadersEnabled, onSearchChange, renderRow, renderSectionHeader, showCloseButton, closeButtonStyle, closeButtonTextStyle, }: Props) => React.JSX.Element;
export {};
