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
}

export function InputField(
  {
    label,
    error,
    changeHeight = 50,
    ...rest
  }: InputFieldProps){
  return (
    <Container>
      <Label>{label}</Label>
      {error && <Error>* {error}</Error>}
      <InputContainer changeHeight={changeHeight}>
        <Field 
          {...rest}
        />
      </InputContainer>
      
    </Container>
  );
}