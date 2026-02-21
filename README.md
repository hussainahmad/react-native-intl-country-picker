# react-native-intl-country-picker

RTL‑aware country picker for React Native with:
- Arabic‑normalized search in RTL mode
- English name and dialing‑code search
- Alphabet index for fast scrolling
- **Phone input** – country code selector + number field in one component
- Written in TypeScript with React hooks

## Installation

Install from npm:

```bash
npm install react-native-intl-country-picker
# or
yarn add react-native-intl-country-picker
```

## Quick start

### Country picker only

```tsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import {
  CountryPickerModal,
  type Country,
} from 'react-native-intl-country-picker';

export const CountryPickerExample = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Country | null>(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Button title="Select country" onPress={() => setVisible(true)} />

      {selected && (
        <Text style={{ marginTop: 12 }}>
          {selected.name} (+{selected.callingCode[0]})
        </Text>
      )}

      <CountryPickerModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={country => {
          setSelected(country);
          setVisible(false);
        }}
      />
    </View>
  );
};
```

### Phone input screen

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  PhoneInput,
  type PhoneInputValue,
} from 'react-native-intl-country-picker';

export const PhoneInputScreen = () => {
  const [phone, setPhone] = useState<PhoneInputValue | null>(null);

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Phone number</Text>
      <PhoneInput
        value={phone ?? undefined}
        onChange={setPhone}
        placeholder="Enter your number"
        style={styles.input}
      />
      {phone && (
        <Text style={styles.result}>
          +{phone.country.callingCode[0]} {phone.phoneNumber}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '500' },
  input: { marginBottom: 16 },
  result: { marginTop: 12, fontSize: 14, color: '#666' },
});
```

### Phone validation: isValidPhoneNumber and onValidationChange

Validation uses **google-libphonenumber**. You can:

1. **Use `onValidationChange`** on `PhoneInput` to react whenever the number becomes valid or invalid (e.g. show an error message or enable/disable submit).

2. **Use the exported `isValidPhoneNumber`** to validate a number yourself (e.g. before submit or when you have a `PhoneInputValue` from elsewhere).

**Example: `onValidationChange` with error state**

```tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  PhoneInput,
  type PhoneInputValue,
} from 'react-native-intl-country-picker';

export const PhoneInputWithValidation = () => {
  const [phone, setPhone] = useState<PhoneInputValue | undefined>();
  const [isValid, setIsValid] = useState(false);

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Phone number</Text>
      <PhoneInput
        value={phone}
        onChange={setPhone}
        onValidationChange={setIsValid}
        placeholder="Enter your number"
        style={[styles.input, !isValid && phone?.phoneNumber ? styles.inputError : null]}
      />
      {phone?.phoneNumber && !isValid && (
        <Text style={styles.errorText}>Please enter a valid phone number</Text>
      )}
      <Button title="Continue" disabled={!isValid} onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '500' },
  input: { marginBottom: 8 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 16 },
});
```

**Example: using `isValidPhoneNumber` yourself**

```tsx
import {
  PhoneInput,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
  type PhoneInputValue,
} from 'react-native-intl-country-picker';

// Validate when you have a PhoneInputValue (e.g. on form submit)
function handleSubmit(value: PhoneInputValue) {
  if (!isValidPhoneNumber(value.phoneNumber, value.country)) {
    alert('Invalid phone number');
    return;
  }
  // proceed with value.country and value.phoneNumber
}

// Or validate raw national number + country
const valid = isValidPhoneNumber('3015551234', country);       // full validation
const possible = isPossiblePhoneNumber('301555', country);    // length/format check only
```

- **`isValidPhoneNumber(nationalNumber, country)`** – returns `true` if the number is valid for that country (google-libphonenumber).
- **`isPossiblePhoneNumber(nationalNumber, country)`** – returns `true` if the number could be valid (length/format), without full validation.

## Props

### CountryPickerModal

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| **visible** | `boolean` | Yes | Controls modal visibility. |
| **onClose** | `() => void` | Yes | Called when the modal should close (e.g. when user taps the close button or you call it after selection). |
| **onSelect** | `(country: Country) => void` | Yes | Called with the selected country when user picks one. |
| **type** | `'ar' \| 'en'` | No | Label type: `'en'` = always English name; `'ar'` or undefined = Arabic when RTL, otherwise English. |
| **searchPlaceholder** | `string` | No | Placeholder for the search input (defaults by RTL/locale if not set). |
| **title** | `string` | No | Title text at the top of the modal. |
| **titleStyle** | `StyleProp<TextStyle>` | No | Style override for the title text. |
| **headerComponent** | `React.ReactNode` | No | Custom header component; if set, it replaces the default title. |
| **rowStyle** | `StyleProp<ViewStyle>` | No | Style override for each country row container. |
| **searchValue** | `string` | No | Controlled search value (use with `onSearchChange`). |
| **onSearchChange** | `(value: string) => void` | No | Called when search text changes (for controlled search). |
| **renderRow** | `(params: { item: Country; onSelect; onClose }) => React.ReactElement \| null` | No | Custom row renderer; replaces the default row. |
| **renderSectionHeader** | `(title: string) => React.ReactElement \| null` | No | Custom section header renderer. |
| **stickySectionHeadersEnabled** | `boolean` | No | Whether section headers are sticky (default: `false`). |
| **showCloseButton** | `boolean` | No | Whether to show the close (×) button in the header so user can dismiss without selecting (default: `true`). |
| **closeButtonStyle** | `StyleProp<ViewStyle>` | No | Style override for the close button container. |
| **closeButtonTextStyle** | `StyleProp<TextStyle>` | No | Style override for the close button "×" icon. |

### PhoneInput

`PhoneInput` supports **forwardRef**: pass a ref to focus the inner number input (e.g. when the user presses "Next" on the keyboard to move to the next field).

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| **value** | `PhoneInputValue \| undefined` | No | Controlled value `{ country, phoneNumber }`. |
| **onChange** | `(value: PhoneInputValue) => void` | No | Called when country or number changes. |
| **defaultCountryCode** | `string` | No | Initial country code (e.g. `"PK"`, `"US"`) when uncontrolled. |
| **placeholder** | `string` | No | Placeholder for the number field (default: `"Phone number"`). |
| **placeholderTextColor** | `string` | No | Placeholder text color (default: `"#999"`). |
| **style** | `StyleProp<ViewStyle>` | No | Container style. |
| **styles** | `PhoneInputStyles` | No | Full style overrides: `container`, `countryTrigger`, `flag`, `callingCode`, `input`. |
| **containerStyle** | `StyleProp<ViewStyle>` | No | Alias for container style. |
| **countryTriggerStyle** | `StyleProp<ViewStyle>` | No | Style for the country (flag + code) trigger. |
| **flagStyle** | `StyleProp<TextStyle>` | No | Style for the flag emoji. |
| **callingCodeStyle** | `StyleProp<TextStyle>` | No | Style for the "+1" / "+44" text. |
| **inputStyle** | `StyleProp<TextStyle>` | No | Style for the number `TextInput`. |
| **inputProps** | `TextInputProps` | No | Props passed to the number `TextInput` (except value, onChangeText, placeholder, ref). Use for `returnKeyType`, `onSubmitEditing`, etc. |
| **countryLabelType** | `'ar' \| 'en'` | No | Label type for the country picker modal. |
| **onValidationChange** | `(isValid: boolean) => void` | No | Called whenever the phone number validity changes. See [Phone validation](#phone-validation-isvalidphonenumber-and-onvalidationchange) below. |
| **renderCountryTrigger** | `(params: RenderCountryTriggerParams) => ReactNode` | No | Custom render for the country trigger (replaces default flag + code button). |

**Focus next input (forwardRef):** Pass a ref and use `inputProps={{ returnKeyType: 'next', onSubmitEditing: () => nextInputRef.current?.focus() }}` so that when the user taps "Next", the next field is focused.

### Types

**Country**

- **cca2**: `CountryCode` – 2-letter country code
- **name**: `string` – display name (localized by RTL/type)
- **callingCode**: `string[]` – dialing code(s), e.g. `["1"]`, `["44"]`
- **englishName**: `string` – English name
- **currency**: `string[]` – currency code(s)

**PhoneInputValue**

- **country**: `Country` – selected country
- **phoneNumber**: `string` – digits only (no country code)

**PhoneInputStyles** (for `styles` prop)

- **container**, **countryTrigger**, **flag**, **callingCode**, **input** – optional style overrides

**RenderCountryTriggerParams** (for `renderCountryTrigger`)

- **country**, **onPress**, **flagEmoji**, **callingCode** – use to build a custom country selector

## Development

This package is written in TypeScript. To build, lint, and test locally:

```bash
npm run build
npm run lint
npm test
```

### Versioning and release

The project uses [semantic versioning](https://semver.org/). See [VERSIONING.md](./VERSIONING.md) for how to bump and release.

```bash
npm run version:patch   # 1.0.0 → 1.0.1 (bug fixes)
npm run version:minor   # 1.0.0 → 1.1.0 (new features)
npm run version:major   # 1.0.0 → 2.0.0 (breaking changes)
```

## License

MIT

