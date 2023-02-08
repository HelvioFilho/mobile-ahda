import { Container, Logo, TitleHeader } from './styles';
import LogoImage from '@assets/angel-white.png';

export function Header(){
  return (
    <Container>
      <Logo 
        resizeMode='contain'
        source={LogoImage}
      />
      <TitleHeader>Programa A hora do Anjo{'\n'}De segunda à sexta de 18h às 19h</TitleHeader>
    </Container>
  );
}