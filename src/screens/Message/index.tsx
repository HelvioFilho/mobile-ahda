import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Keyboard, KeyboardAvoidingView, Modal, Platform,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import * as Yup from 'yup';

import SendLeft from '../../assets/send-left.png';
import SendRight from '../../assets/send-right.png';

import { useTheme } from 'styled-components';
import { InputField } from '../../components/InputField';
import { WarningModal } from '../../components/WarningModal';
import { api } from '../../services/api';
import {
  ButtonText, Container, ContainerButton, ContainerForm, ContainerImage,
  MessageImage, SubTitle,
  Title
} from './styles';

const { KEY } = process.env;

interface WarningProps {
  message: string;
  height: number;
  color: string;
}

export function Message() {

  const values = {
    name: '',
    email: '',
    message: '',
  }

  const [inputHeight, setInputHeight] = useState(50);
  const [visible, setVisible] = useState(false);
  const [warning, setWarning] = useState<WarningProps>({} as WarningProps);

  const theme = useTheme();

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
              <MessageImage
                source={SendLeft}
              />
            </ContainerImage>
            <Title>Nos envie {'\n'}uma mensagem!</Title>
            <SubTitle>Suas mensagens podem ser lidas no programa, esse é o seu contato direto com A hora do anjo, então nos escreva!</SubTitle>
            <Formik
              initialValues={values}
              validationSchema={schema}
              onSubmit={
                (values, formikActions) => {

                  api.post('set_message', {
                    name: values.name,
                    email: values.email,
                    message: values.message,
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
                      formikActions.resetForm();
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
                    formikActions.setSubmitting(false);
                    setVisible(true);
                  });
                }
              }
            >
              {
                (
                  {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }: any) => {
                  const { name, email, message } = values;

                  return (
                    <ContainerForm>
                      <InputField
                        placeholder='Nome'
                        label='Nome'
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        error={touched.name && errors.name}
                        value={name}
                      />
                      <InputField
                        placeholder='E-mail'
                        label='E-mail (Opcional)'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                        value={email}
                        autoCapitalize='none'
                        keyboardType='email-address'
                      />
                      <InputField
                        placeholder='Sua mensagem'
                        label='Mensagem'
                        changeHeight={inputHeight}
                        onChangeText={handleChange('message')}
                        onBlur={handleBlur('message')}
                        error={touched.message && errors.message}
                        value={message}
                        multiline={true}
                        onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height + 30)}
                      />
                      <ContainerButton disabled={isSubmitting} onPress={handleSubmit}>
                        <ButtonText>Enviar</ButtonText>
                      </ContainerButton>
                    </ContainerForm>
                  )
                }
              }
            </Formik>
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