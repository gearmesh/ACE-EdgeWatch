
import React, { useEffect, useState } from 'react';
import { BackArrowIcon, CloudflareIcon } from './icons';

interface CloudflareStatusPageProps {
  onBack: () => void;
}

interface LocationStatus {
  name: string;
  status: string;
}

const CloudflareStatusPage: React.FC<CloudflareStatusPageProps> = ({ onBack }) => {
  const [locations, setLocations] = useState<LocationStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const targetUrl = 'https://www.cloudflarestatus.com/';
        // Use corsproxy.io as primary, allorigins as backup
        const proxies = [
          'https://corsproxy.io/?' + encodeURIComponent(targetUrl),
          'https://api.allorigins.win/get?url=' + encodeURIComponent(targetUrl)
        ];

        let htmlText = '';
        let success = false;

        for (const proxyUrl of proxies) {
          try {
            const response = await fetch(proxyUrl);
            if (!response.ok) continue;

            if (proxyUrl.includes('allorigins')) {
               const data = await response.json();
               htmlText = data.contents;
            } else {
               htmlText = await response.text();
            }

            if (htmlText) {
              success = true;
              break;
            }
          } catch (e) {
            console.warn("Proxy failed", e);
          }
        }

        if (!success || !htmlText) {
          throw new Error("Unable to fetch status data. Please try again later.");
        }

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Find the "North America" component container
        // Structure is usually: .component-container > .component-inner-container > .name (text=North America)
        const nameElements = Array.from(doc.querySelectorAll('.name'));
        const naHeader = nameElements.find(el => el.textContent?.trim() === 'North America');

        if (!naHeader) {
          throw new Error("North America section not found in status page.");
        }

        // Navigate up to the component container
        // .component-inner-container -> .component-container
        const container = naHeader.closest('.component-container');
        if (!container) {
          throw new Error("Could not identify status container.");
        }

        // Find children components
        const childContainer = container.querySelector('.child-components-container');
        if (!childContainer) {
           throw new Error("No locations found under North America.");
        }

        const componentRows = Array.from(childContainer.querySelectorAll('.component-inner-container'));
        
        const extracted: LocationStatus[] = componentRows.map(row => {
          const nameEl = row.querySelector('.name');
          const statusEl = row.querySelector('.component-status');
          return {
            name: nameEl?.textContent?.trim() || 'Unknown Location',
            status: statusEl?.textContent?.trim() || 'Unknown'
          };
        }).filter(item => item.name !== 'Unknown Location');

        setLocations(extracted);
        setLastUpdated(new Date().toLocaleTimeString());

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'operational') return 'text-green-400';
    if (s.includes('maintenance')) return 'text-blue-400';
    if (s.includes('degraded')) return 'text-yellow-400';
    if (s.includes('outage')) return 'text-red-500';
    return 'text-slate-400';
  };

  const getStatusDot = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'operational') return 'bg-green-500';
    if (s.includes('maintenance')) return 'bg-blue-500';
    if (s.includes('degraded')) return 'bg-yellow-500';
    if (s.includes('outage')) return 'bg-red-500';
    return 'bg-slate-500';
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6 sticky top-0 bg-slate-900 z-10 py-2">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-800 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <div className="ml-2">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <CloudflareIcon />
            Cloudflare Status
          </h1>
          <p className="text-xs text-slate-400">North America Region</p>
        </div>
      </header>

      <main className="flex-grow">
        {loading && (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-slate-400 animate-pulse">Fetching latest status...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500 p-6 rounded-lg text-center">
            <p className="text-white font-semibold mb-2">Error Loading Status</p>
            <p className="text-red-200 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && locations.length > 0 && (
          <div className="space-y-4">
            <div className="text-right text-xs text-slate-500 mb-2">
              Last updated: {lastUpdated}
            </div>
            <div className="grid gap-3">
              {locations.map((loc, idx) => (
                <div key={idx} className="bg-slate-800 p-4 rounded-lg flex items-center justify-between shadow-sm hover:bg-slate-750 transition-colors">
                  <span className="font-medium text-slate-200">{loc.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${getStatusColor(loc.status)}`}>
                      {loc.status}
                    </span>
                    <span className={`h-3 w-3 rounded-full ${getStatusDot(loc.status)}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && locations.length === 0 && (
          <div className="text-center p-8 text-slate-400">
            No locations found for North America.
          </div>
        )}
      </main>
    </div>
  );
};

export default CloudflareStatusPage;
