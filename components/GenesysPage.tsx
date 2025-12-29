
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
    shouldScale?: boolean;
}

// Local Modal Component for Guidance
const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
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

// In-App Scaled Viewer Component (75% Zoom)
const ScaledViewer: React.FC<{ isOpen: boolean; url: string; onClose: () => void }> = ({ isOpen, url, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col animate-[fade-in_0.2s_ease-out]">
      {/* Header Controls */}
      <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 shadow-md">
        <button 
          onClick={onClose}
          className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
        >
          <BackArrowIcon className="h-5 w-5" />
          <span className="font-semibold text-sm">Close Viewer</span>
        </button>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-2 py-1 rounded">75% Scaled View</span>
            <button 
              onClick={() => window.open(url, '_blank')}
              className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Open in Browser"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
        </div>
      </div>

      {/* Scaled Iframe Container */}
      <div className="flex-grow overflow-hidden relative bg-white">
        {/* 
            Scaling Logic:
            To show a page at 75% zoom, we make the iframe 133.33% (1/0.75) of the container size
            and then scale it down by 0.75.
        */}
        <iframe 
          src={url} 
          className="absolute top-0 left-0 border-none origin-top-left"
          style={{ 
            width: '133.333333%', 
            height: '133.333333%', 
            transform: 'scale(0.75)',
          }}
          title="Status Viewer"
        />
        
        {/* Optional Overlay to help with scrolling issues if needed */}
        <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-md pointer-events-none">
            Zooming out for column visibility
        </div>
      </div>
    </div>
  );
};

const GenesysPage: React.FC<GenesysPageProps> = ({ onBack }) => {
  const [popup, setPopup] = useState<{ isOpen: boolean; message: string; url: string; shouldScale: boolean }>({
    isOpen: false,
    message: '',
    url: '',
    shouldScale: false
  });
  
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  const tiles: TileData[] = [
    {
      id: 'current-health',
      title: 'Current Health Status',
      message: 'All regions are displayed, focus on the Americas (US West) and (US East) columns',
      url: 'https://status.mypurecloud.com',
      icon: <LightningIcon className="h-10 w-10 text-cyan-400" />,
      shouldScale: true
    },
    {
      id: 'past-incidents',
      title: 'Past Incidents',
      message: 'Scroll past the table to view Incident History which lists current and past Incidents',
      url: 'https://status.mypurecloud.com/history',
      icon: <TableListIcon className="h-10 w-10 text-slate-300" />,
      shouldScale: true
    },
    {
      id: 'us-west',
      title: 'US West (StatusGator)',
      message: 'StatusGator is like DownDetector – it captures customer complaints of outages. Outages are often identified here before GENESYS health site is updated. Be sure to check the US East site as well',
      url: 'https://statusgator.com/services/genesys-cloud/americas-us-west',
      icon: <MapLocationIcon className="h-10 w-10 text-orange-400" />,
      shouldScale: false
    },
    {
      id: 'us-east',
      title: 'US East (StatusGator)',
      message: 'StatusGator is like DownDetector – it captures customer complaints of outages. Outages are often identified here before GENESYS health site is updated. Be sure to check the US West site as well',
      url: 'https://statusgator.com/services/genesys-cloud/americas-us-east',
      icon: <MapLocationIcon className="h-10 w-10 text-cyan-400" />,
      shouldScale: false
    }
  ];

  const handleTileClick = (tile: TileData) => {
    setPopup({
      isOpen: true,
      message: tile.message,
      url: tile.url,
      shouldScale: tile.shouldScale || false
    });
  };

  const handleConfirm = () => {
    const { url, shouldScale } = popup;
    setPopup(prev => ({ ...prev, isOpen: false }));
    
    if (shouldScale) {
        setViewerUrl(url);
    } else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white relative">
      <MessageBox 
        isOpen={popup.isOpen} 
        message={popup.message} 
        onConfirm={handleConfirm} 
      />
      
      <ScaledViewer 
        isOpen={!!viewerUrl} 
        url={viewerUrl || ''} 
        onClose={() => setViewerUrl(null)} 
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
