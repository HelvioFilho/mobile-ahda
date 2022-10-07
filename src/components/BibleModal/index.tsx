import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components';

import { Book, Close, Container, ContainerModal, Content, Header, IconX, Number, Separator, Text, Title } from './styles';

interface DataBibleProps {
  book: string;
  chapter: number;
  number: number;
  text: string;
}

interface BibleModalProps {
  data: DataBibleProps;
  closeModal: () => void;
}

export function BibleModal({data, closeModal}: BibleModalProps){
  const theme = useTheme();
  
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
            name="md-close-circle"
            size={30}
            color={theme.colors.error} 
          />
        </Close>
        </Header>
        <Separator />
        <Book>{`Livro: ${data.book}`}</Book>
        <Content>
          <Text><Number>{`${data.chapter}:${data.number} - `}</Number>{data.text}</Text>
        </Content>
      </ContainerModal>
    </Container>
  );
}