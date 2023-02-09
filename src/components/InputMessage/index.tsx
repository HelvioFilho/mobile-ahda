import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import {
  Container,
  Label,
  InputContainer,
  Error,
  Field
} from './styles';

type InputMessageProps = TextInputProps & {
  name: string;
  label: string;
  control: Control;
  error: string | undefined;
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
    children, ...rest
  }: InputMessageProps) {

  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer changeHeight={changeHeight}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Field
              onChangeText={onChange}
              value={value}
              {...rest}
            />
          )}
        />
        {
          children && children
        }
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Container>
  );
}