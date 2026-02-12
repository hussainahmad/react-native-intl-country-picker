import React, { useRef, useState } from 'react';
import { Modal, View, SectionList, I18nManager, StyleSheet, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { CountryRow } from './CountryRow';
import { useNormalizedCountries } from '../hook/useCountries';
import { useCountryFilter } from '../hook/useCountryFilter';
import { Countries } from '../data/countries';
import { NormalizedCountry } from '../types';
import { Searchbar } from './Searchbar';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: NormalizedCountry) => void;
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
    item: NormalizedCountry;
    onSelect: (item: NormalizedCountry) => void;
    onClose: () => void;
  }) => React.ReactElement | null;
  /**
   * Custom section header renderer. When provided, it replaces the default title text.
   */
  renderSectionHeader?: (title: string) => React.ReactElement | null;
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
  onSearchChange,
  renderRow,
  renderSectionHeader,
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
        {headerComponent ?? (title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null)}
        <Searchbar search={search} setSearch={handleSearchChange} placeholder={searchPlaceholder} />
        <SectionList
          ref={listRef}
          sections={sections}
          keyExtractor={item => `${item.cca2}-${item.callingCode}`}
          renderItem={({ item }) =>
            renderRow ? (
              renderRow({ item, onSelect, onClose })
            ) : (
              <CountryRow
                country={item}
                onClose={onClose}
                onSelect={onSelect}
                type={type}
                contentContainerStyle={rowStyle}
              />
            )
          }
          renderSectionHeader={({ section }) =>
            renderSectionHeader ? (
              renderSectionHeader(section.title as string)
            ) : (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )
          }
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
