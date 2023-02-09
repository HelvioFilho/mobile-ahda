import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: ${RFValue(30)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
`;

export const ContainerForm = styled.View`
  padding: 0 25px;
  margin-top: 20px;
`;

export const SaveButton = styled.TouchableOpacity`
  position: relative;
  width: 50px;
  height: 50px;
  top: 0;
  left: 20px;
  justify-content: center;
  align-items: center;
  border-left-width: 4px;
  ${({ theme }) => css`
    border-left-color: ${theme.colors.background};
    background-color: ${theme.colors.success};
  `}
`;

export const SwitchWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const TextSwitch = styled.Text`
  width: 80%;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ContainerFooter = styled.View`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 55px;
  justify-content: center;
  align-items: center;
`;

export const ButtonAbout = styled.TouchableOpacity`
  padding: 10px 25px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.success};
`;

export const TextAbout = styled.Text`
  font-size: ${RFValue(16)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.light};
  `}
`;