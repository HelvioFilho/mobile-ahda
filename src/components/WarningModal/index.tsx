import { useTheme } from "styled-components/native";
import {
  Button,
  Close,
  Container,
  ContainerModal,
  Footer,
  IconX,
  Message,
  Title,
  TitleAlert
} from "./styles";

type WarningModalProps = {
  title?: string;
  message: string;
  height?: number;
  colorButton: string;
  closeModal: () => void;
}

export function WarningModal({
  title = 'Aviso',
  message,
  height = 200,
  colorButton,
  closeModal
}: WarningModalProps) {
  const { colors } = useTheme();

  return (
    <Container>
      <ContainerModal height={height}>
        <Close onPress={closeModal}>
          <IconX
            name='md-close-circle'
            size={30}
            color={colors.error}
          />
        </Close>
        {
          title && <TitleAlert>{title}</TitleAlert>
        }
        <Message>{message}</Message>
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