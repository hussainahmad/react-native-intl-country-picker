import React from 'react';
import { Text, StyleSheet, I18nManager, TouchableOpacity } from 'react-native';
import { flag } from '../utill/flag';
const CountryRowComponent = ({ country, contentContainerStyle, onClose, onSelect, type }) => {
    const isRTL = I18nManager.isRTL;
    const displayName = type === 'en' ? country.englishName : isRTL ? country.name : country.englishName;
    if (country.callingCode.length === 0)
        return null;
    else
        return (<TouchableOpacity style={[styles.row, contentContainerStyle && contentContainerStyle]} onPress={() => {
                onSelect(country);
                onClose();
            }} accessibilityRole="button" accessibilityLabel={`${displayName} +${country.callingCode}`}>
        <Text style={styles.flag}>{flag(country.cca2)}</Text>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.callingCode}>{`+${country.callingCode}`}</Text>
      </TouchableOpacity>);
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
