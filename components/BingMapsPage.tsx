
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

  useEffect(() => {
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

    const checkBing = async () => {
      let currentStatus: Status = 'unknown';
      let debugMsg = '';

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

    checkBing();
  }, []);

  const getStatusConfig = (s: Status) => {
    switch (s) {
      case 'healthy':
        return { color: 'bg-green-600 border-green-500', text: 'Healthy', iconColor: 'text-green-300' };
      case 'warning':
        return { color: 'bg-yellow-600 border-yellow-500', text: 'Warning', iconColor: 'text-yellow-200' };
      case 'critical':
      case 'unreachable':
        return { color: 'bg-red-600 border-red-500', text: 'Service Down', iconColor: 'text-red-200' };
      case 'loading':
        return { color: 'bg-slate-800 border-slate-700', text: 'Checking Status...', iconColor: 'text-blue-400' };
      default:
        return { color: 'bg-slate-800 border-slate-700', text: 'Check Status', iconColor: 'text-blue-400' };
    }
  };

  const currentConfig = getStatusConfig(status);

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
            <div className={`p-8 rounded-full ring-4 transition-all duration-700 ${status === 'healthy' ? 'bg-green-500/20 ring-green-500/30' : 'bg-blue-500/20 ring-blue-500/30'} ${status === 'loading' ? 'animate-pulse' : ''}`}>
                <MapLocationIcon className={`w-24 h-24 transition-colors duration-700 ${status === 'healthy' ? 'text-green-400' : 'text-blue-400'}`} />
            </div>
        </div>
        
        <div className="w-full max-w-xs space-y-6">
          <button
            onClick={() => handleTileClick('https://www.isitdownrightnow.com/maps.bing.com.html')}
            className={`w-full flex flex-col items-center gap-3 border p-6 rounded-2xl shadow-xl transition-all transform hover:scale-[1.03] group ${currentConfig.color}`}
          >
            <LightningIcon className={`h-10 w-10 group-hover:scale-110 transition-transform ${currentConfig.iconColor}`} />
            <div className="text-center">
                <h3 className="font-bold text-lg">{currentConfig.text}</h3>
                <p className="text-xs text-white/70 mt-1">Tap for details on IsItDownRightNow</p>
            </div>
          </button>
        </div>

        {status === 'unknown' && (
          <div className="mt-6 w-full max-w-xs p-3 bg-black/40 rounded-lg border border-white/10 overflow-hidden">
            <p className="text-[10px] font-mono text-slate-400 break-all leading-relaxed">
              <span className="text-cyan-500 font-bold uppercase">Debug Trace:</span><br/>
              {debugInfo}
            </p>
          </div>
        )}

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
