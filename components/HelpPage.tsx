
/**
 * Help & Support Page
 *
 * Displays frequently asked questions about the app's purpose and maintenance.
 * Provides a direct mail link to the engineering team.
 * Displays the current build version.
 */

import React from 'react';
import { BackArrowIcon, MailIcon } from './icons';

// Injected by Vite at build time
declare const __APP_VERSION__: string;

interface HelpPageProps {
  onBack: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
  const handleContactClick = () => {
    const recipients = "messemer.greg@ace.aaa.com,romero.mauricio@ace.aaa.com";
    const subject = encodeURIComponent("I love ACE-EdgeWatch");
    window.location.href = `mailto:${recipients}?subject=${subject}`;
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      <header className="mb-8">
        <div className="flex items-center">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <BackArrowIcon />
            </button>
            <h1 className="text-xl font-bold ml-2 tracking-wide">Help & Feedback</h1>
        </div>
        <p className="ml-12 text-sm text-cyan-400 font-mono font-bold mt-1">{__APP_VERSION__}</p>
      </header>

      <main className="flex-grow flex flex-col gap-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
            <h2 className="text-lg font-bold text-cyan-400 mb-2">Who maintains this app?</h2>
            <p className="text-slate-300 leading-relaxed">
                The EUC Enterprise Engineering team maintains this application.
            </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
            <h2 className="text-lg font-bold text-cyan-400 mb-2">What is the purpose of this app?</h2>
            <p className="text-slate-300 leading-relaxed">
                This app is designed to help you quickly determine if an issue is related to a specific cloud provider or application. It provides real-time status updates for key enterprise applications and cloud services.
            </p>
        </div>

        <button
            onClick={handleContactClick}
            className="group relative w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 active:scale-[0.98] mt-auto mb-8"
        >
            <MailIcon />
            <span className="font-bold text-lg">Contact</span>
        </button>
      </main>
    </div>
  );
};

export default HelpPage;
