import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
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
  font-family: ${({ theme }) => theme.fonts.Bold};
  font-size: ${RFValue(20)}px;
  margin-bottom: 8px;
  text-align: center;
`;

export const Cover = styled(FastImage)`
  width: 100%;
  height: 250px;
`;

export const Preview = styled.Text`
  margin-top: -10px;
  padding: 4px 5px;
  font-family: ${({ theme }) => theme.fonts.Regular};
  font-size: ${RFValue(14)}px;
`;
export const Date = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Regular};
  font-size: ${RFValue(12)}px;
  padding: 7px 6px;
  text-align: center;
`;
export const User = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Bold};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.light};
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
  background-color: ${({ theme }) => theme.colors.mark};
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Separator = styled.View`
  border-width: .8px;
  border-top-color: black;
  width: 80%;
  align-self: center;
  margin: 8px 0;
`;