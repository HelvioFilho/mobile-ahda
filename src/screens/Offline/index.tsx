import { BackHandler } from 'react-native';
import { 
  ButtonExit, 
  ButtonText, 
  Container, 
  IconSignal, 
  TextWarning, 
  Warning 
} from './styles';

export function Offline(){
  return (
    <Container>
      <Warning>
        <IconSignal 
          size={60}
          name='signal-wifi-off'
        />
        <TextWarning>
          Você precisa estar conectado à internet para usar o aplicativo.
        </TextWarning>
        <ButtonExit
          activeOpacity={0.8}
          onPress={() => BackHandler.exitApp()}
        >
          <ButtonText>Sair do aplicativo</ButtonText>
        </ButtonExit>
      </Warning>
    </Container>
  );
}