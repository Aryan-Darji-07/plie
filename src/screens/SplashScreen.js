import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import FadeOverlay from '../components/FadeOverlay';
import {colors, fill, fonts} from '../theme';
import {selectIsSignedIn} from '../store/authSlice';

export default function SplashScreen({navigation}) {
  const isSignedIn = useSelector(selectIsSignedIn);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(isSignedIn ? 'Main' : 'Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation, isSignedIn]);

  return (
    <View style={styles.root}>
      <Image
        source={require('../assets/images/hero.png')}
        style={styles.hero}
        resizeMode="cover"
      />
      <FadeOverlay
        stops={[
          {offset: '0', opacity: 0.85},
          {offset: '0.28', opacity: 0.25},
          {offset: '0.5', opacity: 0.55},
          {offset: '0.72', opacity: 0.92},
          {offset: '1', opacity: 1},
        ]}
      />

      <View style={styles.center}>
        <Text style={styles.logo}>Plié</Text>
        <Text style={styles.tagline}>ELEVATE THE MOVEMENT</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Your Dance - Your Stage</Text>
        <Text style={styles.footerSub}>DISCOVER•BOOK•MOVE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2EFEC',
  },
  hero: fill,
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: fonts.display,
    fontSize: 72,
    color: colors.text,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: fonts.medium,
    fontSize: 15,
    letterSpacing: 3.4,
    color: '#5A5A56',
    marginTop: 6,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 64,
    alignItems: 'center',
  },
  footerTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: '#3A3A37',
  },
  footerSub: {
    fontFamily: fonts.regular,
    fontSize: 9,
    letterSpacing: 1.6,
    color: '#8A8A85',
    marginTop: 5,
  },
});
