import { FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import {
    Image, Platform, SafeAreaView,
    Text, TouchableOpacity, View
} from "react-native";
import Modal from "react-native-modal";
import sliderThumbImageAndroid from "../../assets/music-player/slider-thumb-android.png";
import sliderThumbImageIOS from "../../assets/music-player/slider-thumb-ios.png";
import { styles } from "./PlayerModal.style";
import { PRIMARY_COLOR } from "./style";
import { displayTime } from "./util.js";

export default function PlayerModal({
    props_isModalVisible,
    props_closeModal,
    props_playingSong,
    props_isPlaying,
    props_isBuffering,
    props_currentSongIndex,
    props_currentPosition,
    props_setcurrentPosition,
    props_setRewinding,
    props_updatePosition,
    props_pauseOrResumeSong,
    props_changeSong,
}) {
    const opacity = props_isBuffering ? 0.5 : 1;

    return (
        // https://github.com/react-native-modal/react-native-modal
        <Modal
            isVisible={props_isModalVisible}
            hasBackdrop={false}
            onBackButtonPress={props_closeModal}
            style={{ margin: 0 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={props_closeModal} style={styles.closeButton}>
                        <FontAwesome5 name="times" size={20} color="#757575" />
                    </TouchableOpacity>
                    <Text style={styles.singerName}>Song (Made by DoTQ)</Text>
                    <Text>{"\n"}</Text>
                    <Image
                        source={{ uri: props_playingSong.coverImage }}
                        style={styles.coverImage}
                    />

                    <Text style={styles.songName}>{props_playingSong.name}</Text>

                    <Text style={styles.singerName}>{props_playingSong.singer}</Text>

                    <View style={styles.progress}>
                        <View style={styles.time}>
                            <Text style={styles.timeText}>
                                {displayTime(props_currentPosition)}
                            </Text>

                            <Text style={styles.timeText}>
                                {displayTime(props_playingSong.duration)}
                            </Text>
                        </View>

                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={props_playingSong.duration}
                            minimumTrackTintColor={PRIMARY_COLOR}
                            maximumTrackTintColor="#dfdfdf"
                            tapToSeek={true}
                            thumbImage={
                                Platform.OS === "ios"
                                    ? sliderThumbImageIOS
                                    : sliderThumbImageAndroid
                            }
                            onValueChange={props_setcurrentPosition}
                            onSlidingStart={() => props_setRewinding(true)}
                            onSlidingComplete={props_updatePosition}
                            value={props_currentPosition}
                            disabled={props_isBuffering}
                        />
                    </View>

                    <View style={styles.controls}>
                        <TouchableOpacity
                            onPress={() => props_changeSong(props_currentSongIndex - 1)}
                            disabled={props_isBuffering}
                        >
                            <FontAwesome5
                                name="backward"
                                style={[styles.secondaryControlIcon, { opacity }]}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={props_pauseOrResumeSong}
                            disabled={props_isBuffering}
                        >
                            <FontAwesome5
                                name={props_isPlaying ? "pause-circle" : "play-circle"}
                                style={[styles.primaryControlIcon, { opacity }]}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props_changeSong(props_currentSongIndex + 1)}
                            disabled={props_isBuffering}
                        >
                            <FontAwesome5
                                name="forward"
                                style={[styles.secondaryControlIcon, { opacity }]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}