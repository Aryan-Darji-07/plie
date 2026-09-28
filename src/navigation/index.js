import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Calendar, Heart, Search, User} from 'lucide-react-native';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import EventsScreen from '../screens/EventsScreen';
import SearchScreen from '../screens/SearchScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import {colors, fonts} from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TABS = [
  {name: 'Search', label: 'SEARCH', component: SearchScreen, Icon: Search},
  {name: 'Events', label: 'EVENTS', component: EventsScreen, Icon: Calendar},
  {
    name: 'Favourites',
    label: 'FAVOURITES',
    component: FavouritesScreen,
    Icon: Heart,
  },
  {name: 'Profile', label: 'PROFILE', component: ProfileScreen, Icon: User},
];

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          {height: 64 + insets.bottom, paddingBottom: insets.bottom},
        ],
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      {TABS.map(({name, label, component, Icon}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: label,
            tabBarIcon: ({color, focused}) => (
              <Icon
                size={21}
                color={color}
                strokeWidth={focused ? 2.1 : 1.7}
                fill={
                  focused && name === 'Favourites' ? color : 'transparent'
                }
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F2F2EF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  tabItem: {paddingVertical: 2},
  tabLabel: {
    fontFamily: fonts.medium,
    fontSize: 10.5,
    letterSpacing: 0.7,
    marginTop: 5,
  },
});
