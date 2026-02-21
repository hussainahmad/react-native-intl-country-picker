import React from 'react';
import { Text, StyleSheet, I18nManager, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Country } from '../types';
import { flag } from '../util/flag';

type CountryRowProps = {
  country: Country;
  onClose: () => void;
  onSelect: (item: Country) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Controls which label to show for the country name.
   * - 'en'  -> always show englishName (even when app is RTL)
   * - 'ar' or undefined -> default: show Arabic when RTL, otherwise englishName
   */
  type?: 'ar' | 'en';
};

const CountryRowComponent = ({ country, contentContainerStyle, onClose, onSelect, type }: CountryRowProps) => {
  const isRTL = I18nManager.isRTL;

  const displayName = type === 'en' ? country.englishName : isRTL ? country.name : country.englishName;

  if (country.callingCode.length === 0) return null;
  else
    return (
      <TouchableOpacity
        style={[styles.row, contentContainerStyle && contentContainerStyle]}
        onPress={() => {
          onSelect(country);
          onClose();
        }}
        accessibilityRole="button"
        accessibilityLabel={`${displayName} +${country.callingCode[0]}`}
      >
        <Text style={styles.flag}>{flag(country.cca2)}</Text>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.callingCode}>{`+${country.callingCode[0]}`}</Text>
      </TouchableOpacity>
    );
};

export const CountryRow = React.memo(CountryRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 12,
    marginVertical: 6,
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  flag: {
    fontSize: 22,
    // marginHorizontal: 8,
  },
  name: {
    fontSize: 16,
    marginStart: 12,
    fontWeight: '400',
    // Avoid clipping and keep vertical centering
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  callingCode: {
    marginStart: 'auto',
    marginEnd: 16,
    fontSize: 14,
  },
});
