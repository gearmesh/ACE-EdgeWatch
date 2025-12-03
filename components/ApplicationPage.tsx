
import React, { useState } from 'react';
import type { Page } from '../App';
import { BackArrowIcon, CartIcon, MailIcon, PhoneIcon, KeyIcon, PlaceholderIcon, CloudIcon, MultipleAppsIcon, FamilyIcon } from './icons';

interface ApplicationPageProps {
  onNavigate: (page: Page) => void;
}

interface TileProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ServiceTile: React.FC<TileProps> = ({ icon, title, subtitle, onClick, disabled = false }) => {
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
      <div className="flex flex-col items-center leading-tight">
        <span className="font-semibold text-sm">{title}</span>
        {subtitle && <span className="text-xs text-slate-400 mt-1 font-normal">{subtitle}</span>}
      </div>
    </button>
  );
};

// Simple Modal Component
const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-2xl max-w-sm w-full p-6 text-center">
        <p className="text-white text-lg mb-6">{message}</p>
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

const ApplicationPage: React.FC<ApplicationPageProps> = ({ onNavigate }) => {
  const [showRadarPopup, setShowRadarPopup] = useState(false);

  const handleRadarClick = () => {
    setShowRadarPopup(true);
  };

  const handleRadarConfirm = () => {
    setShowRadarPopup(false);
    onNavigate('radar-status');
  };

  return (
    <div className="flex flex-col min-h-screen p-4 relative">
      <MessageBox 
        isOpen={showRadarPopup} 
        message="RADAR and Member Validation may run slowly if Bing Maps is affected. Tap OK to test Bing and Google Maps health." 
        onConfirm={handleRadarConfirm} 
      />

      <header className="flex items-center mb-6">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">ACE App Cloud Service Status</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        {/* Row 1 */}
        <ServiceTile 
            icon={<CartIcon />} 
            title="E-Commerce" 
            subtitle="AWS"
            onClick={() => window.open('https://downdetector.com/status/aws-amazon-web-services/', '_blank', 'noopener,noreferrer')} 
        />
        <ServiceTile icon={<FamilyIcon />} title="RADAR & Member Validation" onClick={handleRadarClick} />
        
        {/* Row 2 */}
        <ServiceTile 
          icon={<KeyIcon />} 
          title="SSO" 
          subtitle="(Azure Downdetector)" 
          onClick={() => window.open('https://downdetector.com/status/windows-azure/', '_blank', 'noopener,noreferrer')} 
        />
        <ServiceTile 
          icon={<CloudIcon />} 
          title="Azure Health" 
          subtitle="per Microsoft" 
          onClick={() => window.open('https://portal.azure.com/#view/Microsoft_Azure_Health/AzureHealthBrowseBlade/~/serviceIssues', '_blank', 'noopener,noreferrer')} 
        />
        
        {/* Row 3 */}
        <ServiceTile icon={<PhoneIcon />} title="Intune" onClick={() => window.open('https://statusgator.com/services/microsoft-intune', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<MailIcon />} title="Outlook" onClick={() => window.open('https://downdetector.com/status/outlook/', '_blank', 'noopener,noreferrer')} />
        
        {/* Row 4 */}
        <ServiceTile icon={<MultipleAppsIcon />} title="Claims Pay, TLO, N2uitive & ISO" onClick={() => onNavigate('cloudflare-status')} />
      </main>
    </div>
  );
};

export default ApplicationPage;
