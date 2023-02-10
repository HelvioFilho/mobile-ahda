import TrackPlayer, { Capability, AppKilledPlaybackBehavior } from 'react-native-track-player';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataBibleProps, SettingsProps } from './store';
import { Platform } from 'react-native';
import { bible } from './api';

const { ASYNC_KEY } = process.env;

type StartSettingsProps = {
  settings: SettingsProps;
  bible: DataBibleProps;
}

async function addPlayer() {
  await TrackPlayer.add({
    url: 'https://s18.maxcast.com.br:8707/live',
    artwork: require('@assets/angel-blue.png'),
    title: 'Rádio A Hora do Anjo',
    artist: 'De segunda a sexta de 18h às 19h',
  });
}

async function removePlayer() {
  await TrackPlayer.reset();
}

export async function changedTrackPlayer() {
  await removePlayer();
  await addPlayer();
}

export async function SetupTrackPlayer(): Promise<boolean> {
  let isSetup = false;

  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await addPlayer();

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
      },
      capabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
      notificationCapabilities: [Capability.Play, Capability.Pause],
    });
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function VerifyNotifications() {
  const settings = await Notifications.getPermissionsAsync();

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250]
    });
  }

  return settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}

export async function SetupNotifications(): Promise<boolean> {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });

  return true;
}

export async function ScheduleNotifications(): Promise<boolean> {
  const days = [2, 3, 4, 5, 6];
  return await Promise.all(days.map(async day => {
    await Notifications.scheduleNotificationAsync({
      identifier: `program${day}`,
      content: {
        title: 'A hora do anjo',
        body: 'O programa começará em 5 minutos.',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        hour: 17,
        minute: 55,
        weekday: day,
        repeats: true,
      }
    });
  }))
    .then(() => true)
    .catch((error) => {
      console.log(`Algo deu errado e não foi possível registrar: ${error}`);
      return false;
    });
}

export async function CheckActiveNotifications() {
  const settings = await Notifications.getAllScheduledNotificationsAsync();
  if(settings.length < 4) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await ScheduleNotifications();
  }
}

export async function SetupStartSettings(): Promise<StartSettingsProps> {
  let data = {} as StartSettingsProps;

  try {
    const response = await AsyncStorage.getItem(ASYNC_KEY as string);
    const settings = response ? JSON.parse(response) : {} as SettingsProps;
    const { data } = await bible.get('/verses/ra/random').catch(() => {
      return {
        data: {
          book: {
            name: "Eclesiastes"
          },
          chapter: 9,
          number: 10,
          text: "Posso todas as coisas em Cristo que me fortalece."
        }
      }
    });
    let bibleData = {} as DataBibleProps;
    if (typeof data === 'object' && Object.keys(data).length > 0) {
      bibleData = {
        book: data.book.name,
        chapter: data.chapter,
        number: data.number,
        text: data.text,
      }
    }
    return {
      settings,
      bible: bibleData
    }
  } catch (error) {
    console.log(error);
  }
  return data;
}