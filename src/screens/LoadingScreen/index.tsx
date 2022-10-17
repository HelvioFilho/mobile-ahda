import React from 'react';
import { Image, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

import angel from '../../assets/angel.json';
import cloud from '../../assets/cloud.png';

import { CloudImage, Container } from './styles';
import { useTheme } from 'styled-components';

interface LoadingScreenProps {
  onFinish: () => void;
}

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const theme = useTheme();
  return (
    <Container
      colors={[theme.colors.tabBarColor.active, theme.colors.background, theme.colors.splash]}
    >
      <StatusBar
        backgroundColor={theme.colors.tabBarColor.active}
        barStyle='dark-content'
      />  
        <LottieView
          source={angel}
          resizeMode="contain"
          style={{
            width: '90%',
            height: '90%',
            alignSelf: 'center',
          }}
          autoPlay
          loop={false}
          onAnimationFinish={onFinish}
        />
        <CloudImage
          source={cloud}
        />
    </Container>
  );
}