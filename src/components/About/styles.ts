import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundModal};
`;

export const ContainerModal = styled.View`
  width: 90%;
  border-radius: 20px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.light};
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
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  margin-bottom: 20px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  margin: 4px 0;
`;

export const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Content = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: 5px;
`;

export const Site = styled.TouchableOpacity`
  padding-top: 10px;
  align-self: center;
  justify-content: center;
`;

export const TextSite = styled.Text`
  font-size: ${RFValue(16)}px;
  ${({ theme }) => css`
    color: ${theme.colors.tabBarColor.active};
    font-family: ${theme.fonts.bold};
  `}
`;