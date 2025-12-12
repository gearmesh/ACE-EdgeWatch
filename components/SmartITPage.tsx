
/**
 * Smart IT / BMC Helix Page
 *
 * Menu for accessing the ITSM dashboard (BMC Helix) for Incident/Change management.
 * Also provides access to app utility features like "Share App" and "Help".
 */

import React from 'react';
import type { Page } from '../App';
import { BackArrowIcon, PlaceholderIcon, CarCrashIcon, GiftIcon, QuestionIcon, LightningIcon, SearchEyeIcon, TableListIcon } from './icons';

interface SmartITPageProps {
  onBack: () => void;
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

const SmartITPage: React.FC<SmartITPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">ACE Smart IT</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        {/* 1. ACE Outages Dashboard */}
        <ServiceTile 
          icon={<LightningIcon />} 
          title="ACE Outages Dashboard" 
          onClick={() => window.open('https://aceitsm-or1.onbmc.com/dashboards/d/c97df517-795d-4a3b-9920-c8cca2139a8e/ace-outage-dashboard?orgId=897459146', '_blank', 'noopener,noreferrer')}
        />

        {/* 2. ACE Problem Investigation */}
        <ServiceTile 
          icon={<SearchEyeIcon />} 
          title="ACE Problem Investigation" 
          onClick={() => window.open('https://aceitsm-or1.onbmc.com/dashboards/d/f0c4c61b-cebb-415e-86b1-6c0849c0116b/ace-outage-problem-investigation?orgId=897459146', '_blank', 'noopener,noreferrer')}
        />

        {/* 3. ACE Incident Table Dashboard */}
        <ServiceTile 
          icon={<TableListIcon />} 
          title="ACE Incident Table Dashboard" 
          onClick={() => window.open('https://aceitsm-or1.onbmc.com/dashboards/d/CmJnGbtVk/ace-incident-table-dashboard?orgId=897459146', '_blank', 'noopener,noreferrer')}
        />

        {/* 4. Incidents Dashboard (Renamed from Incidents) */}
        <ServiceTile 
          icon={<CarCrashIcon />} 
          title="Incidents Dashboard" 
          onClick={() => window.open('https://aceitsm-or1.onbmc.com/dashboards/d/CmJnGbtVk/ace-incident-table-dashboard?orgId=897459146&from=now-30d&to=now', '_blank', 'noopener,noreferrer')}
        />

        {/* 5. Help */}
        <ServiceTile 
          icon={<QuestionIcon className="h-8 w-8 text-cyan-400" />} 
          title="Help" 
          onClick={() => onNavigate('help')}
        />

        {/* 6. Share App */}
        <ServiceTile 
          icon={<GiftIcon className="h-8 w-8 text-blue-400" />} 
          title="Share App" 
          onClick={() => onNavigate('share')}
        />
      </main>
    </div>
  );
};

export default SmartITPage;
