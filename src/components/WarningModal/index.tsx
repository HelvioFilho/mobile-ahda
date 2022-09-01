import React from 'react';
import { useTheme } from 'styled-components';
import theme from '../../global/styles/theme';

import { 
  Container, 
  ContainerModal,
  Close,
  IconX,
  TitleAlert,
  Message,
  Footer,
  Button,
  Title
} from './styles';

interface WarningModalProps {
  title?: string;
  message: string;
  height?: number;
  colorButton: string;
  closeModal: () => void;
}

export function WarningModal(
  {
    title,
    message,
    height = 200,
    colorButton,
    closeModal
  }: WarningModalProps) {
  
  const theme = useTheme();

  return (
    <Container>
      <ContainerModal height={height}>
        <Close
          onPress={closeModal}
        >
          <IconX 
            name="md-close-circle"
            size={30}
            color={theme.colors.error}
          />
        </Close>
        {
          title &&
          <TitleAlert>
            {title}
          </TitleAlert>
        }
        <Message>
          {message}
        </Message>
        <Footer>
          <Button 
            onPress={closeModal}
            color={colorButton}
          >
            <Title>Fechar</Title>
          </Button>
        </Footer>
      </ContainerModal>
    </Container>
  );
}