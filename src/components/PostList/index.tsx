import React from 'react';
import { Text, Image, View } from 'react-native';
import { postProps } from '../../screens/Home';

import { 
  Container,
  Cover,
  Title,
  Preview,
  User,
  Date,
  ContainerUser,
  Separator,
} from './styles';

interface PostListProps {
  data: postProps;
}

export function PostList({data}: PostListProps){
  const date = data.data.replace(' ', 'T');
  const newDate = Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new window.Date(date));
  const newHour = Intl.DateTimeFormat('pt-BR', { timeStyle:'short' }).format(new window.Date(date));

  return (
    <Container>
      <Title>{data.titulo}</Title>
      <Cover
        source={{uri: data.capa}}
        resizeMethod='resize'
        resizeMode='cover'
      />
        <ContainerUser>
          <User>Por: {data.user}</User>
        </ContainerUser>
        <Preview>{data.previa}</Preview>
        <Separator />
        <Date>publicado em: {newDate} às {newHour}</Date>
    </Container>
  );
}