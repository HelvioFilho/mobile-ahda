import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  width: 100%;
  top: -40px;
  border-top-right-radius: 60px;
  border-top-left-radius: 60px;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const Title = styled.Text`
  font-size: ${RFValue(26)}px;
  font-weight: bold;
  text-align: center;
  margin: 15px 25px 0;
`;

export const CoverWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  justify-content: center;
  align-items: center;
`;

export const Cover = styled.Image`
  width: 100%;
  height: ${RFValue(300)}px;
`;

export const ContainerRender = styled.View`
  padding: 30px 0 0;
  margin-bottom: 20px;
`;

export const ContainerGallery = styled.View`
  padding: 0 0 30px;
`;

export const TitleGallery = styled.Text`
  text-align: center;
  font-size: ${RFValue(26)}px;
  font-weight: bold;
  padding: 0 20px 15px;
`;

export const Published = styled.Text`
  text-align: center;
  font-size: ${RFValue(12)}px;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.colors.text_light};
  margin: 20px 20px 0;
  padding-bottom: 5px;
  border-radius: 40px;
`;

export const ContainerAvatar = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin: 20px 20px 15px ;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  align-self: center;
`;

export const AboutWrapper = styled.View`
  margin: 0 10px 20px;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const About = styled.Text`
  font-size: ${RFValue(14)}px;  
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${RFValue(60)}px;
  left: ${RFValue(15)}px;
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(15)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.mark};
`;