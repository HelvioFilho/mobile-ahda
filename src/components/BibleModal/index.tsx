import { View } from "react-native";
import { appDataStore } from "@services/store";
import { useTheme } from "styled-components/native";
import {
  Book,
  Close,
  Container,
  ContainerModal,
  Content,
  Header,
  IconX,
  Number,
  Separator,
  Text,
  Title
} from "./styles";

type BibleModalProps = {
  closeModal: () => void;
}

export function BibleModal({ closeModal }: BibleModalProps) {
  const { bible } = appDataStore();
  const { colors } = useTheme();

  return (
    <Container>
      <ContainerModal>
        <Header>
          <View />
          <Title>Versículo do dia</Title>
          <Close
            activeOpacity={0.8}
            onPress={closeModal}
          >
            <IconX
              name='md-close-circle'
              size={30}
              color={colors.error}
            />
          </Close>
        </Header>
        <Separator />
        <Book>{`Livro: ${bible.book}`}</Book>
        <Content>
          <Text><Number>{`${bible.chapter}:${bible.number} - `}</Number>{bible.text}</Text>
        </Content>
      </ContainerModal>
    </Container>
  );
}