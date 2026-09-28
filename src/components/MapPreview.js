import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MapPin} from 'lucide-react-native';
import {colors, fonts, radius} from '../theme';

// Renders a location panel rather than a real map. The API returns only a city
// and country (no coordinates), and OpenStreetMap's tile servers reject app
// traffic under their usage policy, so a real map would need a keyed provider.
export default function MapPreview({location, height = 168}) {
  return (
    <View style={[styles.panel, {height}]}>
      <View style={styles.pin}>
        <MapPin size={22} color={colors.white} strokeWidth={2} />
      </View>
      <Text style={styles.label}>{location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radius.md,
    backgroundColor: '#ECECE7',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  pin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14.5,
    color: colors.textSecondary,
  },
});
