import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import TrackPlayer, {
  State,
  usePlaybackState
} from 'react-native-track-player';

import { useTheme } from 'styled-components';

import PlayStop from '../../assets/play.json';
import { Button, Container } from './styles';
import { Modal } from 'react-native';
import { WarningModal } from '../WarningModal';

export function PlayButton() {
  const [loading, setLoading] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [visible, setVisible] = useState(false);

  const playbackState = usePlaybackState();
  const theme = useTheme();
  const animationPlayStop = useRef(null);

  async function togglePlayback(playbackState) {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    
    if (currentTrack !== null) {
      setLoading(true);
      setCheckStatus(true);
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
    if(checkStatus){
      if (playbackState === State.None) {
        setVisible(true);
        setLoading(false);
        setCheckStatus(false);
      }
    }
  },[checkStatus]);

  useEffect(() => {
    if (playbackState === State.Playing) {
      animationPlayStop.current.play(24, 0);
    } else {
      animationPlayStop.current.play(0, 24);
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
              message={"A rádio encontra-se, momentaneamente, fora do ar. \nSentimos muito pelo inconveniente, em breve tudo voltará ao normal!"}
              colorButton={theme.colors.error}
              closeModal={() => setVisible(false)}
            />
          </Modal>
    </Container>
  );
}