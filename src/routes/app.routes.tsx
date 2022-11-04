import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { Keyboard } from 'react-native';
import { useTheme } from 'styled-components';
import { PlayButton } from '../components/PlayButton';
import { Home } from '../screens/Home';
import { Message } from '../screens/Message';
import { Post } from '../screens/Post';
import { Search } from '../screens/Search';
import { Settings } from '../screens/Settings';

function HomeScreen() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
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

function SearchScreen() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
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

    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      Keyboard.removeAllListeners("keyboardDidShow");
    }
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
            <>
              {
                focused ?
                  <Ionicons name='md-home-sharp' size={30} color={color} />
                  :
                  <Ionicons name='md-home-outline' size={30} color={color} />
              }
            </>
          )
        }}
      />

      <Screen
        name="Busca"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' size={33} color={color} />
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
            // <EnvelopeSimple size={32} color={color} />
            <EvilIcons name='envelope' size={37} color={color} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Screen
        name="Opções"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <>
              {
                focused ?
                  <Ionicons name='ios-settings' size={30} color={color} />
                  :
                  <Ionicons name='ios-settings-outline' size={30} color={color} />
              }
            </>
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
    </Navigator>
  );
}