
/**
 * Cloud Provider Status Page
 *
 * Dashboard for monitoring major cloud infrastructure providers.
 * Links to external status pages for Azure, AWS, Google Maps, Microsoft 365, etc.
 * Includes specific modal guidance for Salesforce status checking.
 */

import React, { useState } from 'react';
import type { Page } from '../App';
import { BackArrowIcon, MapLocationIcon, CloudIcon, ServerIcon, BuildingIcon, SalesforceIcon, MSEntraIcon, MSTeamsIcon, CloudflareIcon } from './icons';

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

const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-2xl max-w-sm w-full p-6 text-center">
        <p className="text-white text-base mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-8 rounded transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const CloudProviderPage: React.FC<CloudProviderPageProps> = ({ onNavigate }) => {
  const [showSalesforcePopup, setShowSalesforcePopup] = useState(false);

  const handleSalesforceClick = () => {
    setShowSalesforcePopup(true);
  };

  const handleSalesforceConfirm = () => {
    setShowSalesforcePopup(false);
    window.open('https://status.salesforce.com/current', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col min-h-screen p-4 relative">
      <MessageBox 
        isOpen={showSalesforcePopup} 
        message="The Salesforce’s status page shows issues & outages per region. Each ID# details which product or region is affected and what the impact is, so you can quickly see if Salesforce problems might be affecting you." 
        onConfirm={handleSalesforceConfirm} 
      />

      <header className="flex items-center mb-6">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">Cloud Service Monitor</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        <ServiceTile icon={<MapLocationIcon />} title="Bing Maps" onClick={() => window.open('https://www.isitdownrightnow.com/maps.bing.com.html', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<MapLocationIcon />} title="Google Maps" onClick={() => window.open('https://downdetector.com/status/google-maps/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<CloudIcon />} title="Azure" onClick={() => window.open('https://downdetector.com/status/windows-azure/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<ServerIcon />} title="AWS" onClick={() => window.open('https://downdetector.com/status/aws-amazon-web-services/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<BuildingIcon />} title="Microsoft 365" onClick={() => window.open('https://downdetector.com/status/microsoft-365/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<SalesforceIcon />} title="Salesforce" onClick={handleSalesforceClick} />
        <ServiceTile icon={<MSEntraIcon />} title="MS Entra" onClick={() => window.open('https://downdetector.com/status/microsoft-entra/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<MSTeamsIcon />} title="MS Teams" onClick={() => window.open('https://downdetector.com/status/teams/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<CloudflareIcon />} title="Cloudflare" onClick={() => onNavigate('cloudflare-status')} />
      </main>
    </div>
  );
};

export default CloudProviderPage;
