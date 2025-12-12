
/**
 * Remote Access Menu Component
 *
 * Provides navigation to the various remote access gateway status pages:
 * PulseSecure, Citrix, and BIG-IP F5.
 */

import React from 'react';
import type { Page } from '../App';
import { BackArrowIcon, PulseSecureIcon, CitrixIcon, BigIPIcon } from './icons';

interface RemoteAccessPageProps {
  onNavigate: (page: Page) => void;
}

interface TileProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ServiceTile: React.FC<TileProps> = ({ icon, title, onClick, disabled = false }) => {
  const baseClasses = "bg-slate-800 rounded-lg p-4 flex flex-col items-center justify-center aspect-square text-center space-y-2 transition-all duration-200";
  const interactiveClasses = "hover:bg-slate-700 hover:scale-105 transform cursor-pointer";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : interactiveClasses}`}
    >
      {icon}
      <span className="font-semibold text-sm">{title}</span>
    </button>
  );
};

const RemoteAccessPage: React.FC<RemoteAccessPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">Remote Access Portals</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        <ServiceTile icon={<PulseSecureIcon className="h-16 w-16" />} title="PulseSecure" onClick={() => onNavigate('pulsesecure')} />
        <ServiceTile icon={<CitrixIcon className="h-16 w-16" />} title="Citrix" onClick={() => onNavigate('citrix')} />
        <ServiceTile icon={<BigIPIcon className="h-16 w-16" />} title="BIG-IP F5" onClick={() => onNavigate('bigip')} />
      </main>
    </div>
  );
};

export default RemoteAccessPage;
