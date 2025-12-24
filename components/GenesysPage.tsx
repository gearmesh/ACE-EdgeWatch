
import React, { useState } from 'react';
import { BackArrowIcon, OldPhoneIcon, LightningIcon, TableListIcon, MapLocationIcon } from './icons';

interface GenesysPageProps {
  onBack: () => void;
}

interface TileData {
    id: string;
    title: string;
    message: string;
    url: string;
    icon: React.ReactNode;
}

// Local Modal Component for Guidance
const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/10">
        <p className="text-white text-lg mb-6 leading-relaxed font-medium">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const GenesysPage: React.FC<GenesysPageProps> = ({ onBack }) => {
  const [popup, setPopup] = useState<{ isOpen: boolean; message: string; url: string }>({
    isOpen: false,
    message: '',
    url: ''
  });

  const tiles: TileData[] = [
    {
      id: 'current-health',
      title: 'Current Health Status',
      message: 'All regions are displayed, focus on the Americas (US West) and (US East) columns',
      url: 'https://status.mypurecloud.com',
      icon: <LightningIcon className="h-10 w-10 text-cyan-400" />
    },
    {
      id: 'past-incidents',
      title: 'Past Incidents',
      message: 'Scroll past the table to view Incident History which lists current and past Incidents',
      url: 'https://status.mypurecloud.com/history',
      icon: <TableListIcon className="h-10 w-10 text-slate-300" />
    },
    {
      id: 'us-west',
      title: 'US West (StatusGator)',
      message: 'StatusGator is like DownDetector – it captures customer complaints of outages. Outages are often identified here before GENESYS health site is updated. Be sure to check the US East site as well',
      url: 'https://statusgator.com/services/genesys-cloud/americas-us-west',
      icon: <MapLocationIcon className="h-10 w-10 text-orange-400" />
    },
    {
      id: 'us-east',
      title: 'US East (StatusGator)',
      message: 'StatusGator is like DownDetector – it captures customer complaints of outages. Outages are often identified here before GENESYS health site is updated. Be sure to check the US West site as well',
      url: 'https://statusgator.com/services/genesys-cloud/americas-us-east',
      icon: <MapLocationIcon className="h-10 w-10 text-cyan-400" />
    }
  ];

  const handleTileClick = (tile: TileData) => {
    setPopup({
      isOpen: true,
      message: tile.message,
      url: tile.url
    });
  };

  const handleConfirm = () => {
    const urlToOpen = popup.url;
    setPopup(prev => ({ ...prev, isOpen: false }));
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white relative">
      <MessageBox 
        isOpen={popup.isOpen} 
        message={popup.message} 
        onConfirm={handleConfirm} 
      />

      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2 tracking-wide">GENESYS Health Check</h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="mt-2 mb-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <OldPhoneIcon className="w-24 h-24" />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full px-4">
          {tiles.map((tile) => (
            <button 
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center aspect-square space-y-3 shadow-lg hover:border-cyan-500/50 hover:bg-slate-750 transition-all active:scale-[0.97]"
            >
              <div className="transition-transform group-hover:scale-110">
                {tile.icon}
              </div>
              <span className="text-slate-200 text-[11px] font-bold uppercase tracking-wider leading-tight text-center">
                {tile.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-400 text-sm max-w-xs px-4">
          <p className="opacity-75 italic">
            Monitoring PureCloud and Genesys Cloud availability across North American regions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default GenesysPage;
