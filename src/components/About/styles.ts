import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';


export const Container = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.8);
`;

export const ContainerModal = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 20px;
  padding: 15px;
`;

export const Close = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const IconX = styled(Ionicons)``;

export const Body = styled.View`
  width: 95%;
  padding: 5px 5px 30px 15px;

`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  margin: 4px 0px
`;

export const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export const Content = styled.Text`
  font-size: ${RFValue(16)}px;
  margin-left: 5px;
`;
export const Site = styled.TouchableOpacity`
  padding-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const TextSite = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.tabBarColor.active};
`;