import React, { useEffect, useState } from 'react';
import { FlatList, Modal, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components';
import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { api, bible } from '../../services/api';

import LogoImage from '../../assets/angel-white.png';
import { Container, ContainerWarn, Header, Logo, TextWarn, TitleHeader } from './styles';
import { BibleModal } from '../../components/BibleModal';

const { KEY } = process.env;
const { TOKEN_B } = process.env;

export interface PostProps {
  id: string;
  title: string;
  text: string;
  preview: string;
  user: {
    name: string;
    image: string;
    about: string;
  }
  cover: string;
  date_post: string;
}

interface UpdatePostProps {
  data: PostProps[];
  count: number;
  isUpdated: boolean;
}

interface DataBibleProps {
  book: string;
  chapter: number;
  number: number;
  text: string;
}

export function Home() {
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [startLoading, setStartLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostProps[]>([]);
  const [update, setUpdate] = useState<UpdatePostProps>({} as UpdatePostProps);
  const [dataBible, setDataBible] = useState<DataBibleProps>({} as DataBibleProps);
  const [visible, setVisible] = useState(true);
  const size = 4;

  const theme = useTheme();

  async function getBibleVerse() {
    try{
      const {data} = await bible.get('/verses/ra/random',{
        headers: {
          'Authorization': `Bearer ${TOKEN_B}`,
        }
      });
      setDataBible({
        book: data.book.name,
        chapter: data.chapter,
        number: data.number,
        text: data.text
      });
    }catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getBibleVerse();
  },[]);

  async function getPosts() {
    if (page <= totalPage && Object.keys(update).length === 0) {
      try {
        setLoading(true);
        const { data } = await api.get(`get_post?page=${page}&size=${size}&key=${KEY}`);

        if (!data.error) {
          if (page > 1) {
            setPost(oldValue => [...oldValue, ...data.data]);
          } else {
            setPost(data.data);
          }
          setTotalPage(data.count);
        } else {
          console.log(data.error);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setStartLoading(false);
        setLoading(false);
      }
    } else if (Object.keys(update).length > 0) {
      setPost(update.data);
      setTotalPage(update.count);
      setUpdate({} as UpdatePostProps);
    }
  }

  async function checkNewPosts() {
    try {
      const oldPost = post.length > 4 ? post.slice(0, 4) : post;
      const { data } = await api.get(`get_post?page=1&size=${size}&key=${KEY}`);

      if (JSON.stringify(oldPost) !== JSON.stringify(data.data)) {
        setUpdate(data);
        if (page === 1) {
          getPosts();
        } else {
          setPage(1);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <Container>
      {
        startLoading ?
          <Load size={50} /> :
          post.length > 0 ?
            <FlatList
              data={post}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <PostList data={item} />
                )
              }}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={checkNewPosts}
                  tintColor={theme.colors.tabBarColor.active}
                  colors={[theme.colors.tabBarColor.active]}
                />
              }
              onEndReached={() => {
                if (page < totalPage) {
                  if (!loading) {
                    setPage(oldValue => (oldValue + 1))
                  }
                }
              }}
              onEndReachedThreshold={0.1}
              ListHeaderComponent={
                <Header>
                  <Logo
                    resizeMethod='resize'
                    resizeMode='contain'
                    source={LogoImage}
                  />
                  <TitleHeader>Programa A hora do Anjo{'\n'}De segunda à sexta de 18h às 19h</TitleHeader>
                </Header>
              }
              ListFooterComponent={
                loading ?
                  <Load size={32} />
                  : <></>
              }
            />
            :
            <ContainerWarn>
              <TextWarn>Ainda não há publicações.</TextWarn>
            </ContainerWarn>
      }
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <BibleModal 
          data={dataBible}
          closeModal={() => setVisible(false)}
        />
      </Modal>
    </Container>
  );
}