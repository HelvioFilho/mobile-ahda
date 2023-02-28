import TrackPlayer, { Event } from 'react-native-track-player';

export async function playbackService(){
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
    TrackPlayer.reset();
  });
}