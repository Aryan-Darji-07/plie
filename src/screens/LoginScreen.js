import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';

import FadeOverlay from '../components/FadeOverlay';
import {AppleIcon, FacebookIcon, GoogleIcon} from '../components/BrandIcons';
import {colors, fill, fonts, radius} from '../theme';
import {clearAuthError, continueAsGuest, signIn} from '../store/authSlice';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [touched, setTouched] = useState(false);

  const loading = status === 'loading';

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const localError =
    touched && (!email.trim() || !password)
      ? 'Please enter your email and password.'
      : null;

  const onSignIn = async () => {
    setTouched(true);
    if (!email.trim() || !password) {
      return;
    }
    const result = await dispatch(
      signIn({email: email.trim(), password}),
    );
    if (signIn.fulfilled.match(result)) {
      navigation.replace('Main');
    }
  };

  const onGuest = () => {
    dispatch(continueAsGuest());
    navigation.replace('Main');
  };

  const message = localError || error;

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

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.brand}>
            <Text style={styles.logo}>Plié</Text>
            <Text style={styles.tagline}>ELEVATE THE MOVEMENT</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="email@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              editable={!loading}
            />

            <Text style={[styles.label, styles.labelSpaced]}>Password</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secure}
                autoCapitalize="none"
                editable={!loading}
              />
              <Pressable
                hitSlop={10}
                onPress={() => setSecure(s => !s)}
                accessibilityRole="button"
                accessibilityLabel={
                  secure ? 'Show password' : 'Hide password'
                }>
                {secure ? (
                  <Eye size={19} color={colors.textSecondary} strokeWidth={1.7} />
                ) : (
                  <EyeOff
                    size={19}
                    color={colors.textSecondary}
                    strokeWidth={1.7}
                  />
                )}
              </Pressable>
            </View>

            <Text style={styles.forgot}>Forgot Password?</Text>

            {message ? <Text style={styles.error}>{message}</Text> : null}

            <Pressable
              style={({pressed}) => [
                styles.signInBtn,
                pressed && styles.pressed,
                loading && styles.disabled,
              ]}
              onPress={onSignIn}
              disabled={loading}
              accessibilityRole="button">
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.signInText}>Sign In</Text>
              )}
            </Pressable>

            <Text style={styles.memberText}>
              Not a member? <Text style={styles.memberLink}>Sign Up Here</Text>
            </Text>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or Sign In with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              <View style={styles.socialBtn}>
                <GoogleIcon />
              </View>
              <View style={styles.socialBtn}>
                <AppleIcon size={24} />
              </View>
              <View style={styles.socialBtn}>
                <FacebookIcon />
              </View>
            </View>

            <Pressable
              style={({pressed}) => [styles.guestBtn, pressed && styles.pressed]}
              onPress={onGuest}
              accessibilityRole="button">
              <Text style={styles.guestText}>Enter as Guest</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F2EFEC'},
  hero: fill,
  flex: {flex: 1},
  scroll: {
    paddingTop: 90,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
  brand: {alignItems: 'center', marginBottom: 26},
  logo: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.text,
  },
  tagline: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    letterSpacing: 2.6,
    color: '#5A5A56',
    marginTop: 3,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: 22,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: '#3E3E3B',
    marginBottom: 7,
  },
  labelSpaced: {marginTop: 16},
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 9,
    paddingHorizontal: 13,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.white,
  },
  passwordWrap: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 9,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  passwordInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    padding: 0,
  },
  forgot: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: '#3E3E3B',
    textAlign: 'right',
    marginTop: 11,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: colors.danger,
    marginTop: 10,
  },
  signInBtn: {
    height: 52,
    backgroundColor: colors.black,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  pressed: {opacity: 0.85},
  disabled: {opacity: 0.7},
  signInText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.white,
  },
  memberText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: '#3E3E3B',
    textAlign: 'center',
    marginTop: 15,
  },
  memberLink: {fontFamily: fonts.bold, color: colors.text},
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 12,
  },
  divider: {flex: 1, height: 1, backgroundColor: colors.border},
  dividerText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: '#5F5F5C',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
  },
  socialBtn: {
    width: 56,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  guestBtn: {
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F7F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  guestText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#2E2E2C',
  },
});
