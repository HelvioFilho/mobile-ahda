import { useCallback, useState } from 'react';
import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Modal, 
  Platform, 
  Switch, 
  TouchableWithoutFeedback 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

import * as Notifications from 'expo-notifications';
import * as Yup from 'yup';

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
import { About } from '@components/About';
import { InputField } from '@components/InputField';
import { Loading } from '@components/Loading';
import { WarningModal } from '@components/WarningModal';

import { ScheduleNotifications, VerifyNotifications } from '@services/Setup';
import { appDataStore, SettingsProps } from '@services/store';

const { ASYNC_KEY } = process.env;

type WarningProps = {
  message: string;
  height: number;
  color: string;
}

export function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(false);
  const [nameError, setNameError] = useState<undefined | string>(undefined);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  const [isSubmittingName, setIsSubmittingName] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [warning, setWarning] = useState<WarningProps>({} as WarningProps);

  const { colors } = useTheme();
  const { startSettings, setStartSettings } = appDataStore();

  const schema = {
    name: Yup.object().shape({
      name: Yup
        .string()
        .trim()
        .min(3, 'O nome precisa ter mais que 2 caracteres!'),
    }),
    email: Yup.object().shape({
      email: Yup
        .string()
        .trim()
        .email('Coloque um e-mail válido!'),
    })
  };

  async function setDataStorage(data: SettingsProps) {
    const key = ASYNC_KEY as string;
    await AsyncStorage.setItem(key, JSON.stringify(data));
    setStartSettings(data);
  }

  async function handleChangedName() {
    try {
      if (name !== '') await schema.name.validate({ name });
      setDataStorage({
        name,
        email: startSettings.email,
        notification: startSettings.notification,
      });
      setWarning({
        height: 170,
        message: 'Nome alterado com sucesso!',
        color: colors.error
      });
      setVisible(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setNameError(error.message);
      } else {
        console.log(error);
        setWarning({
          height: 210,
          message: 'Ocorreu um erro ao alterar o nome, tente novamente mais tarde!',
          color: colors.error
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
        name: startSettings.name,
        email,
        notification: startSettings.notification,
      });
      setWarning({
        height: 170,
        message: 'E-mail alterado com sucesso!',
        color: colors.error
      });
      setVisible(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setEmailError(error.message);
      } else {
        console.log(error);
        setWarning({
          height: 210,
          message: 'Ocorreu um erro ao alterar o e-mail, tente novamente mais tarde!',
          color: colors.error
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
          const isScheduled = await ScheduleNotifications();
          if (isScheduled) {
            setWarning({
              height: 200,
              message: 'As notificações foram ativadas, agora você será alertado antes do programa começar!',
              color: colors.error
            });
            setVisible(true);
          } else {
            setWarning({
              height: 200,
              message: 'Não foi possível ativar as notificações, tente novamente mais tarde!',
              color: colors.error
            });
            setVisible(true);
            return;
          }
        } else {
          setWarning({
            height: 200,
            message: 'Não há permissão para ativar as notificações, ative-as nas configurações do seu celular!',
            color: colors.error
          });
          setVisible(true);
          return;
        }
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setWarning({
          height: 200,
          message: 'As notificações foram desativadas, você não será mais alertado antes do programa começar!',
          color: colors.error
        });
        setVisible(true);
      }
      setNotification(isNotification);
      setDataStorage({
        name: startSettings.name,
        email: startSettings.email,
        notification: isNotification
      });
    } catch (error) {
      console.log(error);
      setWarning({
        height: 210,
        message: 'Ocorreu um erro ao alterar as notificações, tente novamente mais tarde!',
        color: colors.error
      });
      setVisible(true);
    }
  }

  useFocusEffect(useCallback(() => {
    setName(startSettings.name);
    setEmail(startSettings.email);
    const isBoolean = typeof startSettings.notification === 'boolean';
    setNotification(isBoolean ? startSettings.notification : false);
    setEmailError(undefined);
    setNameError(undefined);
  },[startSettings]));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
                  setNameError(undefined);
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
                    setIsSubmittingName(true);
                    setTimeout(async () => {
                      handleChangedName();
                    }, 800);
                  }
                  handleChangedName
                }}
                activeOpacity={0.8}
              >
                {
                  !isSubmittingName ?
                    <Entypo name='save' size={28} color={colors.light} /> :
                    <Loading size={20} player={true} />
                }
              </SaveButton>
            </InputField>
            <InputField
              placeholder='E-mail'
              label='E-mail'
              onChangeText={setEmail}
              onFocus={() => setEmailError(undefined)}
              value={email}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              error={emailError}
            >
              <SaveButton
                disabled={isSubmittingEmail}
                onPress={() => {
                  if (startSettings.email !== email) {
                    Keyboard.dismiss();
                    setIsSubmittingEmail(true);
                    setTimeout(async () => {
                      handleChangedEmail();
                    }, 800);
                  }
                }}
                activeOpacity={0.8}
              >
                {
                  !isSubmittingEmail ?
                    <Entypo name='save' size={28} color={colors.light} /> :
                    <Loading size={20} player={true} />
                }
              </SaveButton>
            </InputField>
            <SwitchWrapper>
              <TextSwitch>Deseja receber notificações sobre o início do programa?</TextSwitch>
              <Switch
                trackColor={{
                  false: colors.error,
                  true: colors.success
                }}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                ios_backgroundColor={colors.background}
                onValueChange={handleChangedNotification}
                thumbColor={colors.text_light}
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
        </Container >
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}