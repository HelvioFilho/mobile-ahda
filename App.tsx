import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';

export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <SafeAreaView style={{flex: 1}}>
        <Routes />
      </SafeAreaView>
    </ThemeProvider>
  );
}