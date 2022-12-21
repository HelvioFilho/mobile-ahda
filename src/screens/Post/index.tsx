import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions, Image, ScrollView, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { ImageGallery } from '../../components/ImageGallery';
import { api } from '../../services/api';

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
import { PostProps } from '../Home';

const { KEY } = process.env;

interface GalleryProps {
  id: string;
  path: string;
}

interface RouteParams {
  data: PostProps
}

export function Post() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { data } = params as RouteParams;

  const date = data.date_post.split(' ');
  const day = date[0];
  const hour = date[1];

  let text = data.text.replace(/class="ql-align-center"/g, `style="text-align: center"`);
  text = text.replace(/class="ql-align-right"/g, `style="text-align: right"`);
  text = text.replace(/class="ql-align-justify"/g, `style="text-align: justify"`);
  text = text.replace(/class="ql-size-small"/g, `style="font-size: 0.75rem"`);
  text = text.replace(/class="ql-size-large"/g, `style="font-size: 1.5rem"`);
  text = text.replace(/<p><img>/g, `<img`);
  text = text.replace(/"><\/p>/g, `">`);
  text = text.replace(/<p><br><\/p>/g, `<p style="margin: 15px 0"></p>`);

  const tagsStyles = {
    h1: {
      margin: '5px 20px',
    },
    h2: {
      margin: '0 20px',
    },
    h3: {
      margin: '5px 20px',
    },
    h4: {
      margin: '5px 20px',
    },
    h5: {
      margin: '5px 20px',
    },
    h6: {
      margin: '5px 20px',
    },
    img: {
      margin: '0',
    },
    strong: {
      margin: '0',
    },
    p: {
      margin: '0 20px',
      fontSize: `${RFValue(15)}px`
    },
    ul: {
      margin: '10px 20px',
      fontSize: `${RFValue(15)}px`
    },
    ol: {
      margin: '10px 20px',
      fontSize: `${RFValue(15)}px`
    }
  };

  const [imageGallery, setImageGallery] = useState<GalleryProps[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);

  const { width: displayWidth } = Dimensions.get('window');

  async function getImageGallery(id: string) {
    try {
      const { data } = await api.get(`get_image_gallery?id=${id}&key=${KEY}`);
      if (!data.error) {
        setImageGallery(data.images);
      } else {
        console.log(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getMaxHeight() {
    await Image.getSize(data.cover, (width, height) => {
      setMaxHeight((displayWidth * height) / width)
    });
  }

  useEffect(() => {
    getImageGallery(data.id);
    getMaxHeight();
  }, []);

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.light }}
      >
        <CoverWrapper>
          <Cover
            height={maxHeight}
            source={{ uri: data.cover }}
            resizeMode='stretch'
          />
        </CoverWrapper>
        <Container>
          <Title>{data.title}</Title>
          <ContainerRender>
            <RenderHTML
              contentWidth={width}
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
          color={theme.colors.light}
        />
      </BackButton>
    </>
  );
}