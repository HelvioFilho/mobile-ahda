import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

interface PostImageProps {
  height: number;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageWrapper = styled.View<PostImageProps>`
  width: ${Dimensions.get('window').width}px;
  height: ${({ height }) => RFValue(height)}px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`;

export const PostImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const ImageIndex = styled.View`
  flex-direction: row;
  align-self: center;
`;