import create from 'zustand';
import { SettingsProps } from '../../App';
import { PostProps } from '../screens/Home';

interface ZustandProps {
  data: PostProps;
  setData: (data: PostProps) => void;
  statusPlayer: boolean;
  setStatusPlayer: (statusPlayer: boolean) => void;
  startSettings: SettingsProps;
  setStartSettings: (startSettings: SettingsProps) => void;
}

export const appDataStore = create<ZustandProps>((set) => ({
  data: {} as PostProps,
  setData: (data) => set({data}),
  statusPlayer: false,
  setStatusPlayer: (statusPlayer) => set({statusPlayer}),
  startSettings: {} as SettingsProps,
  setStartSettings: (startSettings) => set({startSettings}),
}));