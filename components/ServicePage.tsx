
import React from 'react';
import { BackArrowIcon } from './icons';

interface ServicePageProps {
  serviceName: string;
  onBack: () => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ serviceName, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">{serviceName} Status</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center text-slate-400">
        <div className="p-8 border-2 border-dashed border-slate-700 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-2">
            All Systems Operational
          </h2>
          <p>Status information for {serviceName} will be displayed here.</p>
        </div>
      </main>
    </div>
  );
};

export default ServicePage;
