import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import {colors, fonts} from '../theme';
import {loadEvents} from '../store/eventsSlice';

export default function EventsScreen({navigation}) {
  const dispatch = useDispatch();
  const {items, status, error} = useSelector(state => state.events);
  const user = useSelector(state => state.auth.user);
  const firstName = user?.usr_fname?.split(' ')[0] || 'Dancer';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadEvents());
    }
  }, [dispatch, status]);

  const header = (
    <View style={styles.headerBlock}>
      <Text style={styles.greeting}>Hello {firstName}!</Text>
      <Text style={styles.subtitle}>
        Are you ready to dance? Explore today's movements.
      </Text>
      <View style={styles.searchWrap}>
        <SearchBar editable={false} onPress={() => navigation.navigate('Search')} />
      </View>
    </View>
  );

  if (status === 'loading' && items.length === 0) {
    return (
      <View style={styles.root}>
        <Header />
        {header}
        <ActivityIndicator style={styles.loader} color={colors.text} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Header />
      <FlatList
        data={items}
        keyExtractor={item => String(item.event_date_id)}
        ListHeaderComponent={header}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={status === 'loading'}
            onRefresh={() => dispatch(loadEvents())}
            tintColor={colors.textSecondary}
          />
        }
        renderItem={({item}) => (
          <EventCard
            event={item}
            onPress={() =>
              navigation.navigate('EventDetails', {event: item})
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              {error || 'No events available right now.'}
            </Text>
            {error ? (
              <Pressable
                style={styles.retry}
                onPress={() => dispatch(loadEvents())}>
                <Text style={styles.retryText}>Try again</Text>
              </Pressable>
            ) : null}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.background},
  headerBlock: {paddingTop: 20},
  greeting: {
    fontFamily: fonts.regular,
    fontSize: 22,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    marginTop: 10,
  },
  searchWrap: {marginTop: 18, marginBottom: 18},
  list: {paddingHorizontal: 20, paddingBottom: 24},
  loader: {marginTop: 40},
  empty: {alignItems: 'center', paddingTop: 60, gap: 14},
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retry: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.black,
  },
  retryText: {fontFamily: fonts.medium, fontSize: 13, color: colors.white},
});
