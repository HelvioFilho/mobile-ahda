import { StatusBar } from 'react-native';
import LootieView from 'lottie-react-native';
import { useTheme } from 'styled-components/native';
import { CloudImage, Container } from './styles';

import angel from '@assets/angel.json';
import cloud from '@assets/cloud.png';

type LoadingScreenProps = {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const { colors } = useTheme();
  return (
    <Container
      colors={[colors.tabBarColor.active, colors.background, colors.splash]}
    >
      <StatusBar
        backgroundColor={colors.tabBarColor.active}
        barStyle='dark-content'
      />
      <LootieView
        source={angel}
        resizeMode='contain'
        style={{ width: '90%', height: '90%', alignSelf: 'center' }}
        autoPlay
        loop={false}
        onAnimationFinish={onFinished}
      />
      <CloudImage source={cloud} />
    </Container>
  );
}