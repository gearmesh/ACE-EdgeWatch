
/**
 * PulseSecure Gateway Status Page
 *
 * Provides deep links to specific PulseSecure VPN gateways (CA, TX, and Load Balanced).
 * Used to verify gateway reachability and login page rendering.
 */

import React, { useState } from 'react';
import { BackArrowIcon } from './icons';

interface PulseSecurePageProps {
  onBack: () => void;
}

const PulseSecureLogo: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 45" className={className || "w-48 h-48 mx-auto"}>
        <path fill="#ffffff" d="M0 0L0 45L43 45L43 0L0 0z"/>
        <path fill="#5dbb47" d="M33 35C32.1012 26.2653 22.4823 18.3608 16 13L16 12L22 6L23 6L29 12L29 13L25 16C32.7897 22.1889 34.3451 5.63803 23.9999 2.81854C18.2347 1.24731 11.0331 9.53087 13.076 14.9895C15.7428 22.1149 26.451 31.7098 33 35z"/>
        <path fill="#19232b" d="M10 32L10 33C13.4435 36.4409 31.5002 49.5168 27 35L26 35L23 39C19.1563 35.1675 15.7653 30.228 10 32z"/>
    </svg>
);

// Local Modal Component for Guidance
const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/10">
        <p className="text-white text-lg mb-6 leading-relaxed font-medium">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const PulseSecurePage: React.FC<PulseSecurePageProps> = ({ onBack }) => {
  const [popup, setPopup] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: ''
  });

  const handlePortalClick = (url: string) => {
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
        message="In the next screen, you should see the TSERVICES Portal login page. This indicates that the portal is accessible and ready for remote users. If the login screen does not appear, please verify your network connection or contact support."
        onConfirm={handleConfirm}
      />

      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">PulseSecure</h1>
      </header>
      <main className="flex-grow flex flex-col items-center">
        <div className="mt-2 mb-6">
            <PulseSecureLogo className="w-40 h-40" />
        </div>
        
        <div className="w-full max-w-xs space-y-4">
          <button
            onClick={() => handlePortalClick('https://connectca.aceclublink.com/tserv')}
            className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to CA PulseSecure"
          >
            CA PulseSecure
          </button>
          <button
            onClick={() => handlePortalClick('https://connecttx.aceclublink.com/tserv')}
            className="w-full flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to TX PulseSecure"
          >
            TX PulseSecure
          </button>
          <button
            onClick={() => handlePortalClick('https://connect.aceclublink.com/tserv')}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to Load Balanced PulseSecure"
          >
            Load Balanced PulseSecure
          </button>
        </div>

        <div className="mt-6 px-4 text-center text-sm text-slate-400 max-w-sm pb-8">
          <p className="mb-2">
            The PulseSecure Gateway test checks that the site is reachable and displays the login page, confirming gateway health.
          </p>
          <p>
            Users with PulseSecure access, may log in to perform an end-to-end access test.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PulseSecurePage;
