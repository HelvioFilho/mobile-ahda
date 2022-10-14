import React, { useEffect, useState } from 'react';
import { PostProps } from '../../screens/Home';
import { appDataStore } from '../../services/store';
import { useNavigation } from '@react-navigation/native';

import {
  Container, ContainerUser, Cover, Date, Preview, Separator, Title, User
} from './styles';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';

interface PostListProps {
  data: PostProps;
  animation: boolean;
}

export function PostList({ data, animation }: PostListProps) {
  const [newDate, setNewDate] = useState('');
  const [newHour, setNewHour] = useState('');

  const { setData } = appDataStore();
  const { navigate } = useNavigation();

  const {width: displayWidth} = useWindowDimensions();
  const postOffset = useSharedValue(displayWidth * 1.20);

  const postStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: postOffset.value
        }
      ]
    }
  })

  function handleSelectPost() {
    setData(data);
    navigate('Post');
  }

  useEffect(() => {
    const date = data.date_post.split(' ');
    setNewDate(date[0]);
    setNewHour(date[1]);
  }, []);

  useEffect(() => {
    if(animation){
      postOffset.value = withTiming(0, {duration: 1500});
    }
  },[animation]);

  return (
    <Animated.View style={[postStyle]}>
      <Container
        activeOpacity={0.9}
        onPress={handleSelectPost}
      >
        <Title>{data.title}</Title>
        <Cover
          source={{ uri: data.cover }}
          resizeMethod='resize'
          resizeMode='stretch'
        />
        <ContainerUser>
          <User numberOfLines={1} >Por: {data.user.name}</User>
        </ContainerUser>
        <Preview>{data.preview}</Preview>
        <Separator />
        <Date>publicado em: {newDate} às {newHour}</Date>
      </Container>
    </Animated.View>
  );
}