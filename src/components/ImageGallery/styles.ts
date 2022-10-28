import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndex = styled.View`
  flex-direction: row;
  align-self: center;
  margin-top: 15px;
`;

export const ImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(380)}px;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;

export const PostImage = styled(FastImage)`
  width: 100%;
  height: ${RFValue(380)}px;
`;