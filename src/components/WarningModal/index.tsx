import React from 'react';
import { useTheme } from 'styled-components';

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
  closeModal: () => void;
}

export function WarningModal(
  {
    title,
    message,
    height = 200,
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
            name="md-close-circle-outline"
            size={30}
            color={theme.colors.dark}
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
          >
            <Title>Fechar</Title>
          </Button>
        </Footer>
      </ContainerModal>

    </Container>
  );
}