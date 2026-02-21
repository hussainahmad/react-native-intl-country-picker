import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  I18nManager,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { CountryPickerModal } from './CountryPickerModal';
import { useNormalizedCountries } from '../hook/useCountries';
import { Countries } from '../data/countries';
import { Country } from '../types';
import { flag } from '../utill/flag';
import { digitsOnly } from '../utill/phone';
import { isValidPhoneNumber } from '../utill/validatePhone';

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

const getDefaultCountry = (
  normalized: Country[],
  preferredCca2?: string,
): Country => {
  const preferred = normalized.find(c => c.cca2 === preferredCca2);
  return preferred ?? normalized[0] ?? ({} as Country);
};

export const PhoneInput = ({
  value: controlledValue,
  onChange,
  defaultCountryCode,
  placeholder = 'Phone number',
  style,
  inputProps,
  countryLabelType,
  onValidationChange,
}: PhoneInputProps) => {
  const isRTL = I18nManager.isRTL;
  const countryArray = useNormalizedCountries(Countries, isRTL, countryLabelType ?? 'en');
  const defaultNorm = useMemo(
    () => getDefaultCountry(countryArray, defaultCountryCode?.toUpperCase()),
    [countryArray, defaultCountryCode],
  );

  const [pickerVisible, setPickerVisible] = useState(false);
  const [internalCountry, setInternalCountry] = useState<Country>(defaultNorm);
  const [internalNumber, setInternalNumber] = useState('');

  const isControlled = controlledValue !== undefined;
  const country = isControlled ? controlledValue.country : internalCountry;
  const phoneNumber = isControlled ? controlledValue.phoneNumber : internalNumber;

  const handleSelectCountry = (c: Country) => {
    setPickerVisible(false);
    if (isControlled && onChange) {
      onChange({ country: c, phoneNumber });
    } else {
      setInternalCountry(c);
      onChange?.({ country: c, phoneNumber });
    }
  };

  const handleNumberChange = (text: string) => {
    const digits = digitsOnly(text);
    if (isControlled && onChange) {
      onChange({ country, phoneNumber: digits });
    } else {
      setInternalNumber(digits);
      onChange?.({ country, phoneNumber: digits });
    }
  };

  useEffect(() => {
    onValidationChange?.(isValidPhoneNumber(phoneNumber, country));
  }, [phoneNumber, country, onValidationChange]);

  const openPicker = () => setPickerVisible(true);
  const closePicker = () => setPickerVisible(false);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.countryTrigger}
        onPress={openPicker}
        accessibilityRole="button"
        accessibilityLabel={`Country code ${country.cca2}, +${country.callingCode}`}
      >
        <Text style={styles.flag}>{flag(country.cca2)}</Text>
        <Text style={styles.callingCode}>+{country.callingCode}</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, isRTL && styles.inputRTL]}
        value={phoneNumber}
        onChangeText={handleNumberChange}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        {...inputProps}
      />
      <CountryPickerModal
        visible={pickerVisible}
        onClose={closePicker}
        onSelect={handleSelectCountry}
        type={countryLabelType}
      />
    </View>
  );
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
