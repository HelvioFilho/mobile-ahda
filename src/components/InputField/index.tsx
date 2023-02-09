import { TextInputProps } from 'react-native';
import {
  Container,
  Label,
  InputContainer,
  Error,
  Field
} from './styles';

type InputFieldProps = TextInputProps & {
  label: string;
  error: string | undefined;
  changeHeight?: number;
  children?: React.ReactNode;
}

export function InputField(
  {
    label,
    error,
    changeHeight = 50,
    children, ...rest
  }: InputFieldProps) {

  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer changeHeight={changeHeight}>
        <Field
          {...rest}
        />
        {
          children && children
        }
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Container>
  );
}