
import React from 'react';
import { BackArrowIcon, PlaceholderIcon, CarCrashIcon } from './icons';

interface SmartITPageProps {
  onBack: () => void;
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

const SmartITPage: React.FC<SmartITPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">ACE Smart IT</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        <ServiceTile 
          icon={<CarCrashIcon />} 
          title="Incidents" 
          onClick={() => window.open('https://aceitsm-or1.onbmc.com/dashboards/d/CmJnGbtVk/ace-incident-table-dashboard?orgId=897459146&from=now-30d&to=now', '_blank', 'noopener,noreferrer')}
        />
        <ServiceTile icon={<PlaceholderIcon />} title="Coming Soon" disabled />
        <ServiceTile icon={<PlaceholderIcon />} title="Coming Soon" disabled />
        <ServiceTile icon={<PlaceholderIcon />} title="Coming Soon" disabled />
        <ServiceTile icon={<PlaceholderIcon />} title="Coming Soon" disabled />
        <ServiceTile icon={<PlaceholderIcon />} title="Coming Soon" disabled />
      </main>
    </div>
  );
};

export default SmartITPage;
