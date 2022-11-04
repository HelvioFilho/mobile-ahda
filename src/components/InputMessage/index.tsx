import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import {
  Container, Error, Field, InputContainer, Label
} from './styles';

interface InputFieldProps extends TextInputProps {
  name: string;
  label: string;
  control: Control;
  error: string;
  changeHeight?: number;
  children?: React.ReactNode;
}

export function InputMessage(
  {
    name,
    label,
    control,
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
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Field
              onChangeText={onChange}
              value={value}
              {...rest}
            />
          )}
          name={name}
        />
        {
          children && children
        }
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Container>
  );
}