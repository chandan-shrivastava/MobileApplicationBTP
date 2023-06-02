import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Home = () => {
    const [recording, setRecording] = React.useState(false);
    const [playing, setPlaying] = React.useState(false);
    const [playingArray, setPlayingArray] = React.useState([]);
    const [playerValueArray, setPlayerValueArray] = React.useState([]);
    const [playingIndex, setPlayingIndex] = React.useState();

    React.useEffect(() => {
        for (let i = 0; i < 100; i++) {
            setPlayerValueArray([...playerValueArray, 0]);
            setPlayingArray([...playingArray, true]);
        }
    }, []);

    audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
            audioRecorderPlayer.stopPlayer();
            setPlaying(false);
            playerValueArray[playingIndex] = 0;
            setPlayerValueArray(playerValueArray);
            playingArray[playingIndex] = false;
            setPlayingArray(playingArray);
        }
    });

    return (
        <View
            style={{
                flex: 1,
                margin: 20,
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Button
                mode="contained"
                onPress={async () => {
                    if (recording) {
                        audioRecorderPlayer.stopRecorder();
                    }
                    else {
                        const dirs = RNFetchBlob.fs.dirs;
                        const path = Platform.select({
                            ios: 'hello.m4a',
                            android: `${dirs.CacheDir}/hello.mp3`,
                        });
                        const uri = await audioRecorderPlayer.startRecorder(path);
                        await AsyncStorage.setItem('uri', uri);
                    }
                    setRecording(!recording);
                }}
                width={200}
            >
                {recording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <View style={{ height: 20 }} />
            <Button
                mode="contained"
                onPress={() => {
                    if (playing) {
                        audioRecorderPlayer.stopPlayer();
                    }
                    else {
                        const dirs = RNFetchBlob.fs.dirs;
                        const path = Platform.select({
                            ios: 'hello.m4a',
                            android: `${dirs.CacheDir}/hello.mp3`,
                        });
                        audioRecorderPlayer.startPlayer(path);
                    }
                    setPlaying(!playing);
                }}
                width={200}
            >
                {playing ? 'Stop Playing' : 'Start Playing'}
            </Button>
            <View style={{ height: 30 }} />
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {Array(10).fill(0).map((_, i) => (
                    <View style={{
                        width: '90%',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 10,
                        marginVertical: 10,
                        elevation: 5,
                    }}>
                        <Text key={i} style={{ fontSize: 20, marginVertical: 10, color: 'black' }}>Recording {i + 1}</Text>
                        <View key={i + 1} style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginVertical: 10,
                        }}>
                            <TouchableWithoutFeedback onPress={() => {
                                const newPlayingArray = [...playingArray];
                                if (newPlayingArray[i] == undefined) {
                                    newPlayingArray[i] = true;
                                }
                                else {
                                    newPlayingArray[i] = !newPlayingArray[i]
                                }
                                setPlayingArray(newPlayingArray);
                                if (newPlayingArray[i] == true) {
                                    audioRecorderPlayer.pausePlayer();
                                }
                                else {
                                    const dirs = RNFetchBlob.fs.dirs;
                                    const path = Platform.select({
                                        ios: 'hello.m4a',
                                        android: `${dirs.CacheDir}/hello.mp3`,
                                    });
                                    audioRecorderPlayer.startPlayer(path);
                                }
                                setPlayingIndex(i);
                            }}>
                                <MaterialCommunityIcons name={playingArray[i] == false ? "pause-circle-outline" : "play-circle-outline"} color="#000" size={50} />
                            </TouchableWithoutFeedback>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                value={playerValueArray[i]}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#000000"
                                maximumTrackTintColor="#000000"
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Home;