import create from 'zustand';
import { PostProps } from '../screens/Home';

export interface DataBibleProps {
  book: string;
  chapter: number;
  number: number;
  text: string;
}

export interface SettingsProps {
  name: string;
  email: string;
  notification: boolean;
}

interface ZustandProps {
  data: PostProps;
  setData: (data: PostProps) => void;
  startSettings: SettingsProps;
  setStartSettings: (startSettings: SettingsProps) => void;
  bible: DataBibleProps;
  setBible:(bible: DataBibleProps) => void;
}

export const appDataStore = create<ZustandProps>((set) => ({
  data: {} as PostProps,
  setData: (data) => set({data}),
  startSettings: {} as SettingsProps,
  setStartSettings: (startSettings) => set({startSettings}),
  bible: {} as DataBibleProps,
  setBible: (bible) => set({bible}),
}));