import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import SendRight from '../../assets/send-right.png';
import SendLeft from '../../assets/send-left.png';

import {
  Container,
  SubTitle,
  Title,
  ContainerForm,
  ContainerButton,
  ButtonText,
  ContainerImage,
  MessageImage
} from './styles';
import { InputField } from '../../components/InputField';

export function Message() {

  const values = {
    name: '',
    email: '',
    message: '',
  }

  const [inputHeight, setInputHeight] = useState(50);

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
                  console.log(values);
                  formikActions.resetForm();
                  formikActions.setSubmitting(false);
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
          </Container>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}