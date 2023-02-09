import { useState } from 'react';
import { FlatList, Modal, RefreshControl } from 'react-native';
import { Container, ContainerWarn, PageWarn, TextWarn } from './styles';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@services/api';
import { useTheme } from 'styled-components/native';

import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { PostList } from '@components/PostList';
import { BibleModal } from '@components/BibleModal';

const { KEY } = process.env;

export type PostProps = {
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
};

export function Home() {
  const size = 2;
  const [visibleWarning, setVisibleWarning] = useState(false);
  const [visible, setVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { colors } = useTheme();

  const getPosts = async ({ pageParam = 1 }) => {
    const { data } = await api.get(`get_post?page=${pageParam}&size=${size}&key=${KEY}`);
    return { ...data, pageParam };
  }

  const { data, status, refetch, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(['getPost'], getPosts, {
    getNextPageParam: (pages) => {
      if (pages.pageParam < pages.count) {
        return pages.pageParam + 1;
      } else {
        return undefined;
      }
    }
  });

  if (status === 'loading') {
    return (
      <Container>
        <Loading size={50} />
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={data?.pages.flatMap(data => data.data as PostProps)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <PostList data={item} />
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await refetch();
              setRefreshing(false);
            }}
            tintColor={colors.tabBarColor.active}
            colors={[colors.tabBarColor.active]}
          />
        }
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          await fetchNextPage();
          if (!hasNextPage) {
            if (!visibleWarning) {
              setVisibleWarning(true);
            }
          } else {
            setVisibleWarning(false);
          }
        }}
        ListHeaderComponent={
          <Header />
        }
        ListEmptyComponent={
          <ContainerWarn>
            <TextWarn>Ainda não há publicações.</TextWarn>
          </ContainerWarn>
        }
        ListFooterComponent={
          isFetchingNextPage
            ?
            <Loading size={32} />
            :
            !hasNextPage && visibleWarning ?
              <PageWarn>Não há mais publicações a serem exibidas!</PageWarn>
              : <></>
        }
        showsVerticalScrollIndicator={false}
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