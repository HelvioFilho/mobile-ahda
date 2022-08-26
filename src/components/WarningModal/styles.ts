import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  height: number;
}

export const Container = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.8);
`;

export const ContainerModal = styled.View<ContainerProps>`
  width: 90%;
  height: ${({ height }) => height}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 20px;
  padding: 15px;
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
`;

export const IconX = styled(Ionicons)``;

export const TitleAlert = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Message = styled.Text`
  width: 80%;
  font-size: ${RFValue(14)}px;
`;

export const Footer = styled.View`
  width: 90%;
  height: 50px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 90px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
`;