import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { Loading } from '@components/Loading';
import { Cover } from './styles';

type PostImageProps = {
  path: string;
  height: number;
}

export function PostImage({ path, height }: PostImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {
        loading &&
        <Loading
        style={{
          position: 'absolute',
          top: height / 2,
          elevation: 999,
          zIndex: 999
        }}
          size={32}
        />
      }
      <Cover
        source={{ uri: path }}
        resizeMode={FastImage.resizeMode.contain}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
}