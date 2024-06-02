import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'

const MusicControlCenter = () => {
    const state=usePlaybackState()

    const skipToNext=async ()=>{
        await TrackPlayer.skipToNext()
    }

    const skipToPrevious=async ()=>{
        await TrackPlayer.skipToNext()
    }

    const togglePlyback=async (playbackState:State)=>{
        const currentTrack=await TrackPlayer.getActiveTrackIndex()
        if(currentTrack){
            if(playbackState===State.Ready || playbackState===State.Paused){
                await TrackPlayer.play()
            }
            else{
                await TrackPlayer.pause()
            }
        }
    }

  return (
    <View>
      <Text>MusicControlCenter</Text>
    </View>
  )
}

export default MusicControlCenter

const styles = StyleSheet.create({})