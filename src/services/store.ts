import { create } from 'zustand';

export type DataBibleProps = {
  book: string;
  chapter: number;
  number: number;
  text: string;
}

export type SettingsProps = {
  name: string;
  email: string;
  notification: boolean;
}

type ZustandProps = {
  startSettings: SettingsProps;
  setStartSettings: (startSettings: SettingsProps) => void;
  bible: DataBibleProps;
  setBible: (bible: DataBibleProps) => void;
}

export const appDataStore = create<ZustandProps>((set) => ({
  startSettings: {} as SettingsProps,
  setStartSettings: (startSettings) => set({ startSettings }),
  bible: {} as DataBibleProps,
  setBible: (bible) => set({ bible }),
}));