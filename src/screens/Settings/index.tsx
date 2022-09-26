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
import { WarningModal } from '../../components/WarningModal';
import { appDataStore } from '../../services/store';
import {
  Container,
  ContainerForm,
  SaveButton,
  SwitchWrapper,
  TextSwitch,
  Title
} from './styles';
import { Load } from '../../components/Load';

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
    try {
      if (name !== '') await schema.name.validate({ name });
      setDataStorage({
        name,
        email,
        notification
      });
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setNameError(e.message);
      } else {
        console.log(e);
      }
    } finally {
      setIsSubmitting(false);
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
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setEmailError(e.message);
      } else {
        console.log(e);
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
            identifier: 'alert start program',
            content: {
              title: 'A hora do anjo',
              body: 'O programa está para começar!',
              sound: true,
            },
            trigger: {
              hour: 18,
              minute: 0,
              weekday: day,
              repeats: true
            }
          });
        }));
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
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
              onChangeText={setName}
              value={name}
              autoCorrect={false}
              error={nameError}
            >
              <SaveButton
                disabled={isSubmitting}
                onPress={handleChangedName}
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
              value={email}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              error={emailError}
            >
              <SaveButton
                disabled={isSubmitting}
                onPress={handleChangedEmail}
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