import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components';
import { Load } from './src/components/Load';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { SetupNotifications, SetupStartSettings, SetupTrackPlayer } from './src/services/Setup';
import { appDataStore } from './src/services/store';
import { useNetInfo } from '@react-native-community/netinfo';
import { NoConnected } from './src/screens/NoConnected';

export default function App() {

  const [splash, setSplash] = useState(true);
  const [player, setPlayer] = useState(false);
  const [notification, setNotification] = useState(false);
  const netInfo = useNetInfo();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const { setBible, setStartSettings } = appDataStore();

  async function getSetup() {

    const isPlayer = await SetupTrackPlayer("https://s18.maxcast.com.br:8707/live");
    const isNotification = await SetupNotifications();
    const isSettings = await SetupStartSettings();

    if (!!isSettings.bible.book) {
      setBible({
        ...isSettings.bible
      });
    } else {
      setBible({
        book: "Eclesiastes",
        chapter: 9,
        number: 10,
        text: "Posso todas as coisas em Cristo que me fortalece."
      });
    }
    if (!!isSettings.settings) {
      setStartSettings({ ...isSettings.settings });
    }

    setPlayer(isPlayer);
    setNotification(isNotification);

  }

  useEffect(() => {
    if (player && notification) {
      SplashScreen.hide();
    } else {
      getSetup();
    }
  }, [notification]);

  if (splash) {
    return (
      <ThemeProvider theme={theme} >
        {
          <LoadingScreen
            onFinish={() => setSplash(false)}
          />
        }
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
        { 
          netInfo.isConnected ?
          fontsLoaded ? 
          <Routes /> : 
          <Load size={35} /> :
          <NoConnected />
        }
      </SafeAreaView>
    </ThemeProvider>
  );
}