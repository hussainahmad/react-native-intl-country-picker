import React from 'react';
import { StyleProp, ViewStyle, TextInputProps } from 'react-native';
import { Country } from '../types';
export type PhoneInputValue = {
    country: Country;
    phoneNumber: string;
};
type PhoneInputProps = {
    /**
     * Current value (country + phone number).
     */
    value?: PhoneInputValue;
    /**
     * Called when country or phone number changes.
     */
    onChange?: (value: PhoneInputValue) => void;
    /**
     * Initial/default country code when uncontrolled (e.g. "PK", "US").
     * Used to derive default when `value` is not provided.
     */
    defaultCountryCode?: string;
    /**
     * Placeholder for the phone number input.
     */
    placeholder?: string;
    /**
     * Container style.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Props passed to the inner TextInput (except value, onChangeText, placeholder which are controlled above).
     */
    inputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder'>;
    /**
     * Label type for country picker modal (same as CountryPickerModal type).
     */
    countryLabelType?: 'ar' | 'en';
    /**
     * Called when validation result changes (e.g. for showing error state).
     * Uses google-libphonenumber for validation.
     */
    onValidationChange?: (isValid: boolean) => void;
};
export declare const PhoneInput: ({ value: controlledValue, onChange, defaultCountryCode, placeholder, style, inputProps, countryLabelType, onValidationChange, }: PhoneInputProps) => React.JSX.Element;
export {};
