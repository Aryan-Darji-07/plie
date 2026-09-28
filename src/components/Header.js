import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, fonts} from '../theme';

export default function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, {paddingTop: insets.top + 8}]}>
      <Text style={styles.logo}>Plié</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.headerBg,
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  logo: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.text,
  },
});
