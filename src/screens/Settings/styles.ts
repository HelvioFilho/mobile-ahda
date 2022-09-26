import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  text-align: center;
`;

export const ContainerForm = styled.View`
  margin-top: 20px;
  padding: 0 25px;
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
  border-left-color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.success};
`;

export const SwitchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const TextSwitch = styled.Text`
  font-size: ${RFValue(16)}px;
  width: 80%;
`;
