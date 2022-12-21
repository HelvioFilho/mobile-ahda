import TrackPlayer, { Capability } from 'react-native-track-player';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataBibleProps, SettingsProps } from './store';
import { bible } from './api';
import { Platform } from 'react-native';

const { ASYNC_KEY } = process.env;

interface StartSettingsProps {
  settings: SettingsProps;
  bible: DataBibleProps;
}

export async function SetupTrackPlayer(urlRadio: string): Promise<boolean> {
  let isSetup = false;

  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.add({
      url: urlRadio,
      artwork: require('../assets/angel-blue.png'),
      title: 'Rádio A Hora do Anjo',
      artist: 'De segunda à sexta de 18h às 19h'
    });

    await TrackPlayer.updateOptions({
      stopWithApp: true,
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
    })
  }

  return settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}

export async function SetupNotifications(): Promise<boolean> {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    })
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

export async function ScheduleNotifications(): Promise<boolean>{
  const days = [2, 3, 4, 5, 6];
  const notification = await Promise.all(days.map(async (day) => {
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
        repeats: true
      }
    });
  }))
  .then(() => {
    return true;
  })
  .catch((error) => {
    console.log("algo deu errado e não foi possível registrar:" + error);
    return false;
  });
  return notification;
}

export async function CheckActiveNotifications(){
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  if(scheduledNotifications.length > 0){
    console.log(scheduledNotifications.length);
  }else{
    console.log('Não existem notificações agendadas');
  }
}

export async function SetupStartSettings(): Promise<StartSettingsProps> {
  let data = {} as StartSettingsProps;

  try {
    const response = await AsyncStorage.getItem(ASYNC_KEY);
    const settings = response ? JSON.parse(response) : {} as SettingsProps;

    const { data } = await bible.get('/verses/ra/random');
    const bibleData = {
      book: data.book.name,
      chapter: data.chapter,
      number: data.number,
      text: data.text
    }
    return {
      settings,
      bible: bibleData
    }

  } catch (e) {
    console.log(e)

  }
  return data;

}