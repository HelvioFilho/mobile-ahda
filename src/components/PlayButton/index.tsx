import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
} from 'react-native-track-player';

import { Button, Container } from './styles';
import { WarningModal } from '@components/WarningModal';

import { useTheme } from 'styled-components';
import PlayStop from '@assets/play.json';
import { Loading } from '@components/Loading';

export function PlayButton() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const playbackState = usePlaybackState();
  const { colors } = useTheme();
  const animationPlayStop = useRef<any>(null);
  
  async function addTrack(){
    try{
      const data = {
        url: 'https://s18.maxcast.com.br:8707/live',
        artwork: require('@assets/angel-blue.png'),
        title: 'Rádio A Hora do Anjo',
        artist: 'De segunda a sexta de 18h às 19h',
      };
      await TrackPlayer.add(data);
    }catch(error){
      console.log(error);
    }
  }

  async function setPlay() {
    try {
      await TrackPlayer.play();
      animationPlayStop.current.play(24, 0);
    } catch (e) {
      console.log(e);
    }
  }

  async function setPause() {
    try {
      await TrackPlayer.pause();
      await TrackPlayer.reset();
      animationPlayStop.current.play(0, 24);
    } catch (e) {
      console.log(e);
    }
  }
  
  async function togglePlayback(playbackState: State) {
    if(playbackState === State.None){
      await addTrack();
    }else if(playbackState === State.Playing){
      await setPause();
    }
  }

  useEffect(() => {
    if(playbackState === State.Connecting){
      setLoading(true);
    }
    if(playbackState === State.None && loading){
      setLoading(false);
      setVisible(true);
      setPause();
    }else if (playbackState === State.None && !loading){
      animationPlayStop.current.play(0, 24);
    }
    if(playbackState === State.Paused){
      animationPlayStop.current.play(0, 24);
    }
    
    if(playbackState === State.Ready){
      setLoading(false);
      setPlay();
    }
  }, [playbackState]);

  return (
    <Container
      style={{
        shadowColor: colors.tabBarColor.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      }}
    >
      <Button
        activeOpacity={0.8}
        onPress={() => togglePlayback(playbackState)}
        disabled={loading}
      >
        {
          loading ?
          <Loading player size={20} /> :
        <LottieView
          ref={animationPlayStop}
          source={PlayStop}
          style={{ height: 60, alignSelf: 'center' }}
          resizeMode='contain'
          loop={false}
          autoPlay={false}
          onAnimationFinish={() => setLoading(false)}
        />
        }
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
          message={
            'A rádio encontra-se, momentaneamente, fora do ar. \nSentimos muito pelo inconveniente, tente novamente mais tarde!'
          }
          colorButton={colors.error}
          closeModal={() => setVisible(false)}
        />
      </Modal>
    </Container>
  );
}
