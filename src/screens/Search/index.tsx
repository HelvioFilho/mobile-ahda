
import { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { api } from '@services/api';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Container,
  ContainerForm,
  ContainerWarning,
  SearchButton,
  TextWarning
} from './styles';

import { InputMessage } from '@components/InputMessage';
import { Loading } from '@components/Loading';
import { PostProps } from '@screens/Home';
import { PostList } from '@components/PostList';

const { KEY } = process.env;

type DataForm = {
  search: string;
}

export function Search() {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');

  const size = 2;

  const searchPost = async ({ pageParam = 1 }) => {
    const { data } = await api.get(`search?search=${search}&page=${pageParam}&size=${size}&key=${KEY}`);
    setIsSearch(false);
    return { ...data, pageParam }
  };

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(['searchPost', search], searchPost, {
    getNextPageParam: (pages) => {
      if (pages.pageParam < pages.count) {
        return pages.pageParam + 1;
      } else {
        return undefined;
      }
    }
  });

  const { colors } = useTheme();

  const schema = Yup.object().shape({
    search: Yup
      .string()
      .trim()
      .min(5, 'A busca precisa ter mais que 4 caracteres!')
      .required('O campo de busca não pode ser vazio!'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleSearch(form: Partial<DataForm>) {
    setIsSearch(true);
    setSearch(form.search as string);
    reset();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContainerForm>
            <InputMessage
              placeholder='Coloque sua busca aqui...'
              placeholderTextColor={colors.text_light}
              label='Faça sua busca'
              control={control}
              name='search'
              error={errors.search && errors.search.message as string}
            >
              <SearchButton
                disabled={isSearch}
                onPress={handleSubmit(handleSearch)}
              >
                <MaterialCommunityIcons
                  name='magnify'
                  size={28}
                  color={colors.light}
                />
              </SearchButton>
            </InputMessage>
          </ContainerForm>
          {
            status === 'loading' ?
              search !== 'initialSearch' &&
              <Container>
                <Loading size={50} />
              </Container>
              :
              <FlatList
                data={data?.pages.flatMap(page => page.data as PostProps)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <PostList data={item} />
                )}
                onEndReachedThreshold={0.1}
                onEndReached={() => fetchNextPage()}
                ListFooterComponent={
                  isFetchingNextPage ?
                    <Loading size={32} /> :
                    <></>
                }
                ListEmptyComponent={
                  <ContainerWarning>
                    {
                      search !== '' &&
                      <TextWarning>
                        Nenhuma publicação corresponde a pesquisa,
                        verifique a ortografia e tente uma combinação
                        diferente de palavras!
                      </TextWarning>
                    }
                  </ContainerWarning>
                }
              />
          }
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}