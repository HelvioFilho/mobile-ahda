import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaView, StatusBar } from 'react-native';
import theme from './src/theme';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import { useNetInfo } from '@react-native-community/netinfo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loading } from '@components/Loading';
import { Offline } from '@screens/Offline';
import { LoadingScreen } from '@screens/LoadingScreen';
import { CheckActiveNotifications, SetupNotifications, SetupStartSettings, SetupTrackPlayer } from './src/services/Setup';
import { appDataStore } from '@services/store';
import { Routes } from '@routes/index';

const queryClient = new QueryClient();

export default function App() {
  const [splash, setSplash] = useState(true);
  const [player, setPlayer] = useState(false);
  const [notification, setNotification] = useState(false);
  const { setBible, setStartSettings } = appDataStore();

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });
  const netInfo = useNetInfo();

  async function getSetup() {
    const isSettings = await SetupStartSettings();
    const isPlayer = await SetupTrackPlayer();
    const isNotification = await SetupNotifications();
    if(isSettings){
      if(isSettings.settings.notification){
        await CheckActiveNotifications();
      }
    }

    setBible(isSettings.bible);
    setStartSettings(isSettings.settings);
    setPlayer(isPlayer);
    setNotification(isNotification);
  }

  useEffect(() => {
    if (!player && !notification) {
      getSetup();
    }
  }, [notification]);

  if (splash) {
    return (
      <ThemeProvider theme={theme}>
        {
          <LoadingScreen
            onFinished={() => setSplash(false)}
          />
        }
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle="dark-content"
          />
          {
            netInfo.isConnected
              ?
              fontsLoaded ? <Routes /> : <Loading size={32} />
              :
              <Offline />
          }
        </SafeAreaView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}