import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-color: rgba(0,0,0,0.3);
  padding-bottom: 15px;
  margin-bottom: 5px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 200px;
`; 

export const TitleHeader = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export const List = styled(FlatList)``;

export const ContainerWarn = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TextWarn = styled.Text`
  font-size: ${RFValue(18)}px;

`;