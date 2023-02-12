import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 0;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: ${({ theme }) => theme.colors.light};
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  margin-bottom: 8px;
`;

export const CoverWrapper = styled.View`
  width: 100%;
  height: 250px;
`;

export const Cover = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const Preview = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: -10px;
  padding: 4px 5px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
  padding: 7px 6px;
`;

export const User = styled.Text`
  font-size: ${RFValue(10)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.light};
  `};
  padding: 8px 4px;
`;

export const WithoutUser = styled.View`
  margin-top: 20px;
`;

export const ContainerUser = styled.View`
  top: -20px;
  align-items: center;
  justify-content: center;

  width: ${RFPercentage(24)}px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${({ theme }) => theme.colors.mark};
`;

export const Separator = styled.View`
  width: 80%;
  border-width: .8px;
  border-top-color: black;
  align-self: center;
  margin: 8px 0;
`;