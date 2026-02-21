import React, { useState, useMemo, useEffect, forwardRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  I18nManager,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { CountryPickerModal } from './CountryPickerModal';
import { useNormalizedCountries } from '../hook/useCountries';
import { Countries } from '../data/countries';
import { Country, CountryCode } from '../types';
import { flag } from '../util/flag';
import { digitsOnly } from '../util/phone';
import { isValidPhoneNumber } from '../util/validatePhone';

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

const getDefaultCountry = (
  normalized: Country[],
  preferredCca2?: string,
): Country => {
  const preferred = normalized.find(c => c.cca2 === preferredCca2);
  return preferred ?? normalized[0] ?? ({} as Country);
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

export const PhoneInput = forwardRef<TextInput, PhoneInputProps>(function PhoneInput(
  {
    value: controlledValue,
    onChange,
    defaultCountryCode,
    placeholder = 'Phone number',
    placeholderTextColor = '#999',
    style,
    styles: stylesProp,
    countryTriggerStyle,
    flagStyle,
    callingCodeStyle,
    inputStyle,
    inputProps,
    countryLabelType,
    onValidationChange,
    renderCountryTrigger,
  },
  ref,
) {
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
  const callingCodeStr = country.callingCode?.[0] ?? '';

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
    <View style={[defaultStyles.container, style, stylesProp?.container]}>
      {renderCountryTrigger ? (
        renderCountryTrigger({
          country,
          onPress: openPicker,
          flagEmoji: flag(country.cca2),
          callingCode: `+${callingCodeStr}`,
        })
      ) : (
        <TouchableOpacity
          style={[defaultStyles.countryTrigger, countryTriggerStyle, stylesProp?.countryTrigger]}
          onPress={openPicker}
          accessibilityRole="button"
          accessibilityLabel={`Country code ${country.cca2}, +${callingCodeStr}`}
        >
          <Text style={[defaultStyles.flag, flagStyle, stylesProp?.flag]}>{flag(country.cca2)}</Text>
          <Text style={[defaultStyles.callingCode, callingCodeStyle, stylesProp?.callingCode]}>+{callingCodeStr}</Text>
        </TouchableOpacity>
      )}
      <TextInput
        ref={ref}
        style={[defaultStyles.input, isRTL && defaultStyles.inputRTL, inputStyle, stylesProp?.input]}
        value={phoneNumber}
        onChangeText={handleNumberChange}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
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
});
