import { useNavigation } from '@react-navigation/native';
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
import { PostProps } from '@screens/Home';
import { appDataStore } from '@services/store';

type PostListProps = {
  data: PostProps;
}

export function PostList({ data }: PostListProps) {
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
      <Cover
        source={{ uri: data.cover }}
        resizeMode='stretch'
      />
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