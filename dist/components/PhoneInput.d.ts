import React from 'react';
import { TextInput, StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import { Country, CountryCode } from '../types';
export type PhoneInputValue = {
    country: Country;
    phoneNumber: string;
};
export type PhoneInputStyles = {
    container?: StyleProp<ViewStyle>;
    countryTrigger?: StyleProp<ViewStyle>;
    flag?: StyleProp<TextStyle>;
    callingCode?: StyleProp<TextStyle>;
    input?: StyleProp<TextStyle>;
};
export type RenderCountryTriggerParams = {
    country: Country;
    onPress: () => void;
    flagEmoji: string;
    callingCode: string;
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
    defaultCountryCode?: CountryCode;
    /**
     * Placeholder for the phone number input.
     */
    placeholder?: string;
    /**
     * Placeholder text color for the number input.
     */
    placeholderTextColor?: string;
    /**
     * Container style (same as styles.container when using styles prop).
     */
    style?: StyleProp<ViewStyle>;
    /**
     * All styles in one object for full customization. Overrides style, containerStyle, etc. when both are provided.
     */
    styles?: PhoneInputStyles;
    /**
     * @deprecated Use styles.container or style instead.
     * Container style (alias for style).
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Country trigger (flag + code) container style.
     */
    countryTriggerStyle?: StyleProp<ViewStyle>;
    /**
     * Flag emoji text style.
     */
    flagStyle?: StyleProp<TextStyle>;
    /**
     * Calling code (+1, +44, etc.) text style.
     */
    callingCodeStyle?: StyleProp<TextStyle>;
    /**
     * Phone number TextInput style.
     */
    inputStyle?: StyleProp<TextStyle>;
    /**
     * Props passed to the inner TextInput (except value, onChangeText, placeholder, ref which are controlled).
     * Use ref via forwardRef on PhoneInput to focus the input (e.g. for returnKeyType="next" and onSubmitEditing).
     */
    inputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'ref'>;
    /**
     * Label type for country picker modal (same as CountryPickerModal type).
     */
    countryLabelType?: 'ar' | 'en';
    /**
     * Called when validation result changes (e.g. for showing error state).
     * Uses google-libphonenumber for validation.
     */
    onValidationChange?: (isValid: boolean) => void;
    /**
     * Custom render for the country trigger (flag + code button). When provided, countryTriggerStyle, flagStyle, callingCodeStyle are ignored for that part.
     */
    renderCountryTrigger?: (params: RenderCountryTriggerParams) => React.ReactNode;
};
export declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<TextInput>>;
export {};
