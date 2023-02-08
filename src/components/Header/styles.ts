import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
  padding-top: 20px;
  padding-bottom: 15px;
  margin-bottom: 5px;
`;

export const Logo = styled(FastImage)`
  width: 100%;
  height: 200px;
`;

export const TitleHeader = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
`;