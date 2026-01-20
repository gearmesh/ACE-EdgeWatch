
/**
 * Smart IT / BMC Helix Page
 *
 * Menu for accessing the ITSM dashboard (BMC Helix) for Incident/Change management.
 * Also provides access to app utility features like "Share App" and "Help".
 */

import React, { useState } from 'react';
import type { Page } from '../App';
import { BackArrowIcon, QuestionIcon, LightningIcon, SearchEyeIcon, TableListIcon, EyeIcon, ShareIcon } from './icons';

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

const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4 backdrop-blur-sm animate-[fade-in-up_0.2s_ease-out]">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/10">
        <p className="text-white text-lg mb-6 font-medium leading-relaxed">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const SmartITPage: React.FC<SmartITPageProps> = ({ onBack, onNavigate }) => {
  const [popup, setPopup] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: ''
  });

  const handleDashboardClick = (url: string) => {
    setPopup({ isOpen: true, url });
  };

  const handleConfirm = () => {
    const urlToOpen = popup.url;
    setPopup({ isOpen: false, url: '' });
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <MessageBox 
        isOpen={popup.isOpen}
        message="ACE Smart IT is loading. This may take a moment"
        onConfirm={handleConfirm}
      />

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
          onClick={() => handleDashboardClick('https://aceitsm-or1.onbmc.com/dashboards/d/c97df517-795d-4a3b-9920-c8cca2139a8e/ace-outage-dashboard?orgId=897459146')}
        />

        {/* 2. ACE Problem Investigation */}
        <ServiceTile 
          icon={<SearchEyeIcon />} 
          title="ACE Problem Investigation" 
          onClick={() => handleDashboardClick('https://aceitsm-or1.onbmc.com/dashboards/d/f0c4c61b-cebb-415e-86b1-6c0849c0116b/ace-outage-problem-investigation?orgId=897459146')}
        />

        {/* 3. ACE Incident Table Dashboard */}
        <ServiceTile 
          icon={<TableListIcon />} 
          title="ACE Incident Table Dashboard" 
          onClick={() => handleDashboardClick('https://aceitsm-or1.onbmc.com/dashboards/d/CmJnGbtVk/ace-incident-table-dashboard?orgId=897459146')}
        />

        {/* 4. Help & Feedback */}
        <ServiceTile 
          icon={<QuestionIcon className="h-8 w-8 text-cyan-400" />} 
          title="Help & Feedback" 
          onClick={() => onNavigate('help')}
        />

        {/* 5. Share App */}
        <ServiceTile 
          icon={<ShareIcon className="h-8 w-8 text-blue-400" />} 
          title="Share App" 
          onClick={() => onNavigate('share')}
        />

        {/* 6. About EdgeWatch */}
        <ServiceTile 
          icon={<EyeIcon className="h-8 w-8 text-emerald-400" />} 
          title="About EdgeWatch" 
          onClick={() => onNavigate('about')}
        />
      </main>
    </div>
  );
};

export default SmartITPage;
