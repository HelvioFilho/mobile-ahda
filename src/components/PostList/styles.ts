import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  padding: 10px 0;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: ${({ theme }) => theme.colors.light};
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: 8px;
  text-align: center;
  font-weight: bold;
`;

export const Cover = styled.Image`
  width: 100%;
  height: 250px;
`;

export const Preview = styled.Text`
  margin-top: -10px;
  padding: 4px 5px;
  font-size: ${RFValue(14)}px;
`;
export const Date = styled.Text`
  font-size: ${RFValue(12)}px;
  padding: 7px 6px;
  text-align: center;
`;
export const User = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
  padding: 8px 4px;
`;

export const ContainerUser = styled.View`
  top: -20px;
  align-items: center;
  justify-content: center;
  
  width: ${RFPercentage(24)}px;
  background-color: ${({ theme }) => theme.colors.tabBarColor.active};
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