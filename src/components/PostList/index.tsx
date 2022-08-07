import React, { useEffect, useState } from 'react';
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

export function PostList({ data }: PostListProps) {
  const [newDate, setNewDate] = useState('');
  const [newHour, setNewHour] = useState('');

  useEffect(() => {
    const date = data.data.replace(' ', 'T');
    setNewDate(Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new window.Date(date)));
    setNewHour(Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(new window.Date(date)));
  }, []);

  return (
    <Container>
      <Title>{data.titulo}</Title>
      <Cover
        source={{ uri: data.capa }}
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