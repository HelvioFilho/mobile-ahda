import React from 'react';
import LogoImage from '../../assets/angel-white.png';

import { Container, Logo, TitleHeader } from './styles';

export function Header() {

  return (
    <Container>
      <Logo
        resizeMethod='resize'
        resizeMode='contain'
        source={LogoImage}
      />
      <TitleHeader>Programa A hora do Anjo{'\n'}De segunda à sexta de 18h às 19h</TitleHeader>
    </Container>
  );
}