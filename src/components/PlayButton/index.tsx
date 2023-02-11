import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import TrackPlayer, {
  State,
  usePlaybackState
} from 'react-native-track-player';

import { Button, Container } from './styles';
import { WarningModal } from '@components/WarningModal';
import { changedTrackPlayer } from '@services/Setup';

import { useTheme } from 'styled-components';
import PlayStop from '@assets/play.json';

export function PlayButton() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const playbackState = usePlaybackState();
  const { colors } = useTheme();
  const animationPlayStop = useRef<any>(null);

  async function togglePlayback(playbackState: State) {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      setLoading(true);
      if (playbackState === State.Connecting ||
        playbackState === State.None) {
        setVisible(true);
        setLoading(false);
        return;
      }
      if (playbackState === State.Ready) {
        try {
          await TrackPlayer.play();
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          await TrackPlayer.pause();
          await changedTrackPlayer();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  useEffect(() => {
    animationPlayStop.current.play(0, 24);
  }, []);

  useEffect(() => {
    if (playbackState === State.Playing) {
      animationPlayStop.current.play(24, 0);
    } else if (playbackState === State.Paused) {
      animationPlayStop.current.play(0, 24);
    }
  }, [playbackState]);

  return (
    <Container
      style={{
        shadowColor: colors.tabBarColor.shadow,
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
      <Modal
        animationType='fade'
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
        hardwareAccelerated={true}
      >
        <WarningModal
          title='Aviso'
          height={220}
          message={"A rádio encontra-se, momentaneamente, fora do ar. \nSentimos muito pelo inconveniente, tente novamente mais tarde!"}
          colorButton={colors.error}
          closeModal={() => setVisible(false)}
        />
      </Modal>
    </Container>
  );
}