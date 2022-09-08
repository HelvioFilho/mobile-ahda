import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { EnvelopeSimple, Gear, House, MagnifyingGlass } from 'phosphor-react-native';
import { Keyboard } from 'react-native';
import { useTheme } from 'styled-components';
import { PlayButton } from '../components/PlayButton';
import { Home } from '../screens/Home';
import { Message } from '../screens/Message';
import { Post } from '../screens/Post';
import { Search } from '../screens/Search';
import { Settings } from '../screens/Settings';

function HomeScreen(){
  const { Navigator, Screen} = createStackNavigator();

  return (
    <Navigator
      screenOptions={{headerShown: false}}
    >
      <Screen 
        name="HomeAndPost"
        component={Home}
      />
      <Screen 
        name="SearchAndPost"
        component={Search}
      />
      <Screen 
        name="Post"
        component={Post}
      />
    </Navigator>
  );
}

function SearchScreen(){
  const { Navigator, Screen} = createStackNavigator();

  return (
    <Navigator
      screenOptions={{headerShown: false}}
    >
      <Screen 
        name="SearchAndPost"
        component={Search}
      />
      <Screen 
        name="Post"
        component={Post}
      />
    </Navigator>
  );
}

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
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <House size={33} color={color} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />

      <Screen
        name="Busca"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass size={30} color={color} weight='regular' />
          ),
          tabBarHideOnKeyboard: true,
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