import create from 'zustand';

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
  startSettings: SettingsProps;
  setStartSettings: (startSettings: SettingsProps) => void;
  bible: DataBibleProps;
  setBible:(bible: DataBibleProps) => void;
}

export const appDataStore = create<ZustandProps>((set) => ({
  startSettings: {} as SettingsProps,
  setStartSettings: (startSettings) => set({startSettings}),
  bible: {} as DataBibleProps,
  setBible: (bible) => set({bible}),
}));