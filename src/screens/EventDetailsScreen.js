import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeft, Calendar, Heart, MapPin, Share2} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';

import EventImage from '../components/EventImage';
import MapPreview from '../components/MapPreview';
import {colors, fonts, radius} from '../theme';
import {toggleFavorite} from '../store/favoritesSlice';
import {chipsFor, formatDates, formatPrice, locationFor} from '../utils/event';

export default function EventDetailsScreen({route, navigation}) {
  const {event} = route.params;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const isFavorite = useSelector(state =>
    state.favorites.items.some(
      item => item.event_date_id === event.event_date_id,
    ),
  );

  const organizer = event.event_name?.split(/[:\s]/)[0] || 'Plié';
  const location = locationFor(event);

  const onShare = () => {
    Share.share({
      message: `${event.event_name}\n${event.event_url || ''}`.trim(),
    }).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <View style={[styles.topBar, {paddingTop: insets.top + 8}]}>
        <Pressable
          hitSlop={12}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <ArrowLeft size={24} color={colors.text} strokeWidth={2} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <EventImage event={event} style={styles.hero} />
          <View style={styles.heroActions}>
            <Pressable
              style={styles.heroBtn}
              onPress={onShare}
              accessibilityRole="button"
              accessibilityLabel="Share event">
              <Share2 size={18} color={colors.text} strokeWidth={1.9} />
            </Pressable>
            <Pressable
              style={styles.heroBtn}
              onPress={() => dispatch(toggleFavorite(event))}
              accessibilityRole="button"
              accessibilityState={{selected: isFavorite}}
              accessibilityLabel={
                isFavorite ? 'Remove from favourites' : 'Add to favourites'
              }>
              <Heart
                size={18}
                strokeWidth={1.9}
                color={isFavorite ? colors.heart : colors.text}
                fill={isFavorite ? colors.heart : 'transparent'}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.chipRow}>
            {chipsFor(event).map((chip, i) => (
              <View key={`${chip}-${i}`} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.title}>{event.event_name}</Text>
          <Text style={styles.price}>
            {formatPrice(event).replace(' - ', ' — ')}
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Calendar size={19} color={colors.text} strokeWidth={1.7} />
            </View>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>DATE & TIME</Text>
              <Text style={styles.infoValue}>{formatDates(event)}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MapPin size={19} color={colors.text} strokeWidth={1.7} />
            </View>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>LOCATION</Text>
              <Text style={styles.infoValue}>{location}</Text>
            </View>
          </View>

          <View style={styles.mapWrap}>
            <MapPreview location={location} />
          </View>

          <Text style={styles.sectionTitle}>About the Event</Text>
          {String(event.description || '')
            .split(/\n{2,}/)
            .map(part => part.trim())
            .filter(Boolean)
            .map((paragraph, i) => (
              <Text key={i} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}

          <View style={styles.organizer}>
            <View style={styles.organizerAvatar}>
              <Text style={styles.organizerInitial}>
                {organizer.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.infoLabel}>ORGANIZED BY</Text>
              <Text style={styles.organizerName} numberOfLines={1}>
                {organizer} International
              </Text>
              <Pressable
                onPress={() =>
                  event.event_url
                    ? Linking.openURL(event.event_url).catch(() => {})
                    : null
                }
                accessibilityRole="link">
                <Text style={styles.viewProfile}>View Profile</Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            style={({pressed}) => [styles.cta, pressed && styles.pressed]}
            onPress={onShare}
            accessibilityRole="button">
            <Text style={styles.ctaText}>Share tickets</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.background},
  flex: {flex: 1},
  topBar: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  scroll: {paddingBottom: 36},
  heroWrap: {width: '100%', height: 250, backgroundColor: '#1A1A1A'},
  hero: {width: '100%', height: '100%'},
  heroActions: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    gap: 10,
  },
  heroBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {paddingHorizontal: 20, paddingTop: 18},
  chipRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 7},
  chip: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.chipBorder,
    borderRadius: radius.pill,
    paddingHorizontal: 11,
    paddingVertical: 5,
    backgroundColor: colors.surface,
  },
  chipText: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.textSecondary,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.text,
    marginTop: 14,
    letterSpacing: -0.4,
  },
  price: {
    fontFamily: fonts.medium,
    fontSize: 21,
    color: colors.text,
    marginTop: 8,
  },
  infoRow: {flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 20},
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: '#EFEFEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextWrap: {flex: 1},
  infoLabel: {
    fontFamily: fonts.medium,
    fontSize: 10.5,
    letterSpacing: 0.9,
    color: colors.textMuted,
  },
  infoValue: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
    marginTop: 3,
  },
  mapWrap: {marginTop: 20},
  sectionTitle: {
    fontFamily: fonts.regular,
    fontSize: 21,
    color: colors.text,
    marginTop: 24,
  },
  paragraph: {
    fontFamily: fonts.regular,
    fontSize: 14.5,
    lineHeight: 24,
    color: colors.textSecondary,
    marginTop: 12,
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#F0F0ED',
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 24,
  },
  organizerAvatar: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  organizerInitial: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.white,
  },
  organizerName: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.text,
    marginTop: 3,
  },
  viewProfile: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  cta: {
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },
  pressed: {opacity: 0.85},
  ctaText: {fontFamily: fonts.medium, fontSize: 16, color: colors.white},
});
