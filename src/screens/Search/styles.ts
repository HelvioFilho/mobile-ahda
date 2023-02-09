import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContainerForm = styled.View`
  margin-top: 20px;
  padding: 0 25px;
`;

export const SearchButton = styled.TouchableOpacity`
  position: relative;
  top: 0;
  left: 20px;
  padding: 11px;
  height: 50px;
  border-left-width: 4px;
  border-left-color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.success};
`;

export const ContainerWarning = styled.View`
  padding: 20px 25px;
`;

export const TextWarning = styled.Text`
  font-size: ${RFValue(16)}px;
`;