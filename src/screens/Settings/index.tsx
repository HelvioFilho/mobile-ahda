import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Switch,
  TouchableWithoutFeedback
} from 'react-native';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField';

import { useTheme } from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { About } from '../../components/About';
import { Load } from '../../components/Load';
import { WarningModal } from '../../components/WarningModal';
import { ScheduleNotifications, VerifyNotifications } from '../../services/Setup';
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

  const theme = useTheme();
  const { startSettings, setStartSettings } = appDataStore();
  
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
          if (ScheduleNotifications()) {
            setWarning({
              height: 200,
              message: "As notificações foram ativadas, agora você será alertado antes do programa começar!",
              color: theme.colors.error
            });
          } else {
            setWarning({
              height: 200,
              message: "Algo deu errado e não foi possível ativar a notificação!",
              color: theme.colors.error
            });
          }
          setVisible(true);
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Title>Configurações do Aplicativo</Title>
          <ContainerForm>
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
            <SwitchWrapper>
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
          <ContainerFooter>
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