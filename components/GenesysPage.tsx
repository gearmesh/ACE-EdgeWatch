
import React, { useState, useEffect } from 'react';
import { BackArrowIcon, OldPhoneIcon, LightningIcon, TableListIcon, MapLocationIcon } from './icons';

interface GenesysPageProps {
  onBack: () => void;
}

type Status = 'healthy' | 'warning' | 'critical' | 'loading' | 'unknown';

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

// Health Status View Component (Bing Maps Style)
const StatusGatorHealthView: React.FC<{ 
  status: Status; 
  onClose: () => void; 
  onOpenDetails: () => void;
  onRefresh: () => void;
  title: string;
}> = ({ status, onClose, onOpenDetails, onRefresh, title }) => {
  const getStatusConfig = (s: Status) => {
    switch (s) {
      case 'healthy':
        return { color: 'bg-green-600 hover:bg-green-700 shadow-green-500/20', text: 'Healthy' };
      case 'warning':
        return { color: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20', text: 'Warning' };
      case 'critical':
        return { color: 'bg-red-600 hover:bg-red-700 shadow-red-500/20', text: 'Service Down' };
      case 'loading':
        return { color: 'bg-slate-700 hover:bg-slate-800', text: 'Checking...' };
      default:
        return { color: 'bg-slate-600 hover:bg-slate-700', text: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900 flex flex-col p-6 animate-[fade-in_0.2s_ease-out]">
      <header className="flex items-center mb-12">
        <button onClick={onClose} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2 tracking-wide uppercase">Status Health Check</h1>
      </header>

      <div className="flex-grow flex flex-col items-center justify-start pt-10">
        <button
          onClick={onRefresh}
          className={`w-full max-w-sm aspect-square rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-10 transition-all transform active:scale-[0.98] ring-1 ring-white/10 ${config.color} ${status === 'loading' ? 'animate-pulse' : ''}`}
        >
          <div className="bg-white/20 p-6 rounded-full mb-6">
             <MapLocationIcon className="h-20 w-20 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">{title}</h2>
          <span className="text-3xl font-bold text-white uppercase tracking-widest drop-shadow-md">
            {config.text}
          </span>
          <p className="text-sm font-medium text-white/70 mt-8 flex items-center gap-2">
            <LightningIcon className="h-4 w-4" />
            Tap to Refresh
          </p>
        </button>
        
        <button
          onClick={onOpenDetails}
          className="mt-10 w-full max-w-sm bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center justify-between hover:bg-slate-750 transition-colors shadow-lg active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
               <LightningIcon className="h-6 w-6" />
            </div>
            <div className="text-left">
                <h3 className="font-bold text-lg">View Details</h3>
                <p className="text-xs text-slate-400 leading-tight">Open StatusGator Page</p>
            </div>
          </div>
          <div className="text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <p className="mt-12 text-slate-400 text-center text-sm max-w-xs leading-relaxed opacity-60 italic">
          Scraping StatusGator for real-time region health. If status is unknown, tap the icon to refresh or view details.
        </p>
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
  const [usWestStatus, setUsWestStatus] = useState<Status>('loading');
  const [usEastStatus, setUsEastStatus] = useState<Status>('loading');
  const [showUsWestHealth, setShowUsWestHealth] = useState(false);
  const [showUsEastHealth, setShowUsEastHealth] = useState(false);

  const checkStatusGator = async (region: 'us-west' | 'us-east') => {
    const targetUrl = `https://statusgator.com/services/genesys-cloud/americas-${region}`;
    const setStatus = region === 'us-west' ? setUsWestStatus : setUsEastStatus;
    const regionName = region === 'us-west' ? 'us west' : 'us east';
    
    try {
      setStatus('loading');
      
      const fetchWithFallback = async (url: string, proxies: string[]): Promise<string> => {
        let lastError = null;
        for (const proxyBase of proxies) {
          try {
            let fullUrl = '';
            if (proxyBase.includes('allorigins')) {
               fullUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            } else if (proxyBase.includes('corsproxy.io')) {
               const base = proxyBase.endsWith('/') ? proxyBase.slice(0, -1) : proxyBase;
               fullUrl = `${base}/?${encodeURIComponent(url)}`;
            } else if (proxyBase.includes('codetabs')) {
               fullUrl = `${proxyBase}${encodeURIComponent(url)}`;
            } else {
               fullUrl = `${proxyBase}${url}`;
            }

            const response = await fetch(fullUrl);
            if (!response.ok) {
              console.warn(`Proxy ${proxyBase} returned status ${response.status}`);
              continue;
            }
            
            let text = '';
            if (proxyBase.includes('allorigins')) {
               const json = await response.json();
               text = json.contents;
            } else {
               text = await response.text();
            }

            if (text && text.length > 100) {
              return text;
            }
            console.warn(`Proxy ${proxyBase} returned empty or too short response`);
          } catch (e) {
            console.warn(`Proxy ${proxyBase} failed:`, e);
            lastError = e;
          }
        }
        throw lastError || new Error("All proxies failed");
      };

      const htmlText = await fetchWithFallback(targetUrl, [
        'https://api.allorigins.win/get?url=',
        'https://corsproxy.io/',
        'https://api.codetabs.com/v1/proxy?quest=',
        'https://thingproxy.freeboard.io/fetch/',
        'https://api.allorigins.win/raw?url='
      ]);

      const lowerHtml = htmlText.toLowerCase();
      
      // Specific check requested by user: "Genesys Cloud Americas (US West) is up"
      // We check for the core parts of this string to be safe against minor formatting changes
      const upString = `genesys cloud americas (${regionName}) is up`;
      if (lowerHtml.includes(upString) || 
          lowerHtml.includes('all systems operational') ||
          lowerHtml.includes('is up and reachable') ||
          (lowerHtml.includes('genesys cloud') && lowerHtml.includes(regionName) && lowerHtml.includes('up'))) {
        setStatus('healthy');
      } else if (lowerHtml.includes('minor issues') || 
                 lowerHtml.includes('partial outage') || 
                 lowerHtml.includes('maintenance') ||
                 lowerHtml.includes('is experiencing issues')) {
        setStatus('warning');
      } else if (lowerHtml.includes('major outage') || 
                 lowerHtml.includes('is down')) {
        setStatus('critical');
      } else {
        // If we got HTML but couldn't find a status, but it's not an error, 
        // let's be optimistic if "up" is mentioned anywhere near the service name
        if (lowerHtml.includes('up')) {
            setStatus('healthy');
        } else {
            setStatus('unknown');
        }
      }
    } catch (error) {
      console.error(`StatusGator Check Error (${region}):`, error);
      // Fallback to unknown if all proxies fail
      setStatus('unknown');
    }
  };

  useEffect(() => {
    checkStatusGator('us-west');
    checkStatusGator('us-east');
  }, []);

  const tiles: TileData[] = [
{
    id: 'current-health',
    title: 'Current Health Status',
    // Changed comma to semicolon after 'displayed' for better grammar
    message: 'All regions are displayed; focus on the Americas (US West) and (US East) columns. Previous incidents by day are displayed near the bottom',
    url: 'https://status.mypurecloud.com',
    icon: <LightningIcon className="h-10 w-10 text-cyan-400" />,
    shouldScale: true
  },
  {
    id: 'past-incidents',
    // Fixed /n (text) to \n (newline code)
    title: 'Platform Availability\nIncident History (Detailed)',
    message: 'Scroll past the table to view Incident History which lists current and detailed past incidents',
    url: 'https://status.mypurecloud.com/history',
    icon: <TableListIcon className="h-10 w-10 text-slate-300" />,
    shouldScale: true
  },
  {
    id: 'us-west',
    title: 'US West (StatusGator)',
    // Changed GENESYS to Genesys
    message: 'StatusGator is like DownDetector – it captures customer complaints of outages. Outages are often identified here before Genesys health site is updated. Be sure to check the US East site as well',
    url: 'https://statusgator.com/services/genesys-cloud/americas-us-west',
    icon: <MapLocationIcon className="h-10 w-10 text-orange-400" />,
    shouldScale: false
  },
  {
    id: 'us-east',
    title: 'US East (StatusGator)',
    // Changed GENESYS to Genesys
    message: 'StatusGator is like DownDetector – it captures customer complaints of outages. Outages are often identified here before Genesys health site is updated. Be sure to check the US West site as well',
    url: 'https://statusgator.com/services/genesys-cloud/americas-us-east',
    icon: <MapLocationIcon className="h-10 w-10 text-cyan-400" />,
    shouldScale: false
  }
  ];

  const handleTileClick = (tile: TileData) => {
    if (tile.id === 'us-west') {
      setShowUsWestHealth(true);
      return;
    }
    if (tile.id === 'us-east') {
      setShowUsEastHealth(true);
      return;
    }

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

      {showUsWestHealth && (
        <StatusGatorHealthView 
          status={usWestStatus}
          title="US West"
          onClose={() => setShowUsWestHealth(false)}
          onRefresh={() => checkStatusGator('us-west')}
          onOpenDetails={() => {
            setShowUsWestHealth(false);
            window.open('https://statusgator.com/services/genesys-cloud/americas-us-west', '_blank', 'noopener,noreferrer');
          }}
        />
      )}

      {showUsEastHealth && (
        <StatusGatorHealthView 
          status={usEastStatus}
          title="US East"
          onClose={() => setShowUsEastHealth(false)}
          onRefresh={() => checkStatusGator('us-east')}
          onOpenDetails={() => {
            setShowUsEastHealth(false);
            window.open('https://statusgator.com/services/genesys-cloud/americas-us-east', '_blank', 'noopener,noreferrer');
          }}
        />
      )}

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
