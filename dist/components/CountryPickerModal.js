import React, { useRef, useState } from 'react';
import { Modal, View, SectionList, I18nManager, StyleSheet, Text, Pressable } from 'react-native';
import { CountryRow } from './CountryRow';
import { useNormalizedCountries } from '../hook/useCountries';
import { useCountryFilter } from '../hook/useCountryFilter';
import { Countries } from '../data/countries';
import { Searchbar } from './Searchbar';
export const CountryPickerModal = ({ visible, onClose, onSelect, type, searchPlaceholder, title, titleStyle, headerComponent, rowStyle, searchValue, stickySectionHeadersEnabled, onSearchChange, renderRow, renderSectionHeader, showCloseButton = true, closeButtonStyle, closeButtonTextStyle, }) => {
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
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>{headerComponent !== null && headerComponent !== void 0 ? headerComponent : (<Text style={[styles.title, titleStyle]}>{(title !== null && title !== void 0 ? title : isRTL) ? 'اختر البلد' : 'Select Country'}</Text>)}</View>
          {showCloseButton && (<Pressable style={[styles.closeButton, closeButtonStyle]} onPress={onClose} accessibilityLabel="Close" accessibilityRole="button">
              <Text style={[styles.closeButtonText, closeButtonTextStyle]}>×</Text>
            </Pressable>)}
        </View>
        <Searchbar search={search} setSearch={handleSearchChange} placeholder={searchPlaceholder}/>
        <SectionList ref={listRef} sections={sections} stickySectionHeadersEnabled={stickySectionHeadersEnabled !== null && stickySectionHeadersEnabled !== void 0 ? stickySectionHeadersEnabled : false} keyExtractor={item => `${item.cca2}-${item.callingCode}`} renderItem={({ item }) => renderRow ? (renderRow({ item, onSelect, onClose })) : (<CountryRow country={item} onClose={onClose} onSelect={(item) => {
                onSelect(item);
                setInternalSearch('');
            }} type={type} contentContainerStyle={rowStyle}/>)} renderSectionHeader={({ section }) => renderSectionHeader ? (renderSectionHeader(section.title)) : (<View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>{section.title}</Text>
              </View>)} contentContainerStyle={styles.contentContainer}/>
      </View>
    </Modal>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        minHeight: 44,
    },
    headerLeft: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    closeButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 8,
    },
    closeButtonText: {
        fontSize: 28,
        fontWeight: '300',
        color: '#333',
        lineHeight: 32,
    },
    sectionHeaderContainer: {
        backgroundColor: '#e8e8e8',
        borderRadius: 8,
        marginHorizontal: 12,
        marginVertical: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'left',
    },
    contentContainer: {
        paddingVertical: 12,
    }
});
