
import React, { useState, useEffect } from 'react';
import { BackArrowIcon, MapLocationIcon, LightningIcon } from './icons';

interface BingMapsPageProps {
  onBack: () => void;
}

type Status = 'healthy' | 'warning' | 'critical' | 'unreachable' | 'loading' | 'unknown';

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
  const [status, setStatus] = useState<Status>('loading');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [popup, setPopup] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: ''
  });

  const checkBing = async () => {
    let currentStatus: Status = 'unknown';
    let debugMsg = '';

    const testDirectConnection = (testImageUrl: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = `${testImageUrl}&_t=${new Date().getTime()}`;
      });
    };

    const fetchWithFallback = async (targetUrl: string, proxies: string[]): Promise<string> => {
      let lastError;
      for (const proxyBase of proxies) {
        try {
          let fullUrl = '';
          if (proxyBase.includes('allorigins')) {
             fullUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
          } else if (proxyBase.includes('corsproxy.io')) {
             fullUrl = `${proxyBase}?${encodeURIComponent(targetUrl)}`;
          } else {
             fullUrl = `${proxyBase}${encodeURIComponent(targetUrl)}`;
          }

          const response = await fetch(fullUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status} from ${proxyBase}`);
          
          let text = '';
          if (proxyBase.includes('allorigins')) {
             const json = await response.json();
             text = json.contents;
          } else {
             text = await response.text();
          }

          if (!text) throw new Error(`Empty response from ${proxyBase}`);
          return text;
        } catch (e) {
          console.warn(`Proxy ${proxyBase} failed:`, e);
          lastError = e;
        }
      }
      throw lastError || new Error("All proxies failed");
    };

    try {
      setStatus('loading');
      
      // 1. Try Scraping First
      try {
          const targetUrl = 'https://www.isitdownrightnow.com/maps.bing.com.html';
          const htmlText = await fetchWithFallback(targetUrl, [
              'https://api.allorigins.win/get?url=',
              'https://corsproxy.io/'
          ]);
          
          const lowerHtml = htmlText.toLowerCase();
          debugMsg = htmlText.substring(0, 300);

          if (lowerHtml.includes('class="status_up"') || lowerHtml.includes("class='status_up'")) {
               currentStatus = 'healthy';
          } else if (lowerHtml.includes('class="status_down"') || lowerHtml.includes("class='status_down'")) {
               currentStatus = 'critical';
          } else if (lowerHtml.includes('is down for everyone')) {
              currentStatus = 'critical';
          } else if (lowerHtml.includes('is up and reachable') || lowerHtml.includes('reachable by us')) {
              currentStatus = 'healthy';
          }
      } catch (scrapeError: any) {
          debugMsg = `Scrape failed: ${scrapeError.message}`;
      }

      // 2. Fallback: Direct Connection Test
      if (currentStatus === 'unknown') {
          debugMsg += " | Attempting Direct Ping...";
          const isReachable = await testDirectConnection('https://ecn.t0.tiles.virtualearth.net/tiles/r0.jpeg?g=1&mkt=en-US');
          
          if (isReachable) {
              currentStatus = 'healthy';
              debugMsg += " | Direct Ping: SUCCESS";
          } else {
              currentStatus = 'unreachable';
              debugMsg += " | Direct Ping: FAILED";
          }
      }

      setStatus(currentStatus);
      setDebugInfo(debugMsg);

    } catch (error: any) {
      console.error('Bing Check Error:', error);
      setStatus('unreachable');
      setDebugInfo(`Critical Failure: ${error.message}`);
    }
  };

  useEffect(() => {
    checkBing();
  }, []);

  const getStatusConfig = (s: Status) => {
    switch (s) {
      case 'healthy':
        return { color: 'bg-green-600 hover:bg-green-700 shadow-green-500/20', text: 'Healthy' };
      case 'warning':
        return { color: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20', text: 'Warning' };
      case 'critical':
      case 'unreachable':
        return { color: 'bg-red-600 hover:bg-red-700 shadow-red-500/20', text: 'Service Down' };
      case 'loading':
        return { color: 'bg-slate-700 hover:bg-slate-800', text: 'Checking...' };
      default:
        return { color: 'bg-slate-600 hover:bg-slate-700', text: 'Unknown' };
    }
  };

  const currentConfig = getStatusConfig(status);

  const handleTileClick = () => {
    setPopup({
      isOpen: true,
      url: 'https://www.isitdownrightnow.com/maps.bing.com.html'
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

      <main className="flex-grow flex flex-col gap-6">
        {/* Large Status Card (Half Screen Size) */}
        <button
          onClick={checkBing}
          className={`w-full min-h-[40vh] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10 transition-all transform active:scale-[0.98] ring-1 ring-white/10 ${currentConfig.color} ${status === 'loading' ? 'animate-pulse' : ''}`}
        >
          <div className="bg-white/20 p-6 rounded-full mb-6">
             <MapLocationIcon className="h-20 w-20 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">BING MAPS</h2>
          <span className="text-3xl font-bold text-white uppercase tracking-widest drop-shadow-md">
            {currentConfig.text}
          </span>
          <p className="text-sm font-medium text-white/70 mt-4 flex items-center gap-2">
            <LightningIcon className="h-4 w-4" />
            Tap to Refresh
          </p>
        </button>

        {/* View Details Button */}
        <button
          onClick={handleTileClick}
          className="w-full bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center justify-between hover:bg-slate-750 transition-colors shadow-lg active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
               <LightningIcon className="h-6 w-6" />
            </div>
            <div className="text-left">
                <h3 className="font-bold text-lg">External Analysis</h3>
                <p className="text-xs text-slate-400 leading-tight">Check IsItDownRightNow details</p>
            </div>
          </div>
          <div className="text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Debug Trace (Collapsed/Minimal) */}
        {(status === 'unknown' || status === 'unreachable') && (
          <div className="mt-2 w-full p-4 bg-black/40 rounded-xl border border-white/5">
            <p className="text-[10px] font-mono text-slate-400 break-all leading-tight">
              <span className="text-red-500 font-bold uppercase mr-2">Trace Log:</span>
              {debugInfo}
            </p>
          </div>
        )}

        <div className="mt-4 px-6 text-center text-sm text-slate-400 max-w-sm leading-relaxed self-center">
          <p className="mb-4">
            Bing Maps powers location services for RADAR. If the status is not Healthy, map performance may be degraded.
          </p>
          <div className="inline-block p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <p className="text-blue-300 font-semibold text-xs uppercase tracking-tighter">Support Recommendation:</p>
            <p className="text-[11px] mt-1">Direct users to verify local internet connectivity if this status remains healthy during reported issues.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BingMapsPage;
