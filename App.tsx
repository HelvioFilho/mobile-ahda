import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components';
import { Load } from './src/components/Load';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { appDataStore } from './src/services/store';
import { bible } from './src/services/api';

const { ASYNC_KEY } = process.env;
const { TOKEN_B } = process.env;

export interface SettingsProps {
  name: string;
  email: string;
  notification: boolean;
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const { setStartSettings, setBible } = appDataStore();

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

  async function getBibleVerse() {
    try {
      const { data } = await bible.get('/verses/ra/random', {
        headers: {
          'Authorization': `Bearer ${TOKEN_B}`,
        }
      });
      setBible({
        book: data.book.name,
        chapter: data.chapter,
        number: data.number,
        text: data.text
      });
    } catch (e) {
      console.log(e.message);
      setBible({
        book: "Eclesiastes",
        chapter: 9,
        number: 10,
        text: "Posso todas as coisas em Cristo que me fortalece."
      });
    }
  }

  useEffect(() => {
    getData();
    permissions();
    getBibleVerse();
    SplashScreen.hide();
  }, []);

  if (splash) {
    return (
      <ThemeProvider theme={theme} >
        <LoadingScreen
          onFinish={() => setSplash(false)}
        />
      </ThemeProvider>
    )
  }

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