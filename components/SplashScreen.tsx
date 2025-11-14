import React from 'react';
import { EyeIcon } from './icons';

const SplashScreen: React.FC = () => {
  // NOTE: The automatic audio playback was removed.
  // Modern browsers have strict autoplay policies that prevent audio from playing
  // without a user interaction (like a click). Attempting to play audio
  // immediately on load was causing an unhandled error, which made the entire
  // application fail to load. This silent splash screen ensures the app starts correctly.

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white"
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* The circular logo from the image */}
        <div className="mb-8 p-2 bg-transparent rounded-full border-4 border-white">
            <div className="bg-black rounded-full p-6">
                 <EyeIcon className="h-24 w-24 text-white" />
            </div>
        </div>

        {/* The EdgeWatch title box */}
        <div className="bg-white py-2 px-6 border-2 border-red-500">
          <h1 className="text-3xl font-bold text-black tracking-wider">
            ACE EdgeWatch
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;