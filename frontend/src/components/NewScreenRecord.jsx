import React, { useState, useRef, useEffect } from "react";
import thirstycrow from "../../public/thirstycrow.mp4";
import thumbnail from "../../public/crowthumb.jpg"; // Path to your thumbnail image

const NewScreenRecord = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [subtitles, setSubtitles] = useState("");
  const [language, setLanguage] = useState("hi-IN"); // Default language
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const screenStreamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const webcamStreamRef = useRef(null);
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const isPausedRef = useRef(false); // Flag to track pause state

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
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
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

      startSpeechRecognition(); // Start speech recognition when recording starts
    } catch (err) {
      console.error("Error starting screen recording:", err);
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
    stopSpeechRecognition(); // Stop speech recognition when recording stops
  };

  const startSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognitionRef.current = recognition;

    recognition.interimResults = true; // Enable interim results for real-time updates
    recognition.lang = language; // Use selected language
    recognition.start();

    recognition.onresult = (event) => {
      const latestResult = event.results[event.results.length - 1];
      const transcript = latestResult[0].transcript;

      // Update subtitles by concatenating with the previous subtitles
      setSubtitles((prevSubtitles) => prevSubtitles + " " + transcript);

      // Check if the word "stone" is detected
      if (transcript.toLowerCase().includes("stone")) {
        if (videoRef.current) {
          if (isPausedRef.current) {
            videoRef.current.play(); // Resume video playback
            isPausedRef.current = false; // Mark the video as playing
          } else {
            videoRef.current.pause(); // Pause the video if it is playing
            isPausedRef.current = true; // Mark the video as paused
          }
        }
      }
    };

    recognition.onend = () => {
      if (recording) {
        recognition.start(); // Restart recognition if recording is still active
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
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
        console.error("Error accessing webcam:", err);
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
          autoPlay // Autoplay the video
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

        {/* Language Selection Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        >
          <option value="hi-IN">Hindi</option>
          <option value="en-US">English</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
          {/* Add more languages as needed */}
        </select>

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

      {/* Display Subtitles */}
      {subtitles && (
        <div className="absolute bottom-20 left-0 w-full text-center text-white bg-black bg-opacity-50 py-2">
          <h3 className="text-xl font-semibold">{subtitles}</h3>
        </div>
      )}

      {/* Recorded video display after recording is stopped */}
      {videoUrl && (
        <div className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Recorded Video:</h3>
          <video width="300" autoPlay controls>
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

export default NewScreenRecord;
