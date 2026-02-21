import React, { useState, useMemo, useEffect, forwardRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, I18nManager, } from 'react-native';
import { CountryPickerModal } from './CountryPickerModal';
import { useNormalizedCountries } from '../hook/useCountries';
import { Countries } from '../data/countries';
import { flag } from '../util/flag';
import { digitsOnly } from '../util/phone';
import { isValidPhoneNumber } from '../util/validatePhone';
const getDefaultCountry = (normalized, preferredCca2) => {
    var _a;
    const preferred = normalized.find(c => c.cca2 === preferredCca2);
    return (_a = preferred !== null && preferred !== void 0 ? preferred : normalized[0]) !== null && _a !== void 0 ? _a : {};
};
const defaultStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        minHeight: 48,
    },
    countryTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    flag: {
        fontSize: 20,
        marginEnd: 6,
    },
    callingCode: {
        fontSize: 16,
        fontWeight: '500',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    inputRTL: {
        textAlign: 'right',
    },
});
export const PhoneInput = forwardRef(function PhoneInput({ value: controlledValue, onChange, defaultCountryCode, placeholder = 'Phone number', placeholderTextColor = '#999', style, styles: stylesProp, countryTriggerStyle, flagStyle, callingCodeStyle, inputStyle, inputProps, countryLabelType, onValidationChange, renderCountryTrigger, }, ref) {
    var _a, _b;
    const isRTL = I18nManager.isRTL;
    const countryArray = useNormalizedCountries(Countries, isRTL, countryLabelType !== null && countryLabelType !== void 0 ? countryLabelType : 'en');
    const defaultNorm = useMemo(() => getDefaultCountry(countryArray, defaultCountryCode === null || defaultCountryCode === void 0 ? void 0 : defaultCountryCode.toUpperCase()), [countryArray, defaultCountryCode]);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [internalCountry, setInternalCountry] = useState(defaultNorm);
    const [internalNumber, setInternalNumber] = useState('');
    const isControlled = controlledValue !== undefined;
    const country = isControlled ? controlledValue.country : internalCountry;
    const phoneNumber = isControlled ? controlledValue.phoneNumber : internalNumber;
    const callingCodeStr = (_b = (_a = country.callingCode) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
    const handleSelectCountry = (c) => {
        setPickerVisible(false);
        if (isControlled && onChange) {
            onChange({ country: c, phoneNumber });
        }
        else {
            setInternalCountry(c);
            onChange === null || onChange === void 0 ? void 0 : onChange({ country: c, phoneNumber });
        }
    };
    const handleNumberChange = (text) => {
        const digits = digitsOnly(text);
        if (isControlled && onChange) {
            onChange({ country, phoneNumber: digits });
        }
        else {
            setInternalNumber(digits);
            onChange === null || onChange === void 0 ? void 0 : onChange({ country, phoneNumber: digits });
        }
    };
    useEffect(() => {
        onValidationChange === null || onValidationChange === void 0 ? void 0 : onValidationChange(isValidPhoneNumber(phoneNumber, country));
    }, [phoneNumber, country, onValidationChange]);
    const openPicker = () => setPickerVisible(true);
    const closePicker = () => setPickerVisible(false);
    return (<View style={[defaultStyles.container, style, stylesProp === null || stylesProp === void 0 ? void 0 : stylesProp.container]}>
      {renderCountryTrigger ? (renderCountryTrigger({
            country,
            onPress: openPicker,
            flagEmoji: flag(country.cca2),
            callingCode: `+${callingCodeStr}`,
        })) : (<TouchableOpacity style={[defaultStyles.countryTrigger, countryTriggerStyle, stylesProp === null || stylesProp === void 0 ? void 0 : stylesProp.countryTrigger]} onPress={openPicker} accessibilityRole="button" accessibilityLabel={`Country code ${country.cca2}, +${callingCodeStr}`}>
          <Text style={[defaultStyles.flag, flagStyle, stylesProp === null || stylesProp === void 0 ? void 0 : stylesProp.flag]}>{flag(country.cca2)}</Text>
          <Text style={[defaultStyles.callingCode, callingCodeStyle, stylesProp === null || stylesProp === void 0 ? void 0 : stylesProp.callingCode]}>+{callingCodeStr}</Text>
        </TouchableOpacity>)}
      <TextInput ref={ref} style={[defaultStyles.input, isRTL && defaultStyles.inputRTL, inputStyle, stylesProp === null || stylesProp === void 0 ? void 0 : stylesProp.input]} value={phoneNumber} onChangeText={handleNumberChange} placeholder={placeholder} placeholderTextColor={placeholderTextColor} keyboardType="phone-pad" {...inputProps}/>
      <CountryPickerModal visible={pickerVisible} onClose={closePicker} onSelect={handleSelectCountry} type={countryLabelType}/>
    </View>);
});
