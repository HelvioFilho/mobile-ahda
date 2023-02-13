import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import {
  About,
  AboutWrapper,
  Avatar,
  BackButton,
  Container,
  ContainerAvatar,
  ContainerGallery,
  ContainerRender,
  Cover,
  CoverWrapper,
  Footer,
  Name,
  Published,
  Title,
  TitleGallery
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';

import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { api } from '@services/api';
import { formattedText } from '@utils/formattedText';
import { getTagStyle } from '@utils/tagStyle';

import { ImageGallery } from '@components/ImageGallery';

import { appDataStore } from '@services/store';
import FastImage from 'react-native-fast-image';
import { Loading } from '@components/Loading';

const { KEY } = process.env;

type GalleryProps = {
  id: string;
  path: string;
}

export function Post() {
  const [imageGallery, setImageGallery] = useState<GalleryProps[]>([]);
  const [maxHeight, setMaxHeight] = useState(250);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const { width: displayWidth } = Dimensions.get('window');
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { post: data } = appDataStore();

  const date = data.date_post.split(' ');
  const day = date[0];
  const hour = date[1];

  const tagsStyles = getTagStyle;

  async function getText(text: string) {
    setText(formattedText(text));
  }

  async function getImageGallery(id: string) {
    try {
      const { data } = await api.get(`get_image_gallery?id=${id}&key=${KEY}`);
      if (!data.error) {
        setImageGallery(data.images);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMaxHeight() {
    await Image.getSize(data.cover, (width, height) => {
      setMaxHeight((displayWidth * height) / width);
    });
  }

  useEffect(() => {
    getImageGallery(data.id);
    getText(data.text);
    getMaxHeight();
  }, [data]);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.light }}>
        <CoverWrapper
          width={displayWidth}
          height={maxHeight}
        >
          {
            loading &&
            <Loading
              style={{
                position: 'absolute',
                top: maxHeight / 2.8,
                elevation: 999,
                zIndex: 999
              }}
              size={32}
            />
          }
          <Cover
            source={{ uri: data.cover }}
            resizeMode={FastImage.resizeMode.stretch}
            onLoadEnd={() => setLoading(false)}
          />
        </CoverWrapper>
        <Container>
          <Title>{data.title}</Title>
          <ContainerRender>
            <RenderHTML
              contentWidth={displayWidth}
              source={{ html: text }}
              tagsStyles={tagsStyles}
            />
          </ContainerRender>
          {
            imageGallery.length > 0 &&
            <ContainerGallery>
              <TitleGallery>Galeria de Imagens</TitleGallery>
              <ImageGallery
                images={imageGallery}
              />
            </ContainerGallery>
          }
          <Published>{`publicado em: ${day} às ${hour}`}</Published>
          {
            data.user.name &&
            <Footer>
              <ContainerAvatar>
                <Avatar
                  source={{ uri: data.user.image }}
                />
                <Name>{data.user.name}</Name>
              </ContainerAvatar>
              {
                !!data.user.about &&
                <AboutWrapper>
                  <About>{data.user.about}</About>
                </AboutWrapper>
              }
            </Footer>
          }
        </Container>
      </ScrollView>
      <BackButton
        activeOpacity={0.8}
        onPress={goBack}
      >
        <MaterialIcons
          name='keyboard-arrow-left'
          size={20}
          color={colors.light}
        />
      </BackButton>
    </>
  );
}