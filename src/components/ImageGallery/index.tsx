import { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ViewToken, FlatList } from 'react-native';
import { Container, ImageIndex, ImageWrapper, PostImage } from './styles';
import { Bullet } from '@components/Bullet';

type ImageGalleryProps = {
  images: {
    id: string;
    path: string;
  }[];
}

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [value, setValue] = useState<number[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [checkHeight, setCheckHeight] = useState(false);

  const { width: displayWidth } = Dimensions.get('window');

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  async function checkMaxHeight() {
    try{
      await images.map(
        (item) => {
          Image.getSize(item.path, (width, height) => {
            setValue(oldValue => [...oldValue, ((displayWidth - 40) * height) / width]);
          });
        });
        if(value.length > 0){
          setMaxHeight(Math.max(...value));
        }else {
          setCheckHeight(!checkHeight);
        }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(maxHeight === 0){
      checkMaxHeight();
    }
  }, [value]);

  useEffect(() => {
    checkMaxHeight();
  }, []);

  return (
    <Container>
      <FlatList 
        data={images}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ImageWrapper
            height={maxHeight}
            width={displayWidth}
          >
            <PostImage 
              source={{ uri: item.path }}
              resizeMode='contain'
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