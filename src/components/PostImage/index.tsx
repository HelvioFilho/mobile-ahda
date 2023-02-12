import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { Loading } from '@components/Loading';
import { Cover } from './styles';

type PostImageProps = {
  path: string;
}

export function PostImage({ path }: PostImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading size={32} />}
      <Cover
        source={{ uri: path }}
        resizeMode={FastImage.resizeMode.contain}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
}