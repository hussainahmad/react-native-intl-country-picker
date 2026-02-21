import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, I18nManager, } from 'react-native';
import { CountryPickerModal } from './CountryPickerModal';
import { useNormalizedCountries } from '../hook/useCountries';
import { Countries } from '../data/countries';
import { flag } from '../utill/flag';
import { digitsOnly } from '../utill/phone';
import { isValidPhoneNumber } from '../utill/validatePhone';
const getDefaultCountry = (normalized, preferredCca2) => {
    var _a;
    const preferred = normalized.find(c => c.cca2 === preferredCca2);
    return (_a = preferred !== null && preferred !== void 0 ? preferred : normalized[0]) !== null && _a !== void 0 ? _a : {};
};
export const PhoneInput = ({ value: controlledValue, onChange, defaultCountryCode, placeholder = 'Phone number', style, inputProps, countryLabelType, onValidationChange, }) => {
    const isRTL = I18nManager.isRTL;
    const countryArray = useNormalizedCountries(Countries, isRTL, countryLabelType !== null && countryLabelType !== void 0 ? countryLabelType : 'en');
    const defaultNorm = useMemo(() => getDefaultCountry(countryArray, defaultCountryCode === null || defaultCountryCode === void 0 ? void 0 : defaultCountryCode.toUpperCase()), [countryArray, defaultCountryCode]);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [internalCountry, setInternalCountry] = useState(defaultNorm);
    const [internalNumber, setInternalNumber] = useState('');
    const isControlled = controlledValue !== undefined;
    const country = isControlled ? controlledValue.country : internalCountry;
    const phoneNumber = isControlled ? controlledValue.phoneNumber : internalNumber;
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
    return (<View style={[styles.container, style]}>
      <TouchableOpacity style={styles.countryTrigger} onPress={openPicker} accessibilityRole="button" accessibilityLabel={`Country code ${country.cca2}, +${country.callingCode}`}>
        <Text style={styles.flag}>{flag(country.cca2)}</Text>
        <Text style={styles.callingCode}>+{country.callingCode}</Text>
      </TouchableOpacity>
      <TextInput style={[styles.input, isRTL && styles.inputRTL]} value={phoneNumber} onChangeText={handleNumberChange} placeholder={placeholder} placeholderTextColor="#999" keyboardType="phone-pad" {...inputProps}/>
      <CountryPickerModal visible={pickerVisible} onClose={closePicker} onSelect={handleSelectCountry} type={countryLabelType}/>
    </View>);
};
const styles = StyleSheet.create({
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
