import React, { useEffect, useRef } from "react";

const AudioPlayer = ({ audio }) => {
  const ref = useRef(null);

  const handleAudio = () => {
    ref.current.src = audio;
    ref.current.play();
  };

  useEffect(() => {
    ref.current.src = audio;
  }, [audio]);

  console.log(audio);

  return (
    <button
      onClick={handleAudio}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
        Escuchar
        <audio ref={ref} autoPlay={true} controls={false} />
      </span>
    </button>
  );
};

export default AudioPlayer;
