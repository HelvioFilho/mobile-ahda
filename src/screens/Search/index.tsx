import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Load } from '../../components/Load';
import { PostList } from '../../components/PostList';
import { MagnifyingGlass } from 'phosphor-react-native';
import { Formik } from 'formik';
import { PostProps } from '../Home';

import { InputField } from '../../components/InputField';
import { api } from '../../services/api';
import { Container, ContainerForm, SearchButton } from './styles';

const { KEY } = process.env;

export function Search() {
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostProps[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const size = 2;
  const values = {
    search: ''
  }

  const theme = useTheme();

  const schema = Yup.object().shape({
    search: Yup
      .string()
      .trim()
      .min(5, 'A busca precisa ter mais que 4 caracteres!')
      .required('O campo de busca não pode ser vazio!')
  });

  async function getPosts(search: string, setPage: number) {
    try {
      setLoading(true);
      const { data } = await api.get(`search?search=${search}&page=${setPage}&size=${size}&key=${KEY}`);

      if (!data.error) {
        if (setPage > 1) {
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Formik
            initialValues={values}
            validationSchema={schema}
            onSubmit={
              (values, formikActions) => {
                const formPage = page > 1 ? 1 : page;
                setPage(formPage);
                setSearchValue(values.search);
                getPosts(values.search, formPage);
                formikActions.setSubmitting(false);
              }
            }
          >
            {
              (
                {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }: any) => {
                const { search } = values;
                return (
                  <ContainerForm>
                    <InputField
                      placeholder='Busca'
                      label='Faça sua busca'
                      onChangeText={handleChange('search')}
                      onBlur={handleBlur('search')}
                      error={touched.search && errors.search}
                      value={search}

                    >
                      <SearchButton
                        disabled={isSubmitting}
                        onPress={handleSubmit}
                      >
                        <MagnifyingGlass size={28} color={theme.colors.light} />
                      </SearchButton>
                    </InputField>
                  </ContainerForm>
                )
              }
            }
          </Formik>
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
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}