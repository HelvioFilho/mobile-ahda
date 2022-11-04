import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, useWindowDimensions
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { useTheme } from 'styled-components';
import { api } from '../../services/api';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { PostProps } from '../Home';
import {
  Container,
  ContainerForm,
  SearchButton,
  ContainerWarning,
  TextWarning
} from './styles';
import { InputMessage } from '../../components/InputMessage';

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
  const [searchValue, setSearchValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [animation, setAnimation] = useState(true);

  const size = 2;

  const theme = useTheme();
  const { width: displayWidth } = useWindowDimensions();

  const InputSearchAnimation = useSharedValue(displayWidth * 1);
  const IconAnimation = useSharedValue(0);

  const InputSearchStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: InputSearchAnimation.value
        }
      ]
    }
  });

  const IconStyle = useAnimatedStyle(() => {
    return {
      opacity: IconAnimation.value
    }
  });

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
    setIsSearch(true);
    const formPage = page > 1 ? 1 : page;
    setIsEmpty(false);
    setPage(formPage);
    setSearchValue(form.search);
    getPosts(form.search, formPage);
    setIsSearch(false);
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
        setAnimated(true);
      } else {
        console.log(data.error);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setAnimated(false);
    }
  }

  useEffect(() => {
    if (animation) {
      InputSearchAnimation.value = withTiming(0,
        { duration: 2000 },
        () => {
          IconAnimation.value = withTiming(1, { duration: 2000 });
        }
      );
      setAnimation(false);
    }
  }, [animation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContainerForm>
            <Animated.View style={InputSearchStyle}>
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
                  <Animated.View style={IconStyle}>
                    <MaterialCommunityIcons name='magnify' size={28} color={theme.colors.light} />
                  </Animated.View>
                </SearchButton>
              </InputMessage>
            </Animated.View>
          </ContainerForm>
          <FlatList
            data={post}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <PostList data={item} animation={animated} />
              )
            }}
            onEndReached={() => {
              if (page < totalPage) {
                if (!loading) {
                  const pageUpdate = page + 1;
                  setPage(pageUpdate);
                  getPosts(searchValue, pageUpdate);
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