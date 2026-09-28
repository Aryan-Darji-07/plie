import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Search, X} from 'lucide-react-native';
import {colors, fonts, radius} from '../theme';

export default function SearchBar({
  value,
  onChangeText,
  onPress,
  inputRef,
  editable = true,
  placeholder = 'Search events...',
}) {
  const showClear = editable && value?.length > 0;

  const body = (
    <View style={styles.wrap}>
      {showClear ? null : (
        <Search size={19} color={colors.textSecondary} strokeWidth={1.8} />
      )}
      {editable ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
      ) : (
        <Text style={styles.placeholder}>{placeholder}</Text>
      )}
      {showClear ? (
        <Pressable
          hitSlop={10}
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search">
          <X size={20} color={colors.text} strokeWidth={2} />
        </Pressable>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="search">
        {body}
      </Pressable>
    );
  }
  return body;
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15.5,
    color: colors.text,
    padding: 0,
  },
  placeholder: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15.5,
    color: colors.textMuted,
  },
});
