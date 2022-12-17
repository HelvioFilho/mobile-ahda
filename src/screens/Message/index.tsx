import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import AngelHaloImage from '../../assets/angelHalo.png';
import SendLeft from '../../assets/send-left.png';
import SendRight from '../../assets/send-right.png';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { InputMessage } from '../../components/InputMessage';
import { Load } from '../../components/Load';
import { WarningModal } from '../../components/WarningModal';
import { api } from '../../services/api';
import { appDataStore } from '../../services/store';
import {
  AngelHalo,
  ButtonText,
  Container,
  ContainerButton,
  ContainerForm,
  ContainerImage,
  MessageImage,
  SubTitle,
  Title
} from './styles';

const { KEY } = process.env;

interface WarningProps {
  message: string;
  height: number;
  color: string;
}

interface DataForm {
  name: string;
  email: string;
  message: string;
}

export function Message() {

  const [inputHeight, setInputHeight] = useState(50);
  const [visible, setVisible] = useState(false);
  const [warning, setWarning] = useState<WarningProps>({} as WarningProps);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const { startSettings } = appDataStore();

  const schema = Yup.object().shape({
    message: Yup
      .string()
      .trim()
      .required('Mensagem não pode ser vazia!'),
    email: Yup
      .string()
      .trim()
      .email('Coloque um e-mail válido!'),
    name: Yup
      .string()
      .trim()
      .min(3, 'O nome precisa ter mais que 3 caracteres!')
      .required('Nome não pode ser vazio!')
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleSendMessage(form: Partial<DataForm>) {
    setIsSubmitting(true);
    api.post('set_message', {
      name: form.name,
      email: form.email,
      message: form.message,
      key: KEY,
    }).then(({ data }) => {
      let message, height = 170;
      if (data.error) {
        if (data.message) {
          message = data.message ?
            data.message :
            'Algo deu errado e sua mensagem não pode ser enviada, por favor tente novamente mais tarde';
          height = 210;
        }
      } else {
        message = 'Mensagem enviada com sucesso!';
        reset();
      }
      setWarning({
        height,
        message,
        color: theme.colors.error
      });
    }).catch((e) => {
      setWarning({
        height: 210,
        message: 'Algo deu errado e o servidor não respondeu, se o erro persistir, entre em contato com o desenvolvedor do aplicativo!',
        color: theme.colors.error
      });
    }).finally(() => {
      setIsSubmitting(false);
      setVisible(true);
    });
  }

  useFocusEffect(useCallback(() => {

    setValue("name", startSettings.name ? startSettings.name : '');
    setValue("email", startSettings.email ? startSettings.email : '');

  }, [startSettings]));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Container>
            <ContainerImage>
              <MessageImage
                source={SendRight}
              />
              <AngelHalo
                source={AngelHaloImage}
              />
              <MessageImage
                source={SendLeft}
              />
            </ContainerImage>
            <Title>Nos envie {'\n'}uma mensagem!</Title>
            <SubTitle>Suas mensagens podem ser lidas no programa, esse é o seu contato direto com A hora do anjo, então nos escreva!</SubTitle>
            <ContainerForm>
              <InputMessage
                placeholder='Nome'
                label='Nome'
                name='name'
                control={control}
                autoCorrect={false}
                error={errors.name && errors.name.message as string}
              />
              <InputMessage
                placeholder='E-mail'
                label='E-mail (Opcional)'
                name='email'
                control={control}
                error={errors.email && errors.email.message as string}
                autoCapitalize='none'
                keyboardType='email-address'
              />
              <InputMessage
                placeholder='Sua mensagem'
                label='Mensagem'
                name='message'
                control={control}
                changeHeight={inputHeight}
                error={errors.message && errors.message.message as string}
                multiline={true}
                onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height + 30)}
              />
              <ContainerButton disabled={isSubmitting} onPress={handleSubmit(handleSendMessage)}>
                {
                  isSubmitting ?
                    <Load size={24} player={true} /> :
                    <ButtonText>Enviar</ButtonText>
                }
              </ContainerButton>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}