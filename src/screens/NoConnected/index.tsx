import React from 'react';
import { BackHandler } from 'react-native';


import {
  ButtonExit,
  ButtonText,
  Container,
  IconSignal,
  TextWarning,
  Warning
} from './styles';

export function NoConnected() {
  return (
    <Container>
      <Warning>
        <IconSignal size={60} name='signal-wifi-off' />
        <TextWarning>
          Você precisa estar conectado a internet
          para utilizar o aplicativo!
        </TextWarning>
        <ButtonExit
          activeOpacity={0.8}
          onPress={() => BackHandler.exitApp()}
        >
          <ButtonText>Sair do App</ButtonText>
        </ButtonExit>
      </Warning>
    </Container>
  );
}