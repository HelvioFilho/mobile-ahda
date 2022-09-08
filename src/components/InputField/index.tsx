import React from 'react';
import { TextInputProps } from 'react-native';

import {
  Container,
  Label,
  Field,
  Error,
  InputContainer,
} from './styles';

interface InputFieldProps extends TextInputProps {
  label: string;
  error: string;
  changeHeight?: number;
  children?: React.ReactNode;
}

export function InputField(
  {
    label,
    error,
    changeHeight = 50,
    children,
    ...rest
  }: InputFieldProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer
        changeHeight={changeHeight}
      >
        <Field
          {...rest}
        />
        {
          children && children
        }
      </InputContainer>
      {error && <Error>* {error}</Error>}
    </Container>
  );
}