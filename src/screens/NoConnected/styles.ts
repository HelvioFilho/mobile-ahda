import styled from 'styled-components/native';
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
  background-color: ${({ theme }) => theme.colors.backgroundModal};
  padding: 30px;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const IconSignal = styled(MaterialIcons)`
  position: absolute;
  top: -90px;
  align-self: center;
`;

export const TextWarning = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.Regular};
`;

export const ButtonExit = styled.TouchableOpacity`
  width: auto;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 10px;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.Regular};
`;