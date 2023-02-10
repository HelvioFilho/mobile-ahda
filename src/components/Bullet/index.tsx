import { Container } from './styles';

type BulletProps = {
  active?: boolean;
}

export function Bullet({ active = false }: BulletProps) {
  return (
    <Container active={active} />
  );
}