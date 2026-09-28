import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ImageOff} from 'lucide-react-native';
import {colors} from '../theme';
import {remoteImageFor} from '../utils/event';

export default function EventImage({
  event,
  style,
  iconSize = 30,
  resizeMode = 'cover',
}) {
  const [failed, setFailed] = useState(false);
  const remote = remoteImageFor(event);

  if (!remote || failed) {
    return (
      <View style={[styles.placeholder, style]}>
        <ImageOff size={iconSize} color={colors.textMuted} strokeWidth={1.5} />
      </View>
    );
  }

  return (
    <Image
      source={remote}
      style={style}
      resizeMode={resizeMode}
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#EBEBE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
