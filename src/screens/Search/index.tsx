import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform, 
  TouchableWithoutFeedback
} from 'react-native';

import { useTheme } from 'styled-components';
import { api } from '../../services/api';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InputMessage } from '../../components/InputMessage';
import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { PostProps } from '../Home';
import {
  Container,
  ContainerForm, 
  ContainerWarning, 
  SearchButton, 
  TextWarning
} from './styles';
import { useInfiniteQuery } from '@tanstack/react-query';

const { KEY } = process.env;

interface DataForm {
  search: string;
}

export function Search() {
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostProps[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const size = 2;

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(['searchPost'],
    async ({pageParam = 1}) => {
      if(!!search){
        const {data} = await api.get(`search?search=${search}&page=${pageParam}&size=${size}&key=${KEY}`);
        return {...data, pageParam}
      }else{
        return [];
      }
    },
    {
      getNextPageParam: (pages) => {
        
      }
    }
  );

  const theme = useTheme();
  
  const schema = Yup.object().shape({
    search: Yup
      .string()
      .trim()
      .min(5, 'A busca precisa ter mais que 4 caracteres!')
      .required('O campo de busca não pode ser vazio!')
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleSearch(form: Partial<DataForm>) {
    // setIsSearch(true);
    // const formPage = page > 1 ? 1 : page;
    // setIsEmpty(false);
    // setPage(formPage);
    setSearch(form.search);
    // getPosts(form.search, formPage);
    // setIsSearch(false);
  }

  async function getPosts(search: string, setPage: number) {
    try {
      Keyboard.dismiss();
      setLoading(true);
      const { data } = await api.get(`search?search=${search}&page=${setPage}&size=${size}&key=${KEY}`);

      if (!data.error) {
        if (setPage > 1) {
          setPost(oldValue => [...oldValue, ...data.data]);
        } else {
          if (data.data.length === 0) setIsEmpty(true);
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

  if (status === 'loading') {
    return (
      <Container>
        <Load size={50} />
      </Container>
    )
  }

  console.log(data);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContainerForm>
            <InputMessage
              placeholder='Busca'
              label='Faça sua busca'
              control={control}
              name='search'
              error={errors.search && errors.search.message as string}
            >
              <SearchButton
                disabled={isSearch}
                onPress={handleSubmit(handleSearch)}
              >
                <MaterialCommunityIcons name='magnify' size={28} color={theme.colors.light} />
              </SearchButton>
            </InputMessage>
          </ContainerForm>
          <FlatList
            data={post}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <PostList data={item} />
              )
            }}
            onEndReached={() => {
              if (page < totalPage) {
                if (!loading) {
                  const pageUpdate = page + 1;
                  setPage(pageUpdate);
                  // getPosts(searchValue, pageUpdate);
                }
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loading ?
                <Load size={32} />
                : <></>
            }
            ListEmptyComponent={
              isEmpty &&
              <ContainerWarning>
                <TextWarning>
                  Nenhuma publicação corresponde a pesquisa,
                  verifique a ortografia ou tente uma combinação
                  diferente de palavras!
                </TextWarning>
              </ContainerWarning>
            }
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}