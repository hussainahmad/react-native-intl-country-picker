import React, { useRef, useState } from 'react';
import { Modal, View, SectionList, I18nManager, StyleSheet, Text, StyleProp, TextStyle, ViewStyle, Pressable } from 'react-native';
import { CountryRow } from './CountryRow';
import { useNormalizedCountries } from '../hook/useCountries';
import { useCountryFilter } from '../hook/useCountryFilter';
import { Countries } from '../data/countries';
import { Country } from '../types';
import { Searchbar } from './Searchbar';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: Country) => void;
  /**
   * Controls which label to show for the country name.
   * - 'en'  -> always show englishName (even when app is RTL)
   * - 'ar' or undefined -> default: show Arabic when RTL, otherwise englishName
   */
  type?: 'ar' | 'en';
  /**
   * Custom placeholder for the search input.
   * Defaults to Arabic/English based on RTL if not provided.
   */
  searchPlaceholder?: string;
  /**
   * Optional title text shown at the top of the modal.
   */
  title?: string;
  /**
   * Style override for the default title text.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Fully custom header component rendered above the search bar.
   * If provided, it replaces the default title.
   */
  headerComponent?: React.ReactNode;
  /**
   * Style override for each country row container.
   */
  rowStyle?: StyleProp<ViewStyle>;
  /**
   * Optional controlled search value. If provided together with onSearchChange,
   * the searchbar becomes a controlled input.
   */
  searchValue?: string;
  /**
   * Change handler for controlled search mode.
   */
  onSearchChange?: (value: string) => void;
  /**
   * Custom row renderer. When provided, it completely replaces the default row.
   */
  renderRow?: (params: {
    item: Country;
    onSelect: (item: Country) => void;
    onClose: () => void;
  }) => React.ReactElement | null;
  /**
   * Custom section header renderer. When provided, it replaces the default title text.
   */
  renderSectionHeader?: (title: string) => React.ReactElement | null;
  /**
   * Whether to enable sticky section headers.
   */
  stickySectionHeadersEnabled?: boolean;
  /**
   * Whether to show the close (cross) button in the header.
   * When true, user can dismiss the picker without selecting a country.
   * Default: true.
   */
  showCloseButton?: boolean;
  /**
   * Style override for the close button container.
   */
  closeButtonStyle?: StyleProp<ViewStyle>;
  /**
   * Style override for the close button text (the "×" icon).
   */
  closeButtonTextStyle?: StyleProp<TextStyle>;

};

export const CountryPickerModal = ({
  visible,
  onClose,
  onSelect,
  type,
  searchPlaceholder,
  title,
  titleStyle,
  headerComponent,
  rowStyle,
  searchValue,
  stickySectionHeadersEnabled,
  onSearchChange,
  renderRow,
  renderSectionHeader,
  showCloseButton = true,
  closeButtonStyle,
  closeButtonTextStyle,
}: Props) => {
  const isRTL = I18nManager.isRTL;
  const listRef = useRef<SectionList>(null);
  const [internalSearch, setInternalSearch] = useState('');

  const search = searchValue ?? internalSearch;
  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearch(value);
    }
  };

  const countryArray = useNormalizedCountries(Countries, isRTL, type);
  const sections = useCountryFilter(countryArray, search, isRTL, type);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>{headerComponent ?? (<Text style={[styles.title, titleStyle]}>{title ?? isRTL ? 'اختر البلد' : 'Select Country' }</Text>)}</View>
          {showCloseButton && (
            <Pressable style={[styles.closeButton, closeButtonStyle]} onPress={onClose} accessibilityLabel="Close" accessibilityRole="button">
              <Text style={[styles.closeButtonText, closeButtonTextStyle]}>×</Text>
            </Pressable>
          )}
        </View>
        <Searchbar search={search} setSearch={handleSearchChange} placeholder={searchPlaceholder} />
        <SectionList
          ref={listRef}
          sections={sections}
          stickySectionHeadersEnabled={stickySectionHeadersEnabled ?? false}
          keyExtractor={item => `${item.cca2}-${item.callingCode}`}
          renderItem={({ item }) =>
            renderRow ? (
              renderRow({ item, onSelect, onClose })
            ) : (
              <CountryRow
                country={item}
                onClose={onClose}
                onSelect={(item)=>{
                  onSelect(item);
                  setInternalSearch('')
                }}
                type={type}
                contentContainerStyle={rowStyle}
              />
            )
          }
          renderSectionHeader={({ section }) =>
            renderSectionHeader ? (
              renderSectionHeader(section.title as string)
            ) : (
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>{section.title}</Text>
              </View>
            )
          }
          contentContainerStyle={styles.contentContainer}
          // contentContainerStyle={{marginStart: 12, marginEnd:12, borderWidth:1}}
        />
      </View>
    </Modal>
  );
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
