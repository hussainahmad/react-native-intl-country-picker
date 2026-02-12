import React, { useRef, useState } from 'react';
import { Modal, View, SectionList, I18nManager, StyleSheet, Text } from 'react-native';
import { CountryRow } from './CountryRow';
import { useNormalizedCountries } from '../hook/useCountries';
import { useCountryFilter } from '../hook/useCountryFilter';
import { Countries } from '../data/countries';
import { Searchbar } from './Searchbar';
export const CountryPickerModal = ({ visible, onClose, onSelect, type, searchPlaceholder, title, titleStyle, headerComponent, rowStyle, searchValue, onSearchChange, renderRow, renderSectionHeader, }) => {
    const isRTL = I18nManager.isRTL;
    const listRef = useRef(null);
    const [internalSearch, setInternalSearch] = useState('');
    const search = searchValue !== null && searchValue !== void 0 ? searchValue : internalSearch;
    const handleSearchChange = (value) => {
        if (onSearchChange) {
            onSearchChange(value);
        }
        else {
            setInternalSearch(value);
        }
    };
    const countryArray = useNormalizedCountries(Countries, isRTL, type);
    const sections = useCountryFilter(countryArray, search, isRTL, type);
    return (<Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {headerComponent !== null && headerComponent !== void 0 ? headerComponent : (title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null)}
        <Searchbar search={search} setSearch={handleSearchChange} placeholder={searchPlaceholder}/>
        <SectionList ref={listRef} sections={sections} keyExtractor={item => `${item.cca2}-${item.callingCode}`} renderItem={({ item }) => renderRow ? (renderRow({ item, onSelect, onClose })) : (<CountryRow country={item} onClose={onClose} onSelect={onSelect} type={type} contentContainerStyle={rowStyle}/>)} renderSectionHeader={({ section }) => renderSectionHeader ? (renderSectionHeader(section.title)) : (<Text style={styles.sectionHeader}>{section.title}</Text>)}/>
      </View>
    </Modal>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '500',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
});
