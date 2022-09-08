import React, { useEffect, useState } from 'react';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import { Play, Stop } from 'phosphor-react-native';

import { useTheme } from 'styled-components';

import { Load } from '../Load';
import { Button, Container } from './styles';
import { postStore } from '../../services/store';

export function PlayButton(){
  const urlRadio = "https://s18.maxcast.com.br:8707/live";
  const [loading, setLoading] = useState(false);

  const playbackState = usePlaybackState();
  const theme = useTheme();
  const {statusPlayer, setStatusPlayer } = postStore();

  async function setupPlayer(){
    try{
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.add({
        url: urlRadio, 
        artwork: require('../../assets/angel-cover.png'),
        title: 'Rádio A Hora do Anjo',
        artist: 'De segunda à sexta de 18h às 19h'
      });
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities:[Capability.Play, Capability.Pause],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [Capability.Play, Capability.Pause],
      });
      setStatusPlayer(true);
    }catch(e){
      console.log(e);
    }
  }

  async function togglePlayback(playbackState){
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if(currentTrack !== null){
      if( playbackState === State.Paused || 
          playbackState === State.Ready
        ){
        try{
          setLoading(true);
          await TrackPlayer.play();

        }catch(e){
          console.log(e);
        }finally{
          setLoading(false);
        }
      }else{
        await TrackPlayer.pause();
      }
    }
  }

  useEffect(() => {
    if(statusPlayer === false){
      setupPlayer();
    }
  },[]);

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
        {
          loading ?
          <Load size={28} player={true} /> :
          playbackState === State.Playing ?
          <Stop size={32} color={theme.colors.light} /> :
          <Play size={32} color={theme.colors.light} />
        }
      </Button>
    </Container>
  );
}