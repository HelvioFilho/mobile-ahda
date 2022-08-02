import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { EnvelopeSimple, House, MagnifyingGlass, Play, Gear } from 'phosphor-react-native';
import { Home } from '../screens/Home';
import { PlayButton } from '../components/PlayButton';
import { useTheme } from 'styled-components';

export function BottomRoute(){
  const { Navigator, Screen } = createBottomTabNavigator();
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          borderTopColor: 'transparent',
          position: 'relative',
          height: 70,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          shadowColor: theme.colors.tabBarColor.shadow,
          shadowOffset: { width: 0, height: 10},
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
          tabBarIcon: ({ focused, color}) => (
            <House size={33} color={color} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />

      <Screen 
        name="Busca"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <MagnifyingGlass size={30} color={color} weight='regular' />
          )
        }}
      />
      <Screen 
        name="Play"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarButton: () => (
            <PlayButton />
          )
        }}
      />
      <Screen 
        name="Mensagem"
        component={Home}
        options={{
          tabBarIcon: ({ color}) => (
            <EnvelopeSimple size={32} color={color} weight='regular' />
          )
        }}
      />
      <Screen 
        name="Opções"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color}) => (
            <Gear size={32} color={color} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
    </Navigator>
  );
}