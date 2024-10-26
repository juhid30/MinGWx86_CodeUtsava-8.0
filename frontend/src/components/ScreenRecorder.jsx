import React, { useState, useRef, useEffect } from 'react';
import thirstycrow from "../../public/thirstycrow.mp4";
import thumbnail from "../../public/crowthumb.jpg"; // Path to your thumbnail image

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const screenStreamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const webcamStreamRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      screenStreamRef.current = screenStream;
      audioStreamRef.current = audioStream;

      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...audioStream.getTracks(),
      ]);

      recordedChunks.current = [];

      mediaRecorder.current = new MediaRecorder(combinedStream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setIsVideoPlaying(false);
      };

      mediaRecorder.current.start();
      setRecording(true);
      setIsVideoPlaying(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    setRecording(false);
  };

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const webcamStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        webcamStreamRef.current = webcamStream;
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startWebcam();

    return () => {
      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background video or thumbnail based on recording state */}
      {!recording && (
        <img 
          src={thumbnail} 
          alt="Video Thumbnail" 
          className="absolute top-0 left-0 w-full h-full object-cover" 
        />
      )}
      {isVideoPlaying && (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loop
          muted
          controls
        >
          <source src={thirstycrow} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Webcam feed positioned on the top left of the screen */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-center">
        <video
          className="w-[12rem] h-[12rem] border-4 border-white rounded-lg shadow-lg mb-2"
          autoPlay
          muted
          ref={(video) => {
            if (video && webcamStreamRef.current) {
              video.srcObject = webcamStreamRef.current;
            }
          }}
        />
        {/* Start/Stop Recording Button */}
        {recording ? (
          <button 
            onClick={stopRecording} 
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Stop Recording
          </button>
        ) : (
          <button 
            onClick={startRecording} 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Start Recording
          </button>
        )}
      </div>

      {/* Recorded video display after recording is stopped */}
      {videoUrl && (
        <div className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Recorded Video:</h3>
          <video width="300" controls>
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <a 
            href={videoUrl} 
            download="recording.webm" 
            className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Download Recording
          </a>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder;
