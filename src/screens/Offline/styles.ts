import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Warning = styled.View`
  position: relative;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundModal};
`;

export const IconSignal = styled(MaterialIcons)`
  position: absolute;
  top: -90px;
  align-self: center;
`;

export const TextWarning = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({ theme }) => css`
    color: ${theme.colors.light};
    font-family: ${theme.fonts.regular};
  `}
`;

export const ButtonExit = styled.TouchableOpacity`
  width: auto;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.success};
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    color: ${theme.colors.light};
    font-family: ${theme.fonts.regular};
  `};
`;