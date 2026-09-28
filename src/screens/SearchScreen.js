import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import {colors, fonts} from '../theme';
import {chipsFor, locationFor} from '../utils/event';

export default function SearchScreen({navigation}) {
  const events = useSelector(state => state.events.items);
  const user = useSelector(state => state.auth.user);
  const firstName = user?.usr_fname?.split(' ')[0] || 'Dancer';
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // The tab stays mounted, so autoFocus would only fire the first time. Focus
  // on every tab entry instead — but only once the tab transition has finished
  // committing, since focusing mid-transition crashes Fabric's view mounting.
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => inputRef.current?.focus(), 450);
      return () => clearTimeout(timer);
    }, []),
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return events;
    }
    return events.filter(event => {
      const haystack = [
        event.event_name,
        locationFor(event),
        ...chipsFor(event),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [events, query]);

  return (
    <View style={styles.root}>
      <Header />
      {/* Kept outside the FlatList: a focused TextInput inside
          ListHeaderComponent crashes Fabric's view mounting on re-render. */}
      <View style={styles.headerBlock}>
        <Text style={styles.greeting}>Hello {firstName}!</Text>
        <Text style={styles.subtitle}>
          Are you ready to dance? Explore today's movements.
        </Text>
        <View style={styles.searchWrap}>
          <SearchBar
            inputRef={inputRef}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>
      <FlatList
        data={results}
        keyExtractor={item => String(item.event_date_id)}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetails', {event: item})}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No events match “{query.trim()}”.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.background},
  headerBlock: {paddingTop: 20, paddingHorizontal: 20},
  greeting: {fontFamily: fonts.regular, fontSize: 22, color: colors.text},
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    marginTop: 10,
  },
  searchWrap: {marginTop: 18, marginBottom: 18},
  list: {paddingHorizontal: 20, paddingBottom: 24},
  empty: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});
