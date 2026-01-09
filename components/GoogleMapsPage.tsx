
import React, { useState } from 'react';
import { BackArrowIcon, MapLocationIcon, SearchEyeIcon } from './icons';

interface GoogleMapsPageProps {
  onBack: () => void;
}

const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/10">
        <p className="text-white text-lg mb-6 leading-relaxed font-medium">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const GoogleMapsPage: React.FC<GoogleMapsPageProps> = ({ onBack }) => {
  const [popup, setPopup] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: ''
  });

  const handleTileClick = (url: string) => {
    setPopup({
      isOpen: true,
      url: url
    });
  };

  const handleConfirm = () => {
    const urlToOpen = popup.url;
    setPopup({ isOpen: false, url: '' });
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      <MessageBox 
        isOpen={popup.isOpen}
        message="In the next screen, you will see the DownDetector status for Google Maps. This service tracks user-reported outages and API performance issues. Significant problem reports here usually correlate with latency issues in maps-dependent applications."
        onConfirm={handleConfirm}
      />

      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">Google Maps Health</h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="mt-8 mb-12">
            <div className="bg-green-500/20 p-8 rounded-full ring-4 ring-green-500/30">
                <MapLocationIcon className="w-24 h-24 text-green-400" />
            </div>
        </div>
        
        <div className="w-full max-w-xs space-y-6">
          <button
            onClick={() => handleTileClick('https://downdetector.com/status/google-maps/')}
            className="w-full flex flex-col items-center gap-3 bg-slate-800 border border-slate-700 hover:border-green-500 p-6 rounded-2xl shadow-xl transition-all transform hover:scale-[1.03] group"
          >
            <SearchEyeIcon className="h-10 w-10 text-green-400 group-hover:scale-110 transition-transform" />
            <div className="text-center">
                <h3 className="font-bold text-lg">DownDetector</h3>
                <p className="text-xs text-slate-400 mt-1">User Reported Outages</p>
            </div>
          </button>
        </div>

        <div className="mt-12 px-6 text-center text-sm text-slate-400 max-w-sm leading-relaxed">
          <p className="mb-4">
            Google Maps API is utilized for advanced spatial analytics and external member-facing mapping features.
          </p>
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-green-300 font-semibold">Note:</p>
            <p className="text-xs">Outages reported on DownDetector often precede official acknowledgement from the provider.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoogleMapsPage;
