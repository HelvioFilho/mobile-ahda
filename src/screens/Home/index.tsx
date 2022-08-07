import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { api } from '../../services/api';

import { Container } from './styles';

export interface postProps {
  id: string;
  titulo: string;
  previa: string;
  data: string;
  user: string;
  capa: string;
}

export function Home() {
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<postProps[]>([]);
  const size = 4;

  async function getNotice() {
    try {
      const { data } = await api.get(`get_post?page=${page}&size${size}`);
      if (page > 1) {
        setPost(oldValue => [...oldValue, ...data]);
      } else {
        setPost(data);
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
    getNotice();
  }, []);

  return (
    <Container>
      {
        loading ?
          <Load size={32} /> :
          <FlatList
            data={post}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <PostList data={item} />
              )
            }}
          />
      }
    </Container>
  );
}