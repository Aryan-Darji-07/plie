import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Heart} from 'lucide-react-native';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import EventCard from '../components/EventCard';
import {colors, fonts} from '../theme';
import {selectFavorites} from '../store/favoritesSlice';

export default function FavouritesScreen({navigation}) {
  const favorites = useSelector(selectFavorites);

  return (
    <View style={styles.root}>
      <Header />
      <FlatList
        data={favorites}
        keyExtractor={item => String(item.event_date_id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.title}>Your Favorite Events!</Text>
            <Text style={styles.subtitle}>Find your favorite events here....</Text>
          </View>
        }
        renderItem={({item}) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetails', {event: item})}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Heart size={34} color={colors.textMuted} strokeWidth={1.4} />
            <Text style={styles.emptyText}>
              You haven't saved any events yet.{'\n'}Tap the heart on an event to
              add it here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.background},
  headerBlock: {paddingTop: 20, marginBottom: 18},
  title: {fontFamily: fonts.regular, fontSize: 22, color: colors.text},
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 10,
  },
  list: {paddingHorizontal: 20, paddingBottom: 24},
  empty: {alignItems: 'center', paddingTop: 70, gap: 16},
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
