import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from 'styled-components';
import { Load } from './src/components/Load';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { appDataStore } from './src/services/store';
import * as Notifications from 'expo-notifications';
import SplashScreen from 'react-native-splash-screen';

const { ASYNC_KEY } = process.env;

export interface SettingsProps {
  name: string;
  email: string;
  notification: boolean;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const { setStartSettings } = appDataStore();

  async function permissions() {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      })
    });

    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }

  async function getData() {
    const response = await AsyncStorage.getItem(ASYNC_KEY);
    const settings = response ? JSON.parse(response) : {} as SettingsProps;
    setStartSettings(settings);
  }

  useEffect(() => {
    getData();
    permissions();
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme} >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={theme.colors.background}
          barStyle='dark-content'
        />
        {fontsLoaded ? <Routes /> : <Load size={35} />}
      </SafeAreaView>
    </ThemeProvider>
  );
}