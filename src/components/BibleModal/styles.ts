import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundModal};
`;

export const ContainerModal = styled.View`
  width: 90%;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 20px;
  padding-bottom: 20px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;

export const Close = styled.TouchableOpacity`
  padding-right: 8px;
`;

export const IconX = styled(Ionicons)``;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  align-self: flex-end;
`;

export const Separator = styled.View`
  width: 70%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.dark};
  margin: 14px 0;
`;

export const Book = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  align-self: flex-start;
  margin-left: 30px;
  padding: 10px 0;
`;

export const Content = styled.View`
  width: 100%;
  padding: 10px 30px;
`;

export const Number = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: justify;
`;