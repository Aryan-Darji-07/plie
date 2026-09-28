import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Bell,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  Pencil,
  Ticket,
  User,
} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../components/Header';
import {colors, fonts, radius} from '../theme';
import {logout} from '../store/authSlice';

const MENU = [
  {key: 'tickets', label: 'My Tickets', Icon: Ticket},
  {key: 'payment', label: 'Payment Methods', Icon: CreditCard},
  {key: 'notifications', label: 'Notification Settings', Icon: Bell},
  {key: 'help', label: 'Help & Support', Icon: HelpCircle},
];

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const name = user
    ? [user.usr_fname, user.usr_lname].filter(Boolean).join(' ')
    : 'Dance Enthusiast';
  const email = user?.usr_email || 'abc@gmail.com';
  const avatarUri = user?.usr_profile_img;

  const onLogout = () => {
    dispatch(logout());
    navigation.getParent()?.reset({index: 0, routes: [{name: 'Login'}]});
  };

  return (
    <View style={styles.root}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            {avatarUri && !avatarFailed ? (
              <Image
                source={{uri: avatarUri}}
                style={styles.avatarImage}
                onError={() => setAvatarFailed(true)}
              />
            ) : (
              <User size={58} color="#B6B6B2" strokeWidth={1.6} />
            )}
          </View>
          <Pressable
            style={styles.editBadge}
            accessibilityRole="button"
            accessibilityLabel="Edit profile picture">
            <Pencil size={13} color={colors.white} strokeWidth={2.2} />
          </Pressable>
        </View>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.card}>
          {MENU.map(({key, label, Icon}, index) => (
            <Pressable
              key={key}
              style={({pressed}) => [
                styles.row,
                index > 0 && styles.rowDivider,
                pressed && styles.rowPressed,
              ]}
              accessibilityRole="button">
              <Icon size={21} color={colors.text} strokeWidth={1.7} />
              <Text style={styles.rowLabel}>{label}</Text>
              <ChevronRight
                size={19}
                color={colors.textMuted}
                strokeWidth={1.8}
              />
            </Pressable>
          ))}

          <Pressable
            style={({pressed}) => [
              styles.row,
              styles.rowDivider,
              pressed && styles.rowPressed,
            ]}
            onPress={onLogout}
            accessibilityRole="button">
            <LogOut size={21} color={colors.danger} strokeWidth={1.9} />
            <Text style={[styles.rowLabel, styles.logoutLabel]}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.background},
  scroll: {paddingHorizontal: 20, paddingTop: 26, paddingBottom: 30},
  avatarWrap: {alignSelf: 'center'},
  avatar: {
    width: 128,
    height: 128,
    borderRadius: radius.lg,
    backgroundColor: '#EDEDEA',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {width: '100%', height: '100%'},
  editBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
  email: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    marginTop: 26,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    height: 73,
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  rowPressed: {backgroundColor: '#FAFAF8'},
  rowLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
  },
  logoutLabel: {color: colors.danger},
});
