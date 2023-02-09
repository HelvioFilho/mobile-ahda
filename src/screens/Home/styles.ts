import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const List = styled(FlatList)``;

export const ContainerWarn = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const TextWarn = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PageWarn = styled.Text`
  align-self: center;
  padding: 5px 0px 50px 0px;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;