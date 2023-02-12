import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type PostImageProps = {
  height: number;
  width: number;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageWrapper = styled.View<PostImageProps>`
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  ${({ height, width }) => css`
    width: ${width}px;
    height: ${RFValue(height)}px;
  `}
`;

export const ImageIndex = styled.View`
  flex-direction: row;
  align-self: center;
`;