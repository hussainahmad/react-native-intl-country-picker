# react-native-country-picker

RTL‑aware country picker for React Native with:
- Arabic‑normalized search in RTL mode
- English name and dialing‑code search
- Alphabet index for fast scrolling
- Written in TypeScript with React hooks

## Installation

Install from npm:

```bash
npm install react-native-country-picker
# or
yarn add react-native-country-picker
```

## Quick start

```tsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import {
  CountryPickerModal,
  type NormalizedCountry,
} from 'react-native-country-picker';

export const Example = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<NormalizedCountry | null>(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Button title="Select country" onPress={() => setVisible(true)} />

      {selected && (
        <Text style={{ marginTop: 12 }}>
          {selected.name} (+{selected.callingCode})
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

## Props

`CountryPickerModal`:
- **visible**: `boolean` – controls modal visibility
- **onClose**: `() => void` – called when the modal should close
- **onSelect**: `(country: NormalizedCountry) => void` – called with the selected country

`NormalizedCountry` shape:
- **cca2**: `string` – 2‑letter country code
- **name**: `string` – localized (Arabic/Urdu in RTL, English otherwise)
- **callingCode**: `string` – primary dialing code without leading `+`

## Development

This package is written in TypeScript. To build and lint locally:

```bash
npm run build
npm run lint
```

## License

MIT

