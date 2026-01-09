
import React, { useState, useEffect } from 'react';
import { BackArrowIcon, MapLocationIcon, SearchEyeIcon, LightningIcon } from './icons';

interface GoogleMapsPageProps {
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
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const GoogleMapsPage: React.FC<GoogleMapsPageProps> = ({ onBack }) => {
  const [status, setStatus] = useState<Status>('loading');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [popup, setPopup] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: ''
  });

  const checkGoogleMaps = async () => {
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
          let fullUrl = `${proxyBase}${encodeURIComponent(targetUrl)}`;
          if (proxyBase.includes('corsproxy.io')) {
             fullUrl = `${proxyBase}?${encodeURIComponent(targetUrl)}`;
          }

          const response = await fetch(fullUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status} from ${proxyBase}`);
          
          const text = await response.text();
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
      
      // 1. Try Scraping First (DownDetector)
      try {
          const targetUrl = 'https://downdetector.com/status/google-maps/';
          const htmlText = await fetchWithFallback(targetUrl, [
               'https://corsproxy.io/'
          ]);
          
          const lowerHtml = htmlText.toLowerCase();
          debugMsg = htmlText.substring(0, 300);

          if (lowerHtml.includes('user reports indicate no current problems')) {
              currentStatus = 'healthy';
          } else if (lowerHtml.includes('user reports indicate possible problems')) {
              currentStatus = 'warning';
          } else if (lowerHtml.includes('user reports indicate problems')) {
              currentStatus = 'critical';
          }
      } catch (scrapeError: any) {
          debugMsg = `Scrape failed: ${scrapeError.message}`;
      }

      // 2. Fallback: Direct Connection Test (Tile Ping)
      if (currentStatus === 'unknown') {
           debugMsg += " | Attempting Direct Ping...";
           const isReachable = await testDirectConnection('https://mt0.google.com/vt/lyrs=m&hl=en&x=0&y=0&z=0');
           
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
      console.error('Google Check Error:', error);
      setStatus('unreachable');
      setDebugInfo(`Critical Failure: ${error.message}`);
    }
  };

  useEffect(() => {
    checkGoogleMaps();
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

  const handleDetailsClick = () => {
    setPopup({
      isOpen: true,
      url: 'https://downdetector.com/status/google-maps/'
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

      <main className="flex-grow flex flex-col gap-6">
        {/* Large Status Card (Half Screen Size) */}
        <button
          onClick={checkGoogleMaps}
          className={`w-full min-h-[40vh] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10 transition-all transform active:scale-[0.98] ring-1 ring-white/10 ${currentConfig.color} ${status === 'loading' ? 'animate-pulse' : ''}`}
        >
          <div className="bg-white/20 p-6 rounded-full mb-6">
             <MapLocationIcon className="h-20 w-20 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">GOOGLE MAPS</h2>
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
          onClick={handleDetailsClick}
          className="w-full bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center justify-between hover:bg-slate-750 transition-colors shadow-lg active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
               <SearchEyeIcon className="h-6 w-6" />
            </div>
            <div className="text-left">
                <h3 className="font-bold text-lg">DownDetector Details</h3>
                <p className="text-xs text-slate-400 leading-tight">View community outage reports</p>
            </div>
          </div>
          <div className="text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Trace log for failures */}
        {(status === 'unknown' || status === 'unreachable') && (
          <div className="mt-2 w-full p-4 bg-black/40 rounded-xl border border-white/5">
            <p className="text-[10px] font-mono text-slate-400 break-all leading-tight">
              <span className="text-red-500 font-bold uppercase mr-2">Debug Trace:</span>
              {debugInfo}
            </p>
          </div>
        )}

        <div className="mt-4 px-6 text-center text-sm text-slate-400 max-w-sm leading-relaxed self-center">
          <p className="mb-4">
            Google Maps API is utilized for spatial analytics and external member mapping features.
          </p>
          <div className="inline-block p-3 bg-green-500/10 rounded-xl border border-green-500/20">
            <p className="text-green-300 font-semibold text-xs uppercase tracking-tighter">Support Tip:</p>
            <p className="text-[11px] mt-1">If the card is red, check if web-based map applications are also failing for other users.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoogleMapsPage;
