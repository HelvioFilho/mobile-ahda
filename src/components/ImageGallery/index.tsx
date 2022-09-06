import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import { Container, ImageIndex, ImageWrapper, PostImage } from './styles';

interface ImageGalleryProps {
  images: {
    id: string;
    path: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageGallery({images}: ImageGalleryProps){
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <FlatList 
        data={images}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ImageWrapper>
            <PostImage
              source={{ uri: item.path}}
              resizeMode="contain"
            />
          </ImageWrapper>
        )}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
      <ImageIndex>
        {
          images.map((_, index) => (
            <Bullet 
              key={String(index)}
              active={index === imageIndex}
            />
          ))
        }
      </ImageIndex>
    </Container>
  );
}