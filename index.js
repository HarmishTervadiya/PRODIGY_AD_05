/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import { MusicService } from './MusicService';


TrackPlayer.registerPlaybackService(()=>MusicService)
AppRegistry.registerComponent(appName, () => App);
