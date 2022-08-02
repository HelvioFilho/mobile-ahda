import React, { useEffect, useState } from 'react';
import TrackPlayer, {
  State,
  usePlaybackState,
} from 'react-native-track-player';
import { Play, Stop } from 'phosphor-react-native';

import { useTheme } from 'styled-components';

import { Load } from '../Load';
import { Button, Container } from './styles';

export function PlayButton(){
  const urlRadio = "https://s18.maxcast.com.br:8707/live";
  const [loading, setLoading] = useState(false);

  const playbackState = usePlaybackState();
  const theme = useTheme();

  async function setupPlayer(){
    try{
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({url: urlRadio});
    }catch(e){
      console.log(e);
    }
  }

  async function togglePlayback(playbackState){
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if(currentTrack !== null){
      if(playbackState === State.Paused || playbackState === 'ready'){
        setLoading(true);
        console.log("play");
        await TrackPlayer.play();
        setLoading(false);
      }else{
        await TrackPlayer.pause();
        console.log("pause");
      }
    }
  }

  useEffect(() => {
    setupPlayer();
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
          <Load size={28} /> :
          playbackState === State.Playing ?
          <Stop size={32} color={theme.colors.light} /> :
          <Play size={32} color={theme.colors.light} />
        }
      </Button>
    </Container>
  );
}