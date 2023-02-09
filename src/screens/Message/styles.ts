import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContainerImage = styled.View`
  position: relative;
  top: 20px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`;

export const MessageImage = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
`;

export const AngelHalo = styled.Image`
  position: absolute;
  top: ${RFValue(55)}px;
  left: ${RFPercentage(16)}px;
  width: ${RFValue(120)}px;
  height: ${RFValue(40)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-top: 20px;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  margin: 10px 18px;
`;

export const ContainerForm = styled.View`
  margin-top: 20px;
  padding: 0 25px;
`;

export const ContainerButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.success};
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 170px;
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.light};
  `}
`;