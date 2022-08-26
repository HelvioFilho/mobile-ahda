import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold
} from '@expo-google-fonts/lato';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { Load } from './src/components/Load';

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold
  });

  return (
    <ThemeProvider theme={theme} >
      <SafeAreaView style={{ flex: 1 }}>
        { fontsLoaded ? <Routes /> : <Load size={35} />}
      </SafeAreaView>
    </ThemeProvider>
  );
}