
/**
 * RADAR Status Page (Maps Monitoring)
 *
 * Checks the health status of Bing Maps and Google Maps.
 * 
 * Technical Implementation:
 * 1. Scraping: Attempts to fetch status page HTML via CORS proxies (AllOrigins, CORSProxy.io).
 *    It parses the HTML response text for known "Up" or "Down" keywords/classes.
 * 2. Fallback (Direct Ping): If scraping fails, it attempts to load a generic 1x1 or tile image 
 *    directly from the maps CDN. This is an effective way to verify connectivity even if CORS prevents reading the response data.
 */

import React, { useEffect, useState } from 'react';
import { BackArrowIcon, MapLocationIcon } from './icons';

interface RadarStatusPageProps {
  onBack: () => void;
}

type Status = 'healthy' | 'warning' | 'critical' | 'unreachable' | 'loading' | 'unknown';

const RadarStatusPage: React.FC<RadarStatusPageProps> = ({ onBack }) => {
  const [bingStatus, setBingStatus] = useState<Status>('loading');
  const [googleStatus, setGoogleStatus] = useState<Status>('loading');
  
  // Debug states to hold the raw response for verification
  const [bingDebug, setBingDebug] = useState<string>('');
  const [googleDebug, setGoogleDebug] = useState<string>('');

  useEffect(() => {
    // Helper to perform a direct functional test of the service
    // This bypasses CORS issues by attempting to load an image (opaque response)
    // If the image loads, the service is definitely UP.
    const testDirectConnection = (testImageUrl: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        // Add timestamp to prevent caching
        img.src = `${testImageUrl}&_t=${new Date().getTime()}`;
      });
    };

    const fetchWithFallback = async (targetUrl: string, proxies: string[]): Promise<string> => {
      let lastError;
      for (const proxyBase of proxies) {
        try {
          // Construct URL based on proxy type
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
      let status: Status = 'unknown';
      let debugMsg = '';

      try {
        setBingStatus('loading');
        
        // 1. Try Scraping First
        try {
            const targetUrl = 'https://www.isitdownrightnow.com/maps.bing.com.html';
            const htmlText = await fetchWithFallback(targetUrl, [
                'https://api.allorigins.win/get?url=', // Use AllOrigins JSON mode for better text extraction
                'https://corsproxy.io/'
            ]);
            
            const lowerHtml = htmlText.toLowerCase();
            debugMsg = htmlText.substring(0, 300);

            if (lowerHtml.includes('class="status_up"') || lowerHtml.includes("class='status_up'")) {
                 status = 'healthy';
            } else if (lowerHtml.includes('class="status_down"') || lowerHtml.includes("class='status_down'")) {
                 status = 'critical';
            } else if (lowerHtml.includes('is down for everyone')) {
                status = 'critical';
            } else if (lowerHtml.includes('is up and reachable') || lowerHtml.includes('reachable by us')) {
                status = 'healthy';
            }
        } catch (scrapeError: any) {
            debugMsg = `Scrape failed: ${scrapeError.message}`;
        }

        // 2. Fallback: Direct Connection Test if scrape failed or was inconclusive
        if (status === 'unknown') {
            debugMsg += " | Attempting Direct Ping...";
            // Try to load a generic map tile from Bing Maps CDN
            const isReachable = await testDirectConnection('https://ecn.t0.tiles.virtualearth.net/tiles/r0.jpeg?g=1&mkt=en-US');
            
            if (isReachable) {
                status = 'healthy';
                debugMsg += " | Direct Ping: SUCCESS";
            } else {
                status = 'unreachable';
                debugMsg += " | Direct Ping: FAILED";
            }
        }

        setBingStatus(status);
        setBingDebug(debugMsg);

      } catch (error: any) {
        console.error('Bing Check Error:', error);
        setBingStatus('unreachable');
        setBingDebug(`Critical Failure: ${error.message}`);
      }
    };

    const checkGoogleMaps = async () => {
      let status: Status = 'unknown';
      let debugMsg = '';

      try {
        setGoogleStatus('loading');
        
        // 1. Try Scraping First
        try {
            const targetUrl = 'https://downdetector.com/status/google-maps/';
            const htmlText = await fetchWithFallback(targetUrl, [
                 'https://corsproxy.io/'
            ]);
            
            const lowerHtml = htmlText.toLowerCase();
            debugMsg = htmlText.substring(0, 300);

            if (lowerHtml.includes('user reports indicate no current problems')) {
                status = 'healthy';
            } else if (lowerHtml.includes('user reports indicate possible problems')) {
                status = 'warning';
            } else if (lowerHtml.includes('user reports indicate problems')) {
                status = 'critical';
            }
        } catch (scrapeError: any) {
            debugMsg = `Scrape failed: ${scrapeError.message}`;
        }

        // 2. Fallback: Direct Connection Test
        if (status === 'unknown') {
             debugMsg += " | Attempting Direct Ping...";
             // Try to load a generic map tile from Google Maps
             const isReachable = await testDirectConnection('https://mt0.google.com/vt/lyrs=m&hl=en&x=0&y=0&z=0');
             
             if (isReachable) {
                 status = 'healthy';
                 debugMsg += " | Direct Ping: SUCCESS";
             } else {
                 status = 'unreachable';
                 debugMsg += " | Direct Ping: FAILED";
             }
        }
        
        setGoogleStatus(status);
        setGoogleDebug(debugMsg);

      } catch (error: any) {
        console.error('Google Check Error:', error);
        setGoogleStatus('unreachable');
        setGoogleDebug(`Critical Failure: ${error.message}`);
      }
    };

    checkBing();
    checkGoogleMaps();
  }, []);

  const getStatusConfig = (status: Status) => {
    switch (status) {
      case 'healthy':
        return { color: 'bg-green-600 hover:bg-green-700', text: 'Healthy' };
      case 'warning':
        return { color: 'bg-yellow-500 hover:bg-yellow-600', text: 'Warning' };
      case 'critical':
        return { color: 'bg-red-600 hover:bg-red-700', text: 'Critical' };
      case 'unreachable':
        return { color: 'bg-red-600 hover:bg-red-700', text: 'Unreachable' }; // Using Red for Unreachable
      case 'loading':
        return { color: 'bg-slate-700 hover:bg-slate-800', text: 'Checking...' };
      case 'unknown':
      default:
        return { color: 'bg-slate-600 hover:bg-slate-700', text: 'Unknown' };
    }
  };

  const bingConfig = getStatusConfig(bingStatus);
  const googleConfig = getStatusConfig(googleStatus);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">RADAR & Member Validation</h1>
      </header>
      <main className="flex-grow flex flex-col gap-6">
        {/* Bing Maps Button */}
        <button
          onClick={() => window.open('https://www.isitdownrightnow.com/maps.bing.com.html', '_blank', 'noopener,noreferrer')}
          className={`flex-1 w-full rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 transition-all transform hover:scale-[1.02] ${bingConfig.color}`}
        >
          <div className="bg-white/20 p-4 rounded-full mb-4">
             <MapLocationIcon className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">BING Maps</h2>
          <span className="text-2xl font-semibold text-white uppercase tracking-wider">
            {bingConfig.text}
          </span>
          <span className="text-sm font-medium text-white/80 mt-1">Press to go Details</span>
          
          {(bingStatus === 'unknown') && (
              <div className="mt-4 p-2 bg-black/30 rounded text-xs text-left w-full overflow-hidden font-mono h-24 overflow-y-auto break-all">
                <strong>Debug Info:</strong><br/>
                {bingDebug}
              </div>
          )}
        </button>

        {/* Google Maps Button */}
        <button
          onClick={() => window.open('https://downdetector.com/status/google-maps/', '_blank', 'noopener,noreferrer')}
          className={`flex-1 w-full rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 transition-all transform hover:scale-[1.02] ${googleConfig.color}`}
        >
          <div className="bg-white/20 p-4 rounded-full mb-4">
             <MapLocationIcon className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Google Maps</h2>
          <span className="text-2xl font-semibold text-white uppercase tracking-wider">
            {googleConfig.text}
          </span>
          <span className="text-sm font-medium text-white/80 mt-1">Press to go Details</span>

          {(googleStatus === 'unknown') && (
              <div className="mt-4 p-2 bg-black/30 rounded text-xs text-left w-full overflow-hidden font-mono h-24 overflow-y-auto break-all">
                <strong>Debug Info:</strong><br/>
                {googleDebug}
              </div>
          )}
        </button>
      </main>
    </div>
  );
};

export default RadarStatusPage;
