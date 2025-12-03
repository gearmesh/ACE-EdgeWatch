
import React, { useEffect, useState } from 'react';
import { BackArrowIcon, MapIcon } from './icons';

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
    const checkBing = async () => {
      try {
        // Switch to api.allorigins.win for Bing checks as it handles text responses well for this site
        const targetUrl = 'https://www.isitdownrightnow.com/maps.bing.com.html';
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
        
        // Add timestamp to prevent caching
        const response = await fetch(`${proxyUrl}&timestamp=${new Date().getTime()}`);
        const htmlText = await response.text();
        const lowerHtml = htmlText.toLowerCase();

        // Store snippet for debugging
        setBingDebug(htmlText.substring(0, 500));

        // Logic for IsItDownRightNow.com
        
        // 1. Check for the status images (Most reliable method for this site)
        // "up.png" indicates healthy, "down.png" indicates down.
        if (lowerHtml.includes('/img/up.png') || lowerHtml.includes('alt="up"')) {
            setBingStatus('healthy');
        } 
        else if (lowerHtml.includes('/img/down.png') || lowerHtml.includes('alt="down"')) {
            setBingStatus('critical');
        }
        // 2. Check for specific CSS classes
        else if (lowerHtml.includes('class="status_up"') || lowerHtml.includes("class='status_up'") || lowerHtml.includes('status_up')) {
            setBingStatus('healthy');
        } else if (lowerHtml.includes('class="status_down"') || lowerHtml.includes("class='status_down'") || lowerHtml.includes('status_down')) {
            setBingStatus('critical');
        }
        // 3. Fallback to text content checks
        else if (lowerHtml.includes('reachable by us') || lowerHtml.includes('is up and reachable')) {
          setBingStatus('healthy');
        } else if (lowerHtml.includes('is declined') || lowerHtml.includes('refused')) {
          setBingStatus('unreachable');
        } else if (lowerHtml.includes('down for everyone')) {
          setBingStatus('critical');
        } else {
          // If we got HTML but didn't match strings, check if it's a block page
          if (lowerHtml.includes('cloudflare') || lowerHtml.includes('captcha') || lowerHtml.includes('just a moment')) {
             setBingDebug("Blocked by Anti-Bot (Cloudflare).");
             setBingStatus('unknown');
          } else {
             setBingStatus('unknown');
          }
        }
      } catch (error: any) {
        console.error('Error fetching Bing status:', error);
        setBingStatus('unknown');
        setBingDebug(`Error: ${error.message}`);
      }
    };

    const checkGoogle = async () => {
      try {
        // Using corsproxy.io for Google/DownDetector (User confirmed this works)
        const targetUrl = 'https://downdetector.com/status/google-maps/';
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

        const response = await fetch(proxyUrl);
        const htmlText = await response.text();
        const lowerHtml = htmlText.toLowerCase();

        // Store snippet for debugging
        setGoogleDebug(htmlText.substring(0, 500));

        // Check specifically for "no current problems" first
        if (lowerHtml.includes('indicate no current problems') || lowerHtml.includes('no problems at google maps')) {
          setGoogleStatus('healthy');
        } else if (lowerHtml.includes('indicate possible problems')) {
          setGoogleStatus('warning');
        } else if (lowerHtml.includes('indicate problems')) {
          // "indicate problems" matches "indicate NO current problems", so this check must come last
          setGoogleStatus('critical');
        } else {
           if (lowerHtml.includes('cloudflare') || lowerHtml.includes('captcha') || lowerHtml.includes('just a moment')) {
             setGoogleDebug("Blocked by Anti-Bot (Cloudflare). DownDetector is very strict.");
             setGoogleStatus('unknown');
          } else {
             setGoogleStatus('unknown');
          }
        }
      } catch (error: any) {
        console.error('Error fetching Google status:', error);
        setGoogleStatus('unknown');
        setGoogleDebug(`Error: ${error.message}`);
      }
    };

    checkBing();
    checkGoogle();
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
        return { color: 'bg-yellow-500 hover:bg-yellow-600', text: 'Unreachable' };
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
             <MapIcon className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">BING Maps</h2>
          <span className="text-2xl font-semibold text-white uppercase tracking-wider">
            {bingConfig.text}
          </span>
          {bingStatus === 'unknown' && (
             <div className="mt-4 p-2 bg-black/30 rounded text-xs text-left w-full overflow-hidden font-mono h-24 overflow-y-auto">
                <strong>Debug Info (Response Start):</strong><br/>
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
             <MapIcon className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Google Maps</h2>
          <span className="text-2xl font-semibold text-white uppercase tracking-wider">
            {googleConfig.text}
          </span>
          {googleStatus === 'unknown' && (
             <div className="mt-4 p-2 bg-black/30 rounded text-xs text-left w-full overflow-hidden font-mono h-24 overflow-y-auto">
                <strong>Debug Info (Response Start):</strong><br/>
                {googleDebug}
             </div>
          )}
        </button>
      </main>
    </div>
  );
};

export default RadarStatusPage;
