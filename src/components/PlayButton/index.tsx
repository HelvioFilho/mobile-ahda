import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState
} from 'react-native-track-player';

import { useTheme } from 'styled-components';

import PlayStop from '../../assets/play.json';
import { Button, Container } from './styles';

export function PlayButton() {
  const urlRadio = "https://s18.maxcast.com.br:8707/live";
  const [loading, setLoading] = useState(false);

  const playbackState = usePlaybackState();
  const theme = useTheme();
  const animationPlayStop = useRef(null);

  async function setupPlayer() {
    try {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.add({
        url: urlRadio,
        artwork: require('../../assets/angel-blue.png'),
        title: 'Rádio A Hora do Anjo',
        artist: 'De segunda à sexta de 18h às 19h'
      });
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [Capability.Play, Capability.Pause],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [Capability.Play, Capability.Pause],
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function togglePlayback(playbackState) {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      setLoading(true);
      if (playbackState === State.Paused ||
        playbackState === State.Ready
      ) {
        try {
          await TrackPlayer.play();
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          await TrackPlayer.pause();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  useEffect(() => {

    if (!!playbackState) {
      if (playbackState === State.Playing) {
        animationPlayStop.current.play(24, 0);
      } else {
        animationPlayStop.current.play(0, 24);
      }
    } else {
      animationPlayStop.current.play(0, 0);
      setupPlayer();
    }
  }, [playbackState]);

  return (
    <Container
      style={{
        shadowColor: theme.colors.tabBarColor.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
      }}
    >
      <Button
        activeOpacity={0.8}
        onPress={() => togglePlayback(playbackState)}
        disabled={loading}
      >
        <LottieView
          ref={animationPlayStop}
          source={PlayStop}
          style={{ height: 60, alignSelf: 'center' }}
          resizeMode="contain"
          loop={false}
          autoPlay={false}
          onAnimationFinish={() => setLoading(false)}
        />
      </Button>
    </Container>
  );
}