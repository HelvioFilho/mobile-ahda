import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { EnvelopeSimple, House, MagnifyingGlass, Gear } from 'phosphor-react-native';
import { Home } from '../screens/Home';
import { PlayButton } from '../components/PlayButton';
import { useTheme } from 'styled-components';
import { Search } from '../screens/Search';
import { Message } from '../screens/Message';
import { Settings } from '../screens/Settings';
import { Keyboard } from 'react-native';

export function BottomRoute() {
  const { Navigator, Screen } = createBottomTabNavigator();
  const theme = useTheme();
  const [showKeyboard, setShowKeyboard] = useState(undefined);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      setShowKeyboard(false);
    });
    Keyboard.addListener("keyboardDidShow", () => {
      setShowKeyboard(true);
    });
  }, []);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: 'transparent',
          height: 70,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          shadowColor: theme.colors.tabBarColor.shadow,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
          paddingTop: 5,
          paddingBottom: 10,
        },

        tabBarActiveTintColor: theme.colors.tabBarColor.active,
        tabBarInactiveTintColor: theme.colors.dark,
        tabBarLabelStyle: {
          fontSize: 12,
        }
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <House size={33} color={color} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />

      <Screen
        name="Busca"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass size={30} color={color} weight='regular' />
          )
        }}
      />
      <Screen
        name="Play"
        component={PlayButton}
        options={{
          tabBarLabel: '',
          tabBarButton: () => (
            showKeyboard ? null : <PlayButton />
          )
        }}
      />
      <Screen
        name="Mensagem"
        component={Message}
        options={{
          tabBarIcon: ({ color }) => (
            <EnvelopeSimple size={32} color={color} weight='regular' />
          ),
          // tabBarHideOnKeyboard: true,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Screen
        name="Opções"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Gear size={32} color={color} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
    </Navigator>
  );
}