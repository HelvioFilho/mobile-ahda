import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { PostProps } from '../../screens/Home';
import { appDataStore } from '../../services/store';

import {
  Container,
  ContainerUser,
  Cover,
  Date,
  Preview,
  Separator,
  Title,
  User,
  WithoutUser
} from './styles';

interface PostListProps {
  data: PostProps;
}

export function PostList({ data }: PostListProps) {
  const [newDate, setNewDate] = useState('');
  const [newHour, setNewHour] = useState('');

  const { setData } = appDataStore();
  const { navigate } = useNavigation();

  function handleSelectPost() {
    setData(data);
    navigate('Post');
  }

  useEffect(() => {
    const date = data.date_post.split(' ');
    setNewDate(date[0]);
    setNewHour(date[1]);
  }, []);

  return (
    <Container
      activeOpacity={0.9}
      onPress={handleSelectPost}
    >
      <Title>{data.title}</Title>
      <Cover
        source={{ uri: data.cover }}
        resizeMode='stretch'
      />
      {
        data.user.name ?
          <ContainerUser>
            <User numberOfLines={1} >Por: {data.user.name}</User>
          </ContainerUser>
          :
          <WithoutUser />
      }
      <Preview>{data.preview}</Preview>
      <Separator />
      <Date>publicado em: {newDate} às {newHour}</Date>
    </Container>
  );
}