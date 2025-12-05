
import React from 'react';
import { BackArrowIcon } from './icons';

interface PulseSecurePageProps {
  onBack: () => void;
}

const PulseSecureLogo: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className || "w-48 h-48 mx-auto"}>
        <rect width="24" height="24" rx="4" fill="#1e293b" />
        <g transform="scale(0.85) translate(1.8, 1.8)">
          <path d="M10 3 H14 C16.2,3 18,4.8 18,7 V9 C18,11.2 16.2,13 14,13 H10 V15 C10,16.1 9.1,17 8,17 H5 V14 C5,12.9 5.9,12 7,12 H10 V3 Z" fill="#4ade80" />
          <path d="M8 17 V21 H17 V17 H8 Z" fill="white" />
        </g>
    </svg>
);


const PulseSecurePage: React.FC<PulseSecurePageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2">
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
            onClick={() => window.open('https://connectca.aceclublink.com/tserv', '_blank', 'noopener,noreferrer')}
            className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to CA PulseSecure"
          >
            CA PulseSecure
          </button>
          <button
            onClick={() => window.open('https://connecttx.aceclublink.com/tserv', '_blank', 'noopener,noreferrer')}
            className="w-full flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to TX PulseSecure"
          >
            TX PulseSecure
          </button>
          <button
            onClick={() => window.open('https://connect.aceclublink.com/tserv', '_blank', 'noopener,noreferrer')}
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
