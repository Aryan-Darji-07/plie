import React from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {Calendar, Heart, MapPin, Share2} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';

import EventImage from './EventImage';
import {colors, fill, fonts, radius} from '../theme';
import {toggleFavorite} from '../store/favoritesSlice';
import {chipsFor, formatDates, formatPrice, locationFor} from '../utils/event';

export default function EventCard({event, onPress}) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state =>
    state.favorites.items.some(
      item => item.event_date_id === event.event_date_id,
    ),
  );

  const onShare = () => {
    Share.share({
      message: `${event.event_name}\n${event.event_url || ''}`.trim(),
    }).catch(() => {});
  };

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={event.event_name}>
      <View style={styles.imageWrap}>
        <EventImage event={event} style={fill} />
        <View style={styles.actions}>
          <Pressable
            hitSlop={6}
            style={styles.actionBtn}
            onPress={onShare}
            accessibilityRole="button"
            accessibilityLabel="Share event">
            <Share2 size={14} color={colors.text} strokeWidth={2} />
          </Pressable>
          <Pressable
            hitSlop={6}
            style={styles.actionBtn}
            onPress={() => dispatch(toggleFavorite(event))}
            accessibilityRole="button"
            accessibilityState={{selected: isFavorite}}
            accessibilityLabel={
              isFavorite ? 'Remove from favourites' : 'Add to favourites'
            }>
            <Heart
              size={14}
              strokeWidth={2}
              color={isFavorite ? colors.heart : colors.text}
              fill={isFavorite ? colors.heart : 'transparent'}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.chipRow}>
          {chipsFor(event).map((chip, i) => (
            <View key={`${chip}-${i}`} style={styles.chip}>
              <Text style={styles.chipText} numberOfLines={1}>
                {chip}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {event.event_name}
        </Text>

        <View style={styles.metaRow}>
          <MapPin size={13} color={colors.textSecondary} strokeWidth={1.8} />
          <Text style={styles.metaText} numberOfLines={1}>
            {locationFor(event)}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.metaRowFlex}>
            <Calendar
              size={13}
              color={colors.textSecondary}
              strokeWidth={1.8}
            />
            <Text style={styles.metaText} numberOfLines={1}>
              {formatDates(event)}
            </Text>
          </View>
          <Text style={styles.price}>{formatPrice(event)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 12,
  },
  // The image is absolutely positioned so it fills the stretched left column
  // without contributing its intrinsic height to the row.
  imageWrap: {
    width: 138,
    overflow: 'hidden',
    backgroundColor: '#EFEFEC',
  },
  actions: {
    position: 'absolute',
    top: 7,
    right: 7,
    flexDirection: 'row',
    gap: 4,
  },
  actionBtn: {
    width: 25,
    height: 25,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 13,
    paddingVertical: 11,
    justifyContent: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  chip: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.chipBorder,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipText: {
    fontFamily: fonts.regular,
    fontSize: 10.5,
    color: colors.textSecondary,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.text,
    marginTop: 7,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },
  metaRowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  metaText: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 8,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.text,
  },
});
