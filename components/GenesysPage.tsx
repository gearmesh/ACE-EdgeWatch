
import React from 'react';
import { BackArrowIcon, PlaceholderIcon, OldPhoneIcon } from './icons';

interface GenesysPageProps {
  onBack: () => void;
}

const GenesysPage: React.FC<GenesysPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2 tracking-wide">GENESYS Health Check</h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="mt-2 mb-10 text-cyan-400">
            <OldPhoneIcon className="w-24 h-24" />
        </div>

        <div className="grid grid-cols-1 gap-6 w-full max-w-xs">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center space-y-3 shadow-lg"
            >
              <PlaceholderIcon />
              <span className="text-slate-400 font-medium">Metric {item}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-400 text-sm max-w-xs">
          <p>Additional Genesys cloud metrics and regional health status indicators will be available in the next release.</p>
        </div>
      </main>
    </div>
  );
};

export default GenesysPage;
