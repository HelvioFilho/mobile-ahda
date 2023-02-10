import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Home } from '@screens/Home';
import { Post } from '@screens/Post';
import { Search } from '@screens/Search';
import { Message } from '@screens/Message';
import { Settings } from '@screens/Settings';
import { PlayButton } from '@components/PlayButton';

const { Navigator, Screen } = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name='HomeAndPost'
        component={Home}
      />
      <Screen
        name='Post'
        component={Post}
      />
    </Navigator>
  );
}

function SearchScreen() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name='SearchAndPost'
        component={Search}
      />
      <Screen
        name='Post'
        component={Post}
      />
    </Navigator>
  );
}

export function BottomRoute() {
  const [showKeyboard, setShowKeyboard] = useState<boolean | undefined>(undefined);
  const { Navigator, Screen } = createBottomTabNavigator();
  const { colors } = useTheme();

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => setShowKeyboard(false));
    Keyboard.addListener('keyboardDidShow', () => setShowKeyboard(true));

    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
      Keyboard.removeAllListeners('keyboardDidShow');
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
          paddingBottom: 10
        },
        tabBarActiveTintColor: colors.tabBarColor.active,
        tabBarInactiveTintColor: colors.dark,
        tabBarLabelStyle: {
          fontSize: 12,
        }
      }}
    >
      <Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'md-home-sharp' : 'md-home-outline'} size={30} color={color} />
          )
        }}
      />
      <Screen
        name='Busca'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' size={33} color={color} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Screen
        name='Play'
        component={PlayButton}
        options={{
          tabBarLabel: '',
          tabBarButton: () => (
            showKeyboard ? null : <PlayButton />
          )
        }}
      />
      <Screen
        name='Mensagem'
        component={Message}
        options={{
          tabBarIcon: ({ color }) => (
            <EvilIcons name='envelope' size={37} color={color} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Screen
        name='Opções'
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'ios-settings' : 'ios-settings-outline'} size={30} color={color} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
    </Navigator>
  );
}