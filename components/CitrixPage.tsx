
/**
 * Citrix Gateway Status Page
 *
 * Provides deep links to NetScaler Gateway login pages for CA, TX, and Load Balanced endpoints.
 * Used for verifying external reachability of the Citrix environment.
 */

import React from 'react';
import { BackArrowIcon, CitrixIcon } from './icons';

interface CitrixPageProps {
  onBack: () => void;
}

const CitrixPage: React.FC<CitrixPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2">
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
            onClick={() => window.open('https://myappsca.aceclubnet.com/logon/LogonPoint/tmindex.html', '_blank', 'noopener,noreferrer')}
            className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to CA NetScaler Gateway"
          >
            CA NetScaler Gateway
          </button>
          <button
            onClick={() => window.open('https://myappstx.aceclubnet.com/logon/LogonPoint/tmindex.html', '_blank', 'noopener,noreferrer')}
            className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to TX NetScaler Gateway"
          >
            TX NetScaler Gateway
          </button>
          <button
            onClick={() => window.open('https://myapps.aceclubnet.com/logon/LogonPoint/tmindex.html', '_blank', 'noopener,noreferrer')}
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
