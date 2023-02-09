import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

type InputContainerProps = {
  changeHeight: number;
}

export const Container = styled.View`
  margin-bottom: 17px;
`;

export const Label = styled.Text`
  margin-bottom: 7px;
  font-size: ${RFValue(16)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.text};
  `}
`;

export const Field = styled(TextInput)`
  flex: 1;
  height: 100%;
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.inputField};
  `}
`;

export const Error = styled.Text`
  margin-top: 5px;
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.error};
  `}
`;

export const InputContainer = styled.View<InputContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  ${({ changeHeight, theme }) => css`
    background-color: ${theme.colors.light};
    border: 1px ${theme.colors.inputBorder};
    height: ${changeHeight}px;
  `}
  padding: 10px 20px;
  border-radius: 4px;
`;