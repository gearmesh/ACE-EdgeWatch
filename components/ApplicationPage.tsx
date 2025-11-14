import React from 'react';
import type { Page } from '../App';
import { BackArrowIcon, CartIcon, MailIcon, PhoneIcon, KeyIcon, PlaceholderIcon, CloudIcon } from './icons';

interface ApplicationPageProps {
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

const ApplicationPage: React.FC<ApplicationPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2">ACE App Cloud Service Status</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        <ServiceTile icon={<CartIcon />} title="E-Commerce" onClick={() => window.open('https://downdetector.com/status/aws-amazon-web-services/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<MailIcon />} title="Outlook" onClick={() => window.open('https://downdetector.com/status/outlook/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<PhoneIcon />} title="Intune" onClick={() => window.open('https://statusgator.com/services/microsoft-intune', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<KeyIcon />} title="SSO" onClick={() => window.open('https://downdetector.com/status/windows-azure/', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<CloudIcon />} title="Azure Health" onClick={() => window.open('https://portal.azure.com/#view/Microsoft_Azure_Health/AzureHealthBrowseBlade/~/serviceIssues', '_blank', 'noopener,noreferrer')} />
        <ServiceTile icon={<PlaceholderIcon />} title="Coming Soon" disabled />
      </main>
    </div>
  );
};

export default ApplicationPage;