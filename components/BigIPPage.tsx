
import React from 'react';
import { BackArrowIcon } from './icons';

interface BigIPPageProps {
  onBack: () => void;
}

const BigIPLogo: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className || "w-48 h-48 mx-auto"}>
        <rect width="24" height="24" rx="4" fill="#1e293b" />
        <g transform="scale(0.85) translate(1.8, 1.8)">
            <circle cx="12" cy="12" r="10" fill="#DC2626"/>
            <path d="M12.2,17.25 C12.2,17.25 15,16.5 15,13 C15,9.5 12.2,7 12.2,7 L12.2,9.25 C12.2,9.25 13.25,10 13.25,13 C13.25,16 12.2,15 12.2,15 L12.2,17.25 Z M9,7 L9,17.25 L11,17.25 L11,7 L9,7 Z" fill="white" />
        </g>
    </svg>
);


const BigIPPage: React.FC<BigIPPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">BIG-IP F5</h1>
      </header>
      <main className="flex-grow flex flex-col items-center">
        <div className="my-8">
            <BigIPLogo className="w-40 h-40" />
        </div>
        
        <div className="w-full max-w-xs space-y-4">
          <button
            onClick={() => window.open('https://aceremoteca.aceclublink.com', '_blank', 'noopener,noreferrer')}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to CA BIG-IP APM"
          >
            CA BIG-IP APM
          </button>
          <button
            onClick={() => window.open('https://aceremotetx.aceclublink.com', '_blank', 'noopener,noreferrer')}
            className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to TX BIG-IP APM"
          >
            TX BIG-IP APM
          </button>
          <button
            onClick={() => window.open('https://aceremote.aceclublink.com', '_blank', 'noopener,noreferrer')}
            className="w-full flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to Load Balanced BIG-IP"
          >
            Load Balanced BIG-IP
          </button>
        </div>

        <div className="mt-8 px-4 text-center text-sm text-slate-400 max-w-sm">
          <p>
            BIG-IP tests only verify that the site is accessible; it does not validate ACE access.
          </p>
          <p className="mt-2">
            If you see the message
            <br />
            <span className="font-bold">'Your session could not be established'</span>
            <br />
            the test to that site <span className="text-green-400 font-bold underline">was</span> successful.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BigIPPage;
