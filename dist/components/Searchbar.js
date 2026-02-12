import { I18nManager, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
export const Searchbar = ({ search, setSearch, placeholder }) => {
    const isRTL = I18nManager.isRTL;
    const height = { height: isRTL ? 52 : 42 };
    return (<View style={[styles.searchBar, height]}>
      <TextInput value={search} onChangeText={setSearch} placeholder={(placeholder !== null && placeholder !== void 0 ? placeholder : isRTL) ? 'بحث' : 'Search'} textAlign={isRTL ? 'right' : 'left'}/>
      {search !== '' && (<Pressable style={styles.iconContainer} onPress={() => setSearch('')}>
          <Text style={styles.icon}>x</Text>
        </Pressable>)}
    </View>);
};
const styles = StyleSheet.create({
    icon: {
        fontSize: 16,
        fontWeight: '500',
    },
    iconContainer: {
        marginStart: 'auto',
        marginEnd: 8,
    },
    searchBar: {
        padding: 12,
        borderWidth: 0.5,
        marginHorizontal: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
    },
});
