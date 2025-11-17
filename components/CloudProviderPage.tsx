
import React from 'react';
import type { Page } from '../App';
import { BackArrowIcon, MapIcon, CloudIcon, ServerIcon, BuildingIcon, SalesforceIcon, MSEntraIcon, MSTeamsIcon } from './icons';

interface CloudProviderPageProps {
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

const CloudProviderPage: React.FC<CloudProviderPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">Cloud Service Monitor</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        <ServiceTile icon={<MapIcon />} title="Bing Maps" onClick={() => window.open('https://www.isitdownrightnow.com/maps.bing.com.html', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<MapIcon />} title="Google Maps" onClick={() => window.open('https://downdetector.com/status/google-maps/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<CloudIcon />} title="Azure" onClick={() => window.open('https://downdetector.com/status/windows-azure/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<ServerIcon />} title="AWS" onClick={() => window.open('https://downdetector.com/status/aws-amazon-web-services/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<BuildingIcon />} title="Microsoft 365" onClick={() => window.open('https://downdetector.com/status/microsoft-365/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<SalesforceIcon />} title="Salesforce" onClick={() => window.open('https://status.salesforce.com/current', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<MSEntraIcon />} title="MS Entra" onClick={() => window.open('https://downdetector.com/status/microsoft-entra/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<MSTeamsIcon />} title="MS Teams" onClick={() => window.open('https://downdetector.com/status/teams/', '_blank', 'noopener,noreferrer')} />
      </main>
    </div>
  );
};

export default CloudProviderPage;
