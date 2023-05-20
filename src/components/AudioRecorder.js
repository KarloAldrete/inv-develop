import React, { useEffect, useState } from "react";
import { sendMessage } from '../pages/api/gpt';

const AudioRecorder = ({ onFinish }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [content, setContent] = useState(null);
  const [voiceRecorder, setVoiceRecorder] = useState(null);

  const onAudioClick = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(audioStream);
      setStream(audioStream);
      setIsRecording(true);
      setVoiceRecorder(mediaRecorder);
    } catch (e) {
      console.log("User didn't allowed us to access the microphone.");
    }
  };

  const onStopRecording = async () => {
    if (!isRecording || !stream || !voiceRecorder) return;

    voiceRecorder.ondataavailable = async ({ data }) => {
      setContent(data);

      const audioBlob = new Blob([data], { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.webm");

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      console.log(text);

      let responseData;
      try {
        responseData = JSON.parse(text);
        const gptText = await sendMessage(responseData.transcription);
      
        const audioData = gptText.data.audio;
        const audioBlob = new Blob([Buffer.from(audioData.data)], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
      
        onFinish({ id: stream.id, audio: audioUrl });
      } catch (err) {
        console.error('Error al interpretar la respuesta como JSON: ', err);
      }
    };

    const tracks = stream.getAudioTracks();

    for (const track of tracks) {
      track.stop();
    }

    voiceRecorder.stop();
    setIsRecording(false);
    setVoiceRecorder(null);
  };

  useEffect(() => {
    if (!isRecording || !voiceRecorder) return;

    voiceRecorder.start();
  }, [isRecording, voiceRecorder]);

  useEffect(() => {
    if (isRecording || !content || !stream) return;
    setStream(null);
    setContent(null);
  }, [isRecording, content, stream, onFinish]);

  return (
    <button onClick={!isRecording ? onAudioClick : onStopRecording} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 ">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
        {!isRecording ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
            <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
          </svg>
        )}
        {!isRecording ? "Grabar" : "Grabando. . ."}
      </span>
    </button>
  );

};

export default AudioRecorder;
