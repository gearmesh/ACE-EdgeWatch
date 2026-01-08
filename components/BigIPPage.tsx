
/**
 * BIG-IP F5 Status Page
 *
 * Provides deep links to F5 BIG-IP APM (Access Policy Manager) portals.
 * Note: These links verify site accessibility only. A "session could not be established"
 * error often indicates a successful network connection to the appliance itself.
 */

import React, { useState } from 'react';
import { BackArrowIcon } from './icons';

interface BigIPPageProps {
  onBack: () => void;
}

const BigIPLogo: React.FC<{className?: string}> = ({className}) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className || "w-48 h-48 mx-auto"}>
    {/* Dark Background Container */}
    <rect width="24" height="24" rx="4" fill="#1e293b" />
    
    {/* Scaling Group to give breathing room inside the square */}
    <g transform="scale(0.85) translate(1.8, 1.8)">
        {/* Red Circle (Updated to F5 Brand Red) */}
        <circle cx="12" cy="12" r="10" fill="#E31E29"/>
        
        {/* The "f5" Text 
           - Centered at 12,12
           - 'dy' adjusts vertical alignment slightly for optical centering
           - negative letter-spacing mimics the tight logo kerning
        */}
        <text 
            x="12" 
            y="12" 
            dy=".35em"
            textAnchor="middle" 
            fill="white" 
            fontFamily="Arial, sans-serif" 
            fontWeight="bold" 
            fontSize="14"
            letterSpacing="-1.5"
        >
            f5
        </text>
    </g>
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
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const BigIPPage: React.FC<BigIPPageProps> = ({ onBack }) => {
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
        message="In the next screen, you may see the message ‘Your Session could not be established.’ Do not be alarmed—this is expected behavior. If a session reference number appears, it confirms that the TSERVICES Portal is accessible and ready for remote users. If you do not see a reference number, please check your connection or contact support."
        onConfirm={handleConfirm}
      />

      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">BIG-IP F5</h1>
      </header>
      <main className="flex-grow flex flex-col items-center">
        <div className="mt-2 mb-6">
            <BigIPLogo className="w-40 h-40" />
        </div>
        
        <div className="w-full max-w-xs space-y-4">
          <button
            onClick={() => handlePortalClick('https://aceremoteca.aceclublink.com')}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to CA BIG-IP APM"
          >
            CA BIG-IP APM
          </button>
          <button
            onClick={() => handlePortalClick('https://aceremotetx.aceclublink.com')}
            className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to TX BIG-IP APM"
          >
            TX BIG-IP APM
          </button>
          <button
            onClick={() => handlePortalClick('https://aceremote.aceclublink.com')}
            className="w-full flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Connect to Load Balanced BIG-IP"
          >
            Load Balanced BIG-IP
          </button>
        </div>

        <div className="mt-6 px-4 text-center text-sm text-slate-400 max-w-sm pb-8">
          <p className="mb-2 font-bold">
            BIG-IP tests only verify that the site is accessible; it does not validate ACE access.
          </p>
          <p>
            If you see the message
          </p>
          <p className="font-bold my-1">
            'Your session could not be established'
          </p>
          <p>
            the test to that site <span className="text-green-400 font-bold underline">was</span> successful.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BigIPPage;
