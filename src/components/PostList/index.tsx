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

type PostListProps = {
  data: PostProps;
}

export function PostList({ data }: PostListProps) {
  const date = data.date_post.split(' ');

  return (
    <Container
      activeOpacity={0.9}
      onPress={() => { }}
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