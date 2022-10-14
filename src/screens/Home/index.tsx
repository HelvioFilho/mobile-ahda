import React, { useEffect, useState } from 'react';
import { FlatList, Modal, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components';
import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { api, bible } from '../../services/api';

import { BibleModal } from '../../components/BibleModal';
import { Header } from '../../components/Header';
import { Container, ContainerWarn, TextWarn } from './styles';

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
  const [animated, setAnimated] = useState(false);
  const [post, setPost] = useState<PostProps[]>([]);
  const [update, setUpdate] = useState<UpdatePostProps>({} as UpdatePostProps);
  const [dataBible, setDataBible] = useState<DataBibleProps>({} as DataBibleProps);
  const [visible, setVisible] = useState(false);
  const size = 4;

  const theme = useTheme();

  async function getBibleVerse() {
    try {
      const { data } = await bible.get('/verses/ra/random', {
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
      setVisible(true);
    } catch (e) {
      console.log(e.message);
    }
  }

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

  useEffect(() => {
    getBibleVerse();
  }, []);

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
                <Header animation={animated} />
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
        onRequestClose={() => {
          setVisible(false);
          setAnimated(true);
        }}
      >
        <BibleModal
          data={dataBible}
          closeModal={() => {
            setVisible(false);
            setAnimated(true);
          }}
        />
      </Modal>
    </Container>
  );
}