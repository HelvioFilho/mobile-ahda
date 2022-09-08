import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
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