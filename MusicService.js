import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";

export async function MusicPlayerSetup(){
    let isSetup=false

    try {
        await TrackPlayer.getActiveTrack()
        isSetup=true
    } catch (error) {
        await TrackPlayer.setupPlayer()
        isSetup=true
    }finally{
        return isSetup
    }
}

export async function MusicService(){
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
      });
    
      TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
      });
    
      TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
      });
    
      TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
      });
    
      TrackPlayer.addEventListener(Event.RemoteSeek, () => {
        TrackPlayer.seekTo();
      });
    
}