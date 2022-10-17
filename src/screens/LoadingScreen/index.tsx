import React from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles';
import angel from '../../assets/angel.json';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

interface LoadingScreenProps {
  onFinish: () => void;
}

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        backgroundColor={theme.colors.background}
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
    </Container>
  );
}