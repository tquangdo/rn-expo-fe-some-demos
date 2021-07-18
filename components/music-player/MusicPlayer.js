import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  FlatList, Image, SafeAreaView, Text, TouchableOpacity, View
} from "react-native";
import { PLAY_LIST } from "./components/music-player/listSong";
import { styles } from "./components/music-player/MusicPlayer.style";
import PlayerModal from "./components/music-player/PlayerModal";
import { displayTime } from "./components/music-player/util";

export default function MusicPlayer() {
  const [staIsModalVisible, setStaIsModalVisible] = useState(false);
  const [staPlayingSong, setStaPlayingSong] = useState({});
  const [staIsBuffering, setStaIsBuffering] = useState(false);
  const [staIsPlaying, setStaIsPlaying] = useState(false);
  const [staIsRewinding, setStaIsRewinding] = useState(false);
  const [staCurrentPosition, setStaCurrentPosition] = useState(0);
  const [staCurrentSongIndex, setStaCurrentSongIndex] = useState(0);
  const [staPlaybackObject, setStaPlaybackObject] = useState(null);

  const onRenderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>List Song (Made by DoTQ)</Text>
    </View>
  );

  const onRenderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPlaySong(item, index)}
    >
      <Image source={{ uri: item.coverImage }} style={styles.coverImage} />

      <View style={{ flex: 1 }}>
        <Text style={styles.songName}>{item.name}</Text>

        <View style={styles.songInfo}>
          <Text style={styles.singerName}>{item.singer}</Text>
          <Text style={styles.songDuration}>{displayTime(item.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onKeyExtractor = (arg_item) => arg_item.sourceUri;

  const onPlaySong = async (arg_song, arg_index) => {
    setStaIsModalVisible(true);
    setStaIsBuffering(true);
    setStaIsPlaying(false);
    setStaCurrentPosition(0);
    setStaCurrentSongIndex(arg_index);
    setStaPlayingSong(arg_song);

    try {
      // Unload playback when change sound
      if (staPlaybackObject !== null) {
        await staPlaybackObject.unloadAsync();
      }

      // Play new sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: arg_song.sourceUri },
        { shouldPlay: true }
      );
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setStaPlaybackObject(sound);
    } catch (error) {
      alert("Can't play this song! Error: " + error);
    }
  };

  const onPlaybackStatusUpdate = ({
    isLoaded,
    isBuffering,
    isPlaying,
    error,
  }) => {
    if (!isLoaded) {
      if (error) {
        alert(`Encountered a fatal error during playback: ${error}`);
      }
    } else {
      setStaIsBuffering(isBuffering);
      setStaIsPlaying(isPlaying);
    }
  };

  const onUpdatePosition = async (arg_position) => {
    await staPlaybackObject.setPositionAsync(arg_position);
    setStaCurrentPosition(arg_position);
    setStaIsRewinding(false);
  };

  const onPauseOrResumeSong = async () => {
    if (staIsPlaying) {
      setStaIsPlaying(false);
      staPlaybackObject.pauseAsync();
    } else {
      if (staCurrentPosition === staPlayingSong.duration) {
        setStaCurrentPosition(0);
        await staPlaybackObject.replayAsync();
      } else {
        await staPlaybackObject.playAsync();
      }
    }
  };

  const onChangeSong = (arg_index) => {
    if (arg_index < 0) arg_index = PLAY_LIST.length - 1;
    else if (arg_index == PLAY_LIST.length) arg_index = 0;

    onPlaySong(PLAY_LIST[arg_index], arg_index);
  };

  const onStopPlaySong = () => {
    setStaIsModalVisible(false);
    setStaIsPlaying(false);
    staPlaybackObject.unloadAsync();
  };

  // https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // Run time slider
    if (staIsPlaying && !staIsBuffering) {
      const interval = setInterval(async () => {
        const {
          positionMillis,
          durationMillis,
        } = await staPlaybackObject.getStatusAsync();

        // Don't update position when user rewinding
        if (!staIsRewinding) setStaCurrentPosition(positionMillis || 0);

        // Stop sound if positionMillis equals durationMillis or less than 1 second
        if (positionMillis >= durationMillis - 900) {
          await staPlaybackObject.setPositionAsync(durationMillis);
          setStaCurrentPosition(durationMillis);
          setStaIsPlaying(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [staIsPlaying, staIsBuffering, staIsRewinding]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PLAY_LIST}
        renderItem={onRenderItem}
        ListHeaderComponent={onRenderHeader}
        keyExtractor={onKeyExtractor}
        showsVerticalScrollIndicator={false}
      />

      <PlayerModal
        props_isModalVisible={staIsModalVisible}
        props_closeModal={onStopPlaySong}
        props_playingSong={staPlayingSong}
        props_isPlaying={staIsPlaying}
        props_isBuffering={staIsBuffering}
        props_currentSongIndex={staCurrentSongIndex}
        props_currentPosition={staCurrentPosition}
        props_setcurrentPosition={setStaCurrentPosition}
        props_setRewinding={setStaIsRewinding}
        props_updatePosition={onUpdatePosition}
        props_pauseOrResumeSong={onPauseOrResumeSong}
        props_changeSong={onChangeSong}
      />
    </SafeAreaView>
  );
}