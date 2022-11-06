import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView, Modal, Platform,
  Switch, TouchableWithoutFeedback, useWindowDimensions
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { Entypo } from '@expo/vector-icons';

import * as Notifications from 'expo-notifications';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField';

import { useTheme } from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Load } from '../../components/Load';
import { WarningModal } from '../../components/WarningModal';
import { appDataStore, SettingsProps } from '../../services/store';
import {
  ButtonAbout,
  Container,
  ContainerFooter,
  ContainerForm,
  SaveButton,
  SwitchWrapper,
  TextAbout,
  TextSwitch,
  Title
} from './styles';
import { About } from '../../components/About';
import { VerifyNotifications } from '../../services/Setup';

const { ASYNC_KEY } = process.env;

interface WarningProps {
  message: string;
  height: number;
  color: string;
}

export function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [isSubmittingName, setIsSubmittingName] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [warning, setWarning] = useState<WarningProps>({} as WarningProps);
  const [animation, setAnimation] = useState(true);

  const theme = useTheme();
  const { startSettings, setStartSettings } = appDataStore();
  const { width: displayWidth } = useWindowDimensions();

  const TextAnimation = useSharedValue(0);
  const SwitchAnimation = useSharedValue(0);
  const InputNameAnimation = useSharedValue(displayWidth * 1);
  const InputEmailAnimation = useSharedValue(displayWidth * 1);
  const AboutAnimation = useSharedValue(displayWidth * 0.50);

  const InputNameStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: InputNameAnimation.value
        }
      ]
    }
  });

  const InputEmailStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: InputEmailAnimation.value
        }
      ]
    }
  });

  const TextStyle = useAnimatedStyle(() => {
    return {
      opacity: TextAnimation.value
    }
  });

  const SwitchStyle = useAnimatedStyle(() => {
    return {
      opacity: SwitchAnimation.value
    }
  });

  const AboutStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: AboutAnimation.value
        }
      ]
    }
  });

  const schema = {
    name: Yup.object().shape({
      name: Yup
        .string()
        .trim()
        .min(3, 'O nome precisa ter mais que 3 caracteres!')
    }),
    email: Yup.object().shape({
      email: Yup
        .string()
        .trim()
        .email('Coloque um e-mail válido!'),
    }),
  };

  async function setDataStorage(data: SettingsProps) {
    await AsyncStorage.setItem(ASYNC_KEY, JSON.stringify(data))
    setStartSettings(data);
  }

  async function handleChangedName() {
    try {
      if (name !== '') await schema.name.validate({ name });
      setDataStorage({
        name,
        email,
        notification
      });
      setWarning({
        height: 170,
        message: "Nome atualizado com sucesso!",
        color: theme.colors.error
      });
      setVisible(true);
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setNameError(e.message);
      } else {
        console.log(e);
        setWarning({
          height: 210,
          message: "Algo deu errado e o seu nome não pode ser atualizado, por favor tente novamente mais tarde",
          color: theme.colors.error
        });
        setVisible(true);
      }
    } finally {
      setIsSubmittingName(false);
    }
  }

  async function handleChangedEmail() {
    try {
      if (email !== '') await schema.email.validate({ email });
      setDataStorage({
        name,
        email,
        notification
      });
      setWarning({
        height: 170,
        message: "E-mail atualizado com sucesso!",
        color: theme.colors.error
      });
      setVisible(true);
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setEmailError(e.message);
      } else {
        console.log(e);
        setWarning({
          height: 210,
          message: "Algo deu errado e o seu nome não pode ser atualizado, por favor tente novamente mais tarde",
          color: theme.colors.error
        });
        setVisible(true);
      }
    } finally {
      setIsSubmittingEmail(false);
    }
  }

  async function handleChangedNotification() {
    try {
      const isNotification = !notification;

      if (isNotification) {
        const hasPermission = await VerifyNotifications();
        if (hasPermission) {
          try {
            const days = [2, 3, 4, 5, 6];
            await Promise.all(days.map(async (day) => {
              await Notifications.scheduleNotificationAsync({
                identifier: `program${day}`,
                content: {
                  title: 'A hora do anjo',
                  body: 'O programa começará em 5 minutos.',
                  priority: Notifications.AndroidNotificationPriority.HIGH,
                },
                trigger: {
                  hour: 21,
                  minute: 0,
                  weekday: day,
                  repeats: true
                }
              });
            }));
            setWarning({
              height: 200,
              message: "As notificações foram ativadas, agora você será alertado antes do programa começar!",
              color: theme.colors.error
            });
            setVisible(true);
          }catch (e) {
            setWarning({
              height: 200,
              message: "Algo deu errado e não foi possível ativar a notificação!",
              color: theme.colors.error
            });
            setVisible(true);
          }
        } else {
          setWarning({
            height: 200,
            message: "Não há permissão para enviar notificações",
            color: theme.colors.error
          });
          setVisible(true);
        }
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setWarning({
          height: 200,
          message: "As notificações foram desativadas, agora você não será mais alertado antes do programa começar!",
          color: theme.colors.error
        });
        setVisible(true);
      }
      setNotification(isNotification);
      setDataStorage({
        name,
        email,
        notification: isNotification,
      });
    } catch (e) {
      console.log(e);
      setWarning({
        height: 200,
        message: e.message,
        color: theme.colors.error
      });
      setVisible(true);
    }
  }

  useEffect(() => {
    setName(startSettings.name);
    setEmail(startSettings.email);
    const isBoolean = new Boolean(startSettings.notification);
    setNotification(isBoolean ? startSettings.notification : false);
  }, []);

  useEffect(() => {
    if (animation) {
      TextAnimation.value = withTiming(1, { duration: 2000 });
      InputNameAnimation.value = withTiming(0, { duration: 2000 });
      InputEmailAnimation.value = withTiming(0, { duration: 2500 });
      SwitchAnimation.value = withTiming(1, { duration: 3000 });
      AboutAnimation.value = withTiming(0, { duration: 4000 });
      setAnimation(false);
    }
  }, [animation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Animated.View style={TextStyle}>
            <Title>Configurações do Aplicativo</Title>
          </Animated.View>
          <ContainerForm>
            <Animated.View style={InputNameStyle}>
              <InputField
                placeholder='Nome'
                label='Nome'
                onChangeText={(name) => {
                  setName(name);
                  if (name.length === 4) {
                    setNameError(null);
                  }
                }}
                value={name}
                autoCorrect={false}
                error={nameError}
              >
                <SaveButton
                  disabled={isSubmittingName}
                  onPress={() => {
                    if (startSettings.name !== name) {
                      Keyboard.dismiss();
                      setIsSubmittingName(true)
                      setTimeout(async () => {
                        handleChangedName();
                      }, 800);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  {
                    !isSubmittingName ?
                      <Entypo name='save' size={28} color={theme.colors.light} /> :
                      <Load size={20} player={true} />
                  }
                </SaveButton>
              </InputField>
            </Animated.View>
            <Animated.View style={InputEmailStyle}>
              <InputField
                placeholder='E-mail'
                label='E-mail'
                onChangeText={setEmail}
                onFocus={() => setEmailError(null)}
                value={email}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                error={emailError}
              >
                <SaveButton
                  disabled={isSubmittingEmail}
                  onPress={() => {
                    if (startSettings.email !== email) {
                      Keyboard.dismiss();
                      setIsSubmittingEmail(true)
                      setTimeout(async () => {
                        handleChangedEmail();
                      }, 800);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  {
                    !isSubmittingEmail ?
                      <Entypo name='save' size={28} color={theme.colors.light} /> :
                      <Load size={20} player={true} />
                  }
                </SaveButton>
              </InputField>
            </Animated.View>
            <SwitchWrapper style={SwitchStyle}>
              <TextSwitch>Deseja receber notificação sobre o inicio do programa?</TextSwitch>
              <Switch
                trackColor={{
                  false: theme.colors.error,
                  true: theme.colors.success
                }}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                ios_backgroundColor={theme.colors.background}
                onValueChange={handleChangedNotification}
                thumbColor={theme.colors.text_light}
                value={notification}
              />
            </SwitchWrapper>
          </ContainerForm>
          <ContainerFooter style={AboutStyle}>
            <ButtonAbout
              onPress={() => setVisibleAbout(true)}
              activeOpacity={0.8}
            >
              <TextAbout>Sobre o Aplicativo</TextAbout>
            </ButtonAbout>
          </ContainerFooter>
          <Modal
            animationType='fade'
            transparent
            visible={visible}
            onRequestClose={() => setVisible(false)}
            hardwareAccelerated={true}
          >
            <WarningModal
              title='Aviso'
              height={warning.height}
              message={warning.message}
              colorButton={warning.color}
              closeModal={() => setVisible(false)}
            />
          </Modal>
          <Modal
            animationType='slide'
            transparent
            visible={visibleAbout}
            onRequestClose={() => setVisibleAbout(false)}
          >
            <About
              closeModal={() => setVisibleAbout(false)}
            />
          </Modal>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}