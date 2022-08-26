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
    const date = data.date_post.split(' ');
    setNewDate(date[0]);
    setNewHour(date[1]);
  }, []);

  return (
    <Container>
      <Title>{data.title}</Title>
      <Cover
        source={{ uri: data.cover }}
        resizeMethod='resize'
        resizeMode='stretch'
      />
      <ContainerUser>
        <User>Por: {data.user}</User>
      </ContainerUser>
      <Preview>{data.preview}</Preview>
      <Separator />
      <Date>publicado em: {newDate} às {newHour}</Date>
    </Container>
  );
}