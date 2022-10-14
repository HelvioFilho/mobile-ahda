import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-color: rgba(0,0,0,0.3);
  padding-top: 20px;
  padding-bottom: 15px;
  margin-bottom: 5px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 200px;
`; 

export const TitleHeader = styled.Text`
  text-align: center;
  font-family: ${({ theme}) => theme.fonts.Bold};
  font-size: ${RFValue(16)}px;
`;