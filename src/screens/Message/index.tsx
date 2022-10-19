import React, { useCallback, useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions
} from 'react-native';
import Animated, { 
  Easing, 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';
import * as Yup from 'yup';

import AngelHaloImage from '../../assets/angelHalo.png';
import SendLeft from '../../assets/send-left.png';
import SendRight from '../../assets/send-right.png';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { InputField } from '../../components/InputField';
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

interface DefaultValueProps {
  name: string;
  email: string;
  message: string;
}

export function Message() {

  const [inputHeight, setInputHeight] = useState(50);
  const [visible, setVisible] = useState(false);
  const [warning, setWarning] = useState<WarningProps>({} as WarningProps);
  const [val, setVal] = useState<DefaultValueProps>({} as DefaultValueProps);
  const [animation, setAnimation] = useState(true);

  const theme = useTheme();
  const { startSettings } = appDataStore();
  const { width: displayWidth } = useWindowDimensions();

  const MessageAnimationX = useSharedValue(displayWidth * 0.80);
  const MessageAnimationY = useSharedValue(displayWidth * 0.40);
  const MessageOpacityAnimation = useSharedValue(0);
  const AngelHaloAnimation = useSharedValue(0);
  const TitleOpacityAnimation = useSharedValue(0);
  const TextOpacityAnimation = useSharedValue(0);
  const InputNameAnimation = useSharedValue(displayWidth * 1);
  const InputEmailAnimation = useSharedValue(displayWidth * 1);
  const InputMessageAnimation = useSharedValue(displayWidth * 1);
  const ButtonAnimation = useSharedValue(displayWidth * 0.50);

  const MessageRightStyle = useAnimatedStyle(() => {
    return {
      opacity: MessageOpacityAnimation.value,
      transform: [
        {
          translateX: -MessageAnimationX.value,
        },
        {
          translateY: MessageAnimationY.value,
        }
      ]
    }
  });

  const MessageLeftStyle = useAnimatedStyle(() => {
    return {
      opacity: MessageOpacityAnimation.value,
      transform: [
        {
          translateX: MessageAnimationX.value,
        },
        {
          translateY: MessageAnimationY.value,
        }
      ]
    }
  });

  const AngelHaloStyle = useAnimatedStyle(() => {
    return {
      opacity: AngelHaloAnimation.value
    }
  });

  const TitleOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: TitleOpacityAnimation.value
    }
  });

  const TextOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: TextOpacityAnimation.value
    }
  });

  const InputNameStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: InputNameAnimation.value,
        },
      ]
    }
  });

  const InputEmailStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: InputEmailAnimation.value,
        },
      ]
    }
  });

  const InputMessageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: InputMessageAnimation.value,
        },
      ]
    }
  });

  const ButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: ButtonAnimation.value,
        },
      ]
    }
  });

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

  useEffect(() => {
    if (animation) {
      MessageOpacityAnimation.value = withTiming(1, { duration: 1000 });
      MessageAnimationX.value = withTiming(0, { duration: 2500 });
      MessageAnimationY.value = withTiming(0, { duration: 2500 });
      AngelHaloAnimation.value = withTiming(1, { duration: 4000 });
      TitleOpacityAnimation.value = withTiming(1, { duration: 4000 });
      TextOpacityAnimation.value = withTiming(1, { duration: 4500 });
      InputNameAnimation.value = withTiming(0, { duration: 1000, easing: Easing.in(Easing.quad) });
      InputEmailAnimation.value = withTiming(0, { duration: 1500, easing: Easing.in(Easing.quad) });
      InputMessageAnimation.value = withTiming(0, { duration: 2000, easing: Easing.in(Easing.quad) });
      ButtonAnimation.value = withTiming(0, { duration: 2000 });
      setAnimation(false);
    }
  }, [animation]);

  useFocusEffect(useCallback(() => {
    setVal({
      name: startSettings.name ? startSettings.name : '',
      email: startSettings.email ? startSettings.email : '',
      message: '',
    });
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
                style={MessageLeftStyle}
                source={SendRight}
              />
              <AngelHalo
                style={AngelHaloStyle}
                source={AngelHaloImage}
              />
              <MessageImage
                style={MessageRightStyle}
                source={SendLeft}
              />
            </ContainerImage>
            <Animated.View
              style={TitleOpacityStyle}
            >
              <Title>Nos envie {'\n'}uma mensagem!</Title>
            </Animated.View>
            <Animated.View
              style={TextOpacityStyle}
            >
              <SubTitle>Suas mensagens podem ser lidas no programa, esse é o seu contato direto com A hora do anjo, então nos escreva!</SubTitle>
            </Animated.View>
            <Formik
              enableReinitialize={true}
              initialValues={val}
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
                      <Animated.View
                        style={InputNameStyle}
                      >
                        <InputField
                          placeholder='Nome'
                          label='Nome'
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          error={touched.name && errors.name}
                          value={name}
                        />
                      </Animated.View>
                      <Animated.View
                        style={InputEmailStyle}
                      >
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
                      </Animated.View>
                      <Animated.View
                        style={InputMessageStyle}
                      >
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
                      </Animated.View>
                      <Animated.View
                        style={ButtonStyle}
                      >
                        <ContainerButton disabled={isSubmitting} onPress={handleSubmit}>
                          {
                            isSubmitting ?
                              <Load size={24} player={true} /> :
                              <ButtonText>Enviar</ButtonText>

                          }
                        </ContainerButton>
                      </Animated.View>
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