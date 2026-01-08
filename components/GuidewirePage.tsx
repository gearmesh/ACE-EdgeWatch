
import React, { useState } from 'react';
import { BackArrowIcon, GuidewireIcon, LightningIcon, ComputerIcon, CarCrashIcon, TableListIcon } from './icons';

interface GuidewirePageProps {
  onBack: () => void;
}

interface TileData {
    id: string;
    title: string;
    message: string;
    url: string;
    icon: React.ReactNode;
}

// Local Modal Component
const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/10">
        <p className="text-white text-lg mb-6 leading-relaxed font-medium">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-teal-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const GuidewirePage: React.FC<GuidewirePageProps> = ({ onBack }) => {
  const [popup, setPopup] = useState<{ isOpen: boolean; message: string; url: string }>({
    isOpen: false,
    message: '',
    url: ''
  });

  const tiles: TileData[] = [
    {
      id: 'current',
      title: 'Current Health status',
      message: 'Current Health is by services, be sure to scroll through the list',
      url: 'https://status.guidewire.com/',
      icon: <LightningIcon className="h-10 w-10 text-teal-400" />
    },
    {
      id: 'maintenance',
      title: 'Scheduled Maintenance (Past & Future)',
      message: 'The Scheduled Maintenance page lists all the previous maintenance. This may help identify a cross linked issue if Guidewire is having issues.',
      url: 'https://status.guidewire.com/?nav=maintenance',
      icon: <ComputerIcon className="h-10 w-10 text-indigo-400" />
    },
    {
      id: 'incidents',
      title: 'Incidents',
      message: 'The Incidents page lists all Incidents known the last 15 days. Check if there is one today',
      url: 'https://status.guidewire.com/?nav=incidents',
      icon: <CarCrashIcon />
    },
    {
      id: 'historical',
      title: 'Historical Status of Incidents',
      message: 'Historical Status is great way to see if any maintenance was done the day before',
      url: 'https://status.guidewire.com/history?page=1&nav=historical-status',
      icon: <TableListIcon className="h-10 w-10 text-slate-400" />
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
        <h1 className="text-xl font-bold ml-2 tracking-wide">Guidewire Health Check</h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="mt-2 mb-10">
            <GuidewireIcon className="w-24 h-24" />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full px-4">
          {tiles.map((tile) => (
            <button 
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center aspect-square space-y-3 shadow-lg hover:border-teal-500/50 hover:bg-slate-750 transition-all active:scale-[0.97]"
            >
              {tile.icon}
              <span className="text-slate-200 text-xs font-bold uppercase tracking-wider leading-tight">
                {tile.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-400 text-sm max-w-xs px-4">
          <p className="opacity-75 italic">
            Monitoring Guidewire Cloud services and InsuranceSuite availability in real-time.
          </p>
        </div>
      </main>
    </div>
  );
};

export default GuidewirePage;
