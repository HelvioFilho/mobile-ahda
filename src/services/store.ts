import create from 'zustand';
import { PostProps } from '../screens/Home';

interface ZustandProps {
  data: PostProps;
  setData: (data: PostProps) => void;
}

export const postStore = create<ZustandProps>((set) => ({
  data: {} as PostProps,
  setData: (data) => set({data}),
}));