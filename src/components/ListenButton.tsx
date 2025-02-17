import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Pause } from "lucide-react";
import io from "socket.io-client";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { addMessage } from '../store/conversationSlice';

import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

const socket = io("http://localhost:3000");
export default function ListenButton() {
    const dispatch: AppDispatch = useDispatch();
  const audioContext = useRef(null);

  const { listening, pause, toggle } = useMicVAD({
    startOnLoad: false,
    onSpeechStart() {
      console.log("User started talking");
    },
    onSpeechEnd: (audio) => {
      const wavBuffer = utils.encodeWAV(audio);
      console.log("User stopped talking", wavBuffer);
      socket.emit("speech-to-text", wavBuffer);
    },
  });

  useEffect(() => {
    socket.on("transcription", (text) => {
      console.log(text, " == Transcription received");
      dispatch(addMessage(text));
    });
    socket.on("text-to-speech", (audio) => {
      console.log(audio, "This is transcript Audio");
    });

    socket.on("audioComplete", async (fullBuffer) => {
      console.log("Received full audio stream.");
      const arrayBuffer = await new Response(fullBuffer).arrayBuffer();
      playAudio(arrayBuffer);
    });

    return () => {
      pause();
      socket.off("transcription");
      socket.off("text-to-speech");
      socket.off("audioComplete");
    };
  }, []);

  const initAudioContext = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
  };

  const playAudio = (arrayBuffer) => {
    initAudioContext();

    audioContext.current.decodeAudioData(arrayBuffer, (buffer) => {
      const sourceNode = audioContext.current.createBufferSource();
      sourceNode.buffer = buffer;
      sourceNode.connect(audioContext.current.destination);
      sourceNode.start();
    });
  };

  const handleMicClick = (): void => {
    toggle();
    console.log("Mic clicked and listening is ", listening);
  };

  return (
    <Button
      onClick={handleMicClick}
      variant={listening ? "destructive" : ""}
      className="rounded-full p-3"
    >
      {listening ? (
        <>
          Stop <Pause />
        </>
      ) : (
        <>
          Start <Mic />
        </>
      )}
    </Button>
  );
}
