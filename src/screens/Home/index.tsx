import React, { useState } from 'react';
import { FlatList, Modal, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components';
import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { api } from '../../services/api';

import { useInfiniteQuery } from '@tanstack/react-query';
import { BibleModal } from '../../components/BibleModal';
import { Header } from '../../components/Header';
import { Container, ContainerWarn, PageWarn, TextWarn } from './styles';

const { KEY } = process.env;

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
}[];

export function Home() {
  const size = 2;
  const [visibleWarn, setVisibleWarn] = useState(false);
  const [visible, setVisible] = useState(true);

  const theme = useTheme();

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(['getPost'],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get(`get_post?page=${pageParam}&size=${size}&key=${KEY}`);
      return { ...data, pageParam };
    },
    {
      getNextPageParam: (pages) => {
        if (pages.pageParam < pages.count) {
          return pages.pageParam + 1;
        } else {
          return undefined;
        }
      }
    }
  );

  if (status === 'loading') {
    return (
      <Container>
        <Load size={50} />
      </Container>
    )
  }

  return (
    <Container>
      <FlatList
        data={data.pages.flatMap(data => data.data as PostProps)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <PostList data={item} />
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => { }}
            tintColor={theme.colors.tabBarColor.active}
            colors={[theme.colors.tabBarColor.active]}
          />
        }
        onEndReached={() => {
          fetchNextPage();
          if (!hasNextPage) {
            if (!visibleWarn) {
              setVisibleWarn(true)
            }
          }else{
            setVisibleWarn(false);
          }
        }}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <Header />
        }
        ListEmptyComponent={
          <ContainerWarn>
            <TextWarn>Ainda não há publicações.</TextWarn>
          </ContainerWarn>
        }
        ListFooterComponent={
          isFetchingNextPage ?
            <Load size={32} />
            :
            !hasNextPage && visibleWarn &&
            <PageWarn>Não há mais publicações a serem exibidas!</PageWarn>
        }
      />
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <BibleModal
          closeModal={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </Container>
  );
}