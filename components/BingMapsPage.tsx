
import React, { useState } from 'react';
import { BackArrowIcon, MapLocationIcon, LightningIcon } from './icons';

interface BingMapsPageProps {
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const BingMapsPage: React.FC<BingMapsPageProps> = ({ onBack }) => {
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
        message="In the next screen, you will see the IsItDownRightNow status for Bing Maps. This confirms if the mapping service is reachable from external networks. If the status is 'DOWN', RADAR and Member Validation features in enterprise apps may experience significant delays."
        onConfirm={handleConfirm}
      />

      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">Bing Maps Health</h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="mt-8 mb-12">
            <div className="bg-blue-500/20 p-8 rounded-full ring-4 ring-blue-500/30 animate-pulse">
                <MapLocationIcon className="w-24 h-24 text-blue-400" />
            </div>
        </div>
        
        <div className="w-full max-w-xs space-y-6">
          <button
            onClick={() => handleTileClick('https://www.isitdownrightnow.com/maps.bing.com.html')}
            className="w-full flex flex-col items-center gap-3 bg-slate-800 border border-slate-700 hover:border-blue-500 p-6 rounded-2xl shadow-xl transition-all transform hover:scale-[1.03] group"
          >
            <LightningIcon className="h-10 w-10 text-blue-400 group-hover:scale-110 transition-transform" />
            <div className="text-center">
                <h3 className="font-bold text-lg">Check Status</h3>
                <p className="text-xs text-slate-400 mt-1">IsItDownRightNow Monitoring</p>
            </div>
          </button>
        </div>

        <div className="mt-12 px-6 text-center text-sm text-slate-400 max-w-sm leading-relaxed">
          <p className="mb-4">
            Bing Maps powers the location features in RADAR and various member validation workflows.
          </p>
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-300 font-semibold">Pro Tip:</p>
            <p className="text-xs">If Bing Maps is unreachable, suggest users switch to manual address entry if available in their respective apps.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BingMapsPage;
