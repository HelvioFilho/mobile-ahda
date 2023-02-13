import { useNavigation } from '@react-navigation/native';
import {
  Container,
  ContainerUser,
  Cover,
  CoverWrapper,
  Date,
  Preview,
  Separator,
  Title,
  User,
  WithoutUser
} from './styles';
import FastImage from 'react-native-fast-image';
import { PostProps } from '@screens/Home';
import { appDataStore } from '@services/store';
import { useState } from 'react';
import { Loading } from '@components/Loading';

type PostListProps = {
  data: PostProps;
}

export function PostList({ data }: PostListProps) {
  const [loading, setLoading] = useState(true);
  const date = data.date_post.split(' ');
  const { navigate } = useNavigation();
  const { setPost } = appDataStore();

  function handleSetPost() {
    setPost(data);
    navigate('Post');
  }

  return (
    <Container
      activeOpacity={0.9}
      onPress={handleSetPost}
    >
      <Title>{data.title}</Title>
      <CoverWrapper>
        {
          loading &&
          <Loading
            style={{
              position: 'absolute',
              top: 250 / 2.5,
              elevation: 999,
              zIndex: 999
            }}
            size={32}
          />
        }
        <Cover
          source={{ uri: data.cover }}
          resizeMode={FastImage.resizeMode.stretch}
          onLoadEnd={() => setLoading(false)}
        />

      </CoverWrapper>
      {
        data.user.name
          ?
          <ContainerUser>
            <User numberOfLines={1}>Por: {data.user.name}</User>
          </ContainerUser>
          :
          <WithoutUser />
      }
      <Preview>{data.preview}</Preview>
      <Separator />
      <Date>publicado em: {date[0]} às {date[1]}</Date>
    </Container>
  );
}