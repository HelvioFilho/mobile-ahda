import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

interface InputContainerProps {
  changeHeight: number;
}

export const Container = styled.View`
  margin-bottom: 17px;
`;

export const Label = styled.Text`
  font-family: ${({ theme}) => theme.fonts.Medium};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: 7px;
`; 

export const Field = styled(TextInput)`
  flex: 1;
  height: 100%;
  font-family: ${({ theme}) => theme.fonts.Regular};
  font-size: ${RFValue(14)}px;
  color: #3D434D;
`;

export const Error = styled.Text`
  color: #E83F5B;
  margin-top: 5px;
  font-family: ${({ theme}) => theme.fonts.Regular};
  font-size: ${RFValue(14)}px;
`;

export const InputContainer = styled.View<InputContainerProps>`
  flex-direction: row;
  align-items: center;

  background-color: #ffffff;
  border: 1px #e3e4e5;
  padding: 10px 20px;
  border-radius: 4px;
  height: ${({ changeHeight }) => changeHeight}px;
  width: 100%;
`;