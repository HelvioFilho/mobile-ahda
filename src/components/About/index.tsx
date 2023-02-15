
import { useTheme } from 'styled-components/native';
import * as Linking from 'expo-linking';
import {
  Body,
  Close,
  Container,
  ContainerModal,
  Content,
  IconX,
  Label,
  Site,
  TextSite,
  Title,
  Wrapper
} from './styles';

type AboutProps = {
  closeModal: () => void;
}

export function About({ closeModal }: AboutProps) {
  const { colors } = useTheme();

  return (
    <Container>
      <ContainerModal>
        <Close onPress={closeModal}>
          <IconX
            name='md-close-circle'
            size={30}
            color={colors.error}
          />
        </Close>
        <Body>
          <Title>A Hora do Anjo</Title>
          <Wrapper>
            <Content>
              Aplicativo desenvolvido para o programa
              de rádio A Hora do Anjo {'\n'}
              © todos os direitos reservados
            </Content>
          </Wrapper>
          <Wrapper>
            <Label>Versão:</Label>
            <Content>1.1.0</Content>
          </Wrapper>
          <Wrapper>
            <Label>Desenvolvido por:</Label>
            <Content>Hélvio Filho</Content>
          </Wrapper>
          <Site
            onPress={() => Linking.openURL('https://www.hsvf.com.br')}
            activeOpacity={0.8}
          >
            <TextSite>www.hsvf.com.br</TextSite>
          </Site>
        </Body>
      </ContainerModal>
    </Container>
  )
}