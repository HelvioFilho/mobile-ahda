import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import LogoImage from '../../assets/angel-white.png';

import { Container, Logo, TitleHeader } from './styles';

interface HeaderProps {
  animation: boolean;
}

export function Header({ animation }: HeaderProps) {
  const { width: displayWidth } = useWindowDimensions();
  const logoImageAnimation = useSharedValue(0);
  const titleAnimation = useSharedValue(displayWidth * 0.95);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoImageAnimation.value
    }
  });

  const TitleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: titleAnimation.value
        }
      ]
    }
  })

  useEffect(() => {
    if (animation) {
      logoImageAnimation.value = withTiming(1, { duration: 4000 });
      titleAnimation.value = withTiming(0, { duration: 2000 });
    }
  }, [animation]);

  return (
    <Container>
      <Animated.View
        style={logoStyle}
      >
        <Logo
          resizeMethod='resize'
          resizeMode='contain'
          source={LogoImage}
        />
      </Animated.View>
      <Animated.View style={[TitleStyle]}>
        <TitleHeader>Programa A hora do Anjo{'\n'}De segunda à sexta de 18h às 19h</TitleHeader>
      </Animated.View>
    </Container>
  );
}