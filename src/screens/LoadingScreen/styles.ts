import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

export const Container = styled(LinearGradient)`
  flex: 1;
  width: 100%;
`;

export const CloudImage = styled(Image)`
  position: absolute;
  bottom: ${RFValue(20)}px;
  left: ${RFValue(60)}px;
  width: ${RFValue(300)}px;
  height: ${RFValue(160)}px;
`;