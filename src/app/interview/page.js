"use client"

import React, { useReducer, useState } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { initialStateRecording, recordingReducer } from './reducer';
import AudioRecorder from '../../components/AudioRecorder';
import AudioPlayer from '../../components/AudioPlayer';

const Interview = () => {
  const [messages, setMessages] = useState({});
  const [state, dispatch] = useReducer(recordingReducer, initialStateRecording);
  const {
    userRecording,
    userSoundActive,
    IASoundActive,
    iaPlayerAudio,
    userPlayerAudio,
  } = state;

  const onFinishRecording = ({ id, audio }) => {
    setMessages({ id, audio });
  };

  const onStartUserRecording = () => {
    dispatch({ type: 'USER-START-RECORDING' });
  };

  const onStopUserRecording = () => {
    dispatch({ type: 'USER-STOP-RECORDING' });
  };

  console.log('messages', messages);

  return (
    <div className='interview-wrap'>
      <Player
        src={iaPlayerAudio ? './soundazulclaro.json' : './soundgris.json'}
        style={{ height: '300px', width: '300px' }}
        autoplay={iaPlayerAudio}
        loop={iaPlayerAudio}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>

      {messages && <AudioPlayer audio={messages.audio} />}

      <AudioRecorder
        onFinish={onFinishRecording}
        onStartUserRecording={onStartUserRecording}
        onStopUserRecording={onStopUserRecording}
        isRecording={userRecording}
      />

      <Player
        src={userRecording ? './soundazuloscuro.json' : './soundgris.json'}
        style={{ height: '300px', width: '300px' }}
        autoplay={userRecording}
        loop={userRecording}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
    </div>
  );
};

export default Interview;



