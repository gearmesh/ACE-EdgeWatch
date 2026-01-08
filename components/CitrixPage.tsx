
/**
 * Citrix Gateway Status Page
 *
 * Provides deep links to NetScaler Gateway login pages for CA, TX, and Load Balanced endpoints.
 * Used for verifying external reachability of the Citrix environment.
 */

import React, { useState } from 'react';
import { BackArrowIcon, CitrixIcon } from './icons';

interface CitrixPageProps {
  onBack: () => void;
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
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const CitrixPage: React.FC<CitrixPageProps> = ({ onBack }) => {
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
        message="In the next screen, you should see the Citrix Gateway login page with three input fields. This confirms the gateway is accessible. If the page does not appear or looks different, please verify your network connection or contact support for assistance."
        onConfirm={handleConfirm}
      />

      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">Citrix</h1>
      </header>
      <main className="flex-grow flex flex-col items-center">
        <div className="mt-2 mb-6">
            <CitrixIcon className="w-40 h-40" />
        </div>
        
        <div className="w-full max-w-xs space-y-4">
          <button
            onClick={() => handlePortalClick('https://myappsca.aceclubnet.com/logon/LogonPoint/tmindex.html')}
            className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to CA NetScaler Gateway"
          >
            CA NetScaler Gateway
          </button>
          <button
            onClick={() => handlePortalClick('https://myappstx.aceclubnet.com/logon/LogonPoint/tmindex.html')}
            className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to TX NetScaler Gateway"
          >
            TX NetScaler Gateway
          </button>
          <button
            onClick={() => handlePortalClick('https://myapps.aceclubnet.com/logon/LogonPoint/tmindex.html')}
            className="w-full flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to Load Balanced Gateway"
          >
            Load Balanced Gateway
          </button>
        </div>

        <div className="mt-6 px-4 text-center text-sm text-slate-400 max-w-sm pb-8">
          <p className="mb-2">
            The Citrix NetScaler Gateway tests check that the site is reachable and displays the login page, confirming gateway health.
          </p>
          <p>
            Users with Citrix access may log in to perform an end-to-end access test.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CitrixPage;
