import create from 'zustand';
import { PostProps } from '../screens/Home';

interface ZustandProps {
  data: PostProps;
  setData: (data: PostProps) => void;
  statusPlayer: boolean;
  setStatusPlayer: (statusPlayer: boolean) => void;
}

export const postStore = create<ZustandProps>((set) => ({
  data: {} as PostProps,
  setData: (data) => set({data}),
  statusPlayer: false,
  setStatusPlayer: (statusPlayer) => set({statusPlayer}),
}));