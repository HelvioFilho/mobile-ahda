import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { api } from '../../services/api';

import { Container, ContainerWarn, TextWarn } from './styles';

const { KEY } = process.env;

export interface postProps {
  id: string;
  title: string;
  preview: string;
  date_post: string;
  user: string;
  cover: string;
}

export function Home() {
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<postProps[]>([]);
  const size = 4;

  async function getPosts() {
    try {
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
      setLoading(false);
    }
  }

  async function getTotalPages() {
    try {
      const { data } = await api.get(`count_post`);
      setTotalPage(data.total_post);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      {
        loading ?
          <Load size={32} /> :
          post.length > 0 ?
            <FlatList
              data={post}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <PostList data={item} />
                )
              }}
            />
            :
            <ContainerWarn>
              <TextWarn>Ainda não há publicações.</TextWarn>
            </ContainerWarn>
      }
    </Container>
  );
}