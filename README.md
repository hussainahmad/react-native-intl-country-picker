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

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| **value** | `PhoneInputValue \| undefined` | No | Controlled value `{ country, phoneNumber }`. |
| **onChange** | `(value: PhoneInputValue) => void` | No | Called when country or number changes. |
| **defaultCountryCode** | `string` | No | Initial country code (e.g. `"PK"`, `"US"`) when uncontrolled. |
| **placeholder** | `string` | No | Placeholder for the number field (default: `"Phone number"`). |
| **style** | `StyleProp<ViewStyle>` | No | Container style. |
| **inputProps** | `TextInputProps` | No | Props passed to the number `TextInput` (except value, onChangeText, placeholder). |
| **countryLabelType** | `'ar' \| 'en'` | No | Label type for the country picker modal. |
| **onValidationChange** | `(isValid: boolean) => void` | No | Called when validation result changes (uses google-libphonenumber). |

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

## Development

This package is written in TypeScript. To build and lint locally:

```bash
npm run build
npm run lint
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

