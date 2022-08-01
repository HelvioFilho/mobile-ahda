import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { EnvelopeSimple, House, MagnifyingGlass, Play, Gear } from 'phosphor-react-native';
import { Home } from '../screens/Home';

export function BottomRoute(){
  const { Navigator, Screen } = createBottomTabNavigator();

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
          shadowColor: '#7F5DF0',
          shadowOffset: { width: 0, height: 10},
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
          paddingTop: 5,
          paddingBottom: 10,
        },

        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
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
          tabBarIcon: ({ focused, color}) => (
            <MagnifyingGlass size={30} color={color} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
      <Screen 
        name="Play"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color}) => (
            <Play size={32} color={color} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
      <Screen 
        name="Mensagem"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color}) => (
            <EnvelopeSimple size={32} color={color} weight={focused ? 'fill' : 'regular'} />
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