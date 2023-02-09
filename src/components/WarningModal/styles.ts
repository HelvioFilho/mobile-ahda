import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

type ContainerProps = {
  height: number;
}

type ButtonProps = {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundModal};
`;

export const ContainerModal = styled.View<ContainerProps>`
  width: 90%;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  padding: 15px;
  ${({ height, theme }) => css`
    height: ${height}px;
    background-color: ${theme.colors.light};
  `}
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
`;

export const IconX = styled(Ionicons)``;

export const TitleAlert = styled.Text`
  font-size: ${RFValue(20)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.dark};
  `}
`;

export const Message = styled.Text`
  width: 80%;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Footer = styled.View`
  width: 90%;
  height: 50px;
  padding: 20px 30px;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 90px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.light};
  `}
`;