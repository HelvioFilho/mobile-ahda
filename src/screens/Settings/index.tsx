import * as Notifications from 'expo-notifications';
import { FloppyDisk } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView, Modal, Platform,
  Switch, TouchableWithoutFeedback
} from 'react-native';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField';

import { useTheme } from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsProps } from '../../../App';
import { Load } from '../../components/Load';
import { WarningModal } from '../../components/WarningModal';
import { appDataStore } from '../../services/store';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
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
    if (startSettings.name === name) {
      return;
    }
    setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  }

  async function handleChangedEmail() {
    if (startSettings.email === email) {
      return;
    }
    setIsSubmitting(true)
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
      setIsSubmitting(false);
    }
  }

  async function handleChangedNotification() {
    try {
      const isNotification = !notification;
      setNotification(isNotification);
      setDataStorage({
        name,
        email,
        notification: isNotification,
      });
      if (isNotification) {
        const days = [2, 3, 4, 5, 6];
        await Promise.all(days.map(async (day) => {
          await Notifications.scheduleNotificationAsync({
            identifier: `program${day}`,
            content: {
              title: 'A hora do anjo',
              body: 'O programa começará em 5 minutos.',
              sound: true,
            },
            trigger: {
              hour: 17,
              minute: 55,
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
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setWarning({
          height: 200,
          message: "As notificações foram desativadas, agora você não será mais alertado antes do programa começar!",
          color: theme.colors.error
        });
        setVisible(true);
      }
    } catch (e) {
      console.log(e);
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
                disabled={isSubmitting}
                onPress={handleChangedName}
                activeOpacity={0.8}
              >
                {
                  !isSubmitting ?
                    <FloppyDisk size={28} color={theme.colors.light} /> :
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
                disabled={isSubmitting}
                onPress={handleChangedEmail}
                activeOpacity={0.8}
              >
                {
                  !isSubmitting ?
                    <FloppyDisk size={28} color={theme.colors.light} /> :
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
            <ButtonAbout>
              <TextAbout>Sobre o Aplicativo</TextAbout>
            </ButtonAbout>
          </ContainerFooter>
          <Modal
            animationType='fade'
            transparent
            visible={visible}
            onRequestClose={() => setVisible(false)}
          >
            <WarningModal
              title='Aviso'
              height={warning.height}
              message={warning.message}
              colorButton={warning.color}
              closeModal={() => setVisible(false)}
            />
          </Modal>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}